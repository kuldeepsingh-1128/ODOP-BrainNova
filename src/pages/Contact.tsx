import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="glass-card rounded-lg p-6 space-y-4">
              <div>
                <Label className="text-foreground">Name</Label>
                <Input placeholder="Your name" className="mt-1 bg-background border-border" />
              </div>
              <div>
                <Label className="text-foreground">Email</Label>
                <Input type="email" placeholder="you@example.com" className="mt-1 bg-background border-border" />
              </div>
              <div>
                <Label className="text-foreground">Message</Label>
                <textarea placeholder="How can we help?" className="mt-1 w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm min-h-[120px] resize-none" />
              </div>
              <Button className="w-full neon-glow">Send Message</Button>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "support@odopmarket.in" },
                { icon: Phone, label: "Phone", value: "+91 11-2345-6789" },
                { icon: MapPin, label: "Address", value: "Ministry of Commerce, Udyog Bhawan, New Delhi" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <item.icon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
