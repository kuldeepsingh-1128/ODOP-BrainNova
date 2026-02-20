import { useState } from "react";
import { Package, Plus, ShoppingCart, User, BarChart3, Sparkles, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { products } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const tabs = [
  { id: "products", label: "My Products", icon: Package },
  { id: "add", label: "Add Product", icon: Plus },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "profile", label: "Profile", icon: User },
];

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const { toast } = useToast();
  const sellerProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-nav hidden md:flex flex-col">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center font-bold text-primary-foreground text-xs">O</div>
            <span className="font-bold text-foreground text-sm">ODOP <span className="text-primary">Seller</span></span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Link to="/">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
              <LogOut className="h-4 w-4" /> Back to Site
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {/* Mobile tabs */}
        <div className="flex md:hidden gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                activeTab === tab.id ? "bg-primary/10 text-primary" : "text-muted-foreground bg-card"
              }`}
            >
              <tab.icon className="h-3 w-3" /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "products" && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">My Products</h2>
            <div className="grid gap-4">
              {sellerProducts.map((p) => (
                <div key={p.id} className="glass-card rounded-lg p-4 flex items-center gap-4">
                  <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.district} · {p.category}</p>
                  </div>
                  <span className="text-primary font-bold">₹{p.price.toLocaleString()}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    p.status === "approved" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"
                  }`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "add" && (
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6">Add Product</h2>
            <div className="glass-card rounded-lg p-6 space-y-4">
              <div>
                <Label className="text-foreground">Product Name</Label>
                <Input placeholder="e.g. Banarasi Silk Saree" className="mt-1 bg-background border-border" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Price (₹)</Label>
                  <Input type="number" placeholder="0" className="mt-1 bg-background border-border" />
                </div>
                <div>
                  <Label className="text-foreground">Stock</Label>
                  <Input type="number" placeholder="0" className="mt-1 bg-background border-border" />
                </div>
              </div>
              <div>
                <Label className="text-foreground">Category</Label>
                <Input placeholder="Textiles & Handloom" className="mt-1 bg-background border-border" />
              </div>
              <div>
                <Label className="text-foreground">Description</Label>
                <textarea placeholder="Describe your product..." className="mt-1 w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm min-h-[80px] resize-none" />
              </div>
              <Button
                variant="outline"
                className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/10"
                onClick={() => toast({ title: "AI Generate", description: "Connect backend to enable AI description generation." })}
              >
                <Sparkles className="h-4 w-4" /> Generate Description with AI
              </Button>
              <Button className="w-full neon-glow">Submit Product</Button>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Orders</h2>
            <div className="glass-card rounded-lg p-10 text-center">
              <ShoppingCart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No orders yet. Orders will appear here once buyers purchase your products.</p>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6">Seller Profile</h2>
            <div className="glass-card rounded-lg p-6 space-y-4">
              <div>
                <Label className="text-foreground">Name</Label>
                <Input defaultValue="Ramesh Weavers" className="mt-1 bg-background border-border" />
              </div>
              <div>
                <Label className="text-foreground">District</Label>
                <Input defaultValue="Varanasi" className="mt-1 bg-background border-border" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground">Aadhaar</p>
                  <p className="text-sm text-primary font-medium mt-1">✓ Verified</p>
                </div>
                <div className="glass-card rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground">PAN</p>
                  <p className="text-sm text-primary font-medium mt-1">✓ Verified</p>
                </div>
              </div>
              <Button className="w-full">Save Profile</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerDashboard;
