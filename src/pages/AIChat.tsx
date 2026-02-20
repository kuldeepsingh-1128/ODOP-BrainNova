import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! 👋 I'm your ODOP Marketplace AI Assistant. I can help you with:\n\n• Finding products\n• Learning about ODOP\n• Shopping tips\n• Product recommendations\n• General questions\n\nHow can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      // Send to webhook
      const webhookUrl = "https://kuldeepkd28.app.n8n.cloud/webhook/project-brainnnova";
      const payload = {
        message: userInput,
        timestamp: new Date().toISOString(),
      };

      console.log("Sending to webhook:", webhookUrl);
      console.log("Payload:", payload);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error text:", errorText);
        throw new Error(`Webhook error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("=== Full Webhook Response ===");
      console.log(JSON.stringify(data, null, 2));
      
      let aiResponseText = "";
      
      // Method 1: Handle N8N format array with output[0].content[0].text
      if (Array.isArray(data) && data.length > 0) {
        console.log("Response is array, checking first item...");
        const firstItem = data[0];
        console.log("First item:", firstItem);
        
        if (firstItem.output && Array.isArray(firstItem.output)) {
          console.log("Output array found:", firstItem.output);
          const output = firstItem.output[0];
          console.log("First output item:", output);
          
          if (output.content && Array.isArray(output.content)) {
            console.log("Content array found:", output.content);
            const contentItem = output.content[0];
            console.log("First content item:", contentItem);
            
            if (contentItem && contentItem.text) {
              aiResponseText = contentItem.text;
              console.log("✅ Extracted text from N8N format:", aiResponseText);
            }
          }
        }
      }
      
      // Method 2: Try direct properties if array format didn't work
      if (!aiResponseText) {
        console.log("Trying fallback extraction methods...");
        aiResponseText = 
          data?.reply || 
          data?.message || 
          data?.response || 
          data?.text ||
          data?.output?.[0]?.content?.[0]?.text ||
          (typeof data === 'string' ? data : "");
        
        if (aiResponseText) {
          console.log("✅ Extracted using fallback method:", aiResponseText);
        }
      }
      
      // Method 3: Last resort - use entire data if it's a string
      if (!aiResponseText && typeof data === 'string') {
        aiResponseText = data;
        console.log("✅ Using raw string response:", aiResponseText);
      }
      
      // If still nothing, log the structure and use default
      if (!aiResponseText) {
        console.warn("❌ Could not extract text from response. Structure:", Object.keys(data));
        aiResponseText = "I have received your message and will process it shortly.";
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error: any) {
      console.error('Webhook error:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Sorry, I encountered an error: ${error.message}. Please check the console for more details.`,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: error.message || "Failed to reach the AI service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Hello! 👋 I'm your ODOP Marketplace AI Assistant. I can help you with:\n\n• Finding products\n• Learning about ODOP\n• Shopping tips\n• Product recommendations\n• General questions\n\nHow can I help you today?",
        timestamp: new Date(),
      },
    ]);
    toast({
      title: "Chat Cleared",
      description: "Conversation history has been cleared.",
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto max-w-2xl px-4">
        <Card className="glass-card h-[600px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b border-border p-4 flex items-center justify-between bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center text-sm font-bold">
                AI
              </div>
              <div>
                <h2 className="font-bold text-foreground">ODOP AI Assistant</h2>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={clearChat}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 text-sm whitespace-pre-line ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-secondary text-secondary-foreground rounded-bl-none border border-border"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2 border border-border rounded-bl-none">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-border p-4 bg-secondary/30">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about ODOP..."
                disabled={loading}
                className="bg-background border-border flex-1"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={loading || !input.trim()}
                className="neon-glow"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </Card>

        {/* Info */}
        <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-muted-foreground">
            💡 <span className="font-semibold text-foreground">Tip:</span> Ask me about products, ordering, payments, ODOP information, or anything else about our marketplace!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
