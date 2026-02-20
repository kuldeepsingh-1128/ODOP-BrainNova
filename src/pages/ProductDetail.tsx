import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, ShoppingCart, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { products } from "@/data/mockData";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast({ title: "Added to Cart", description: `${product.name} x${qty} added to your cart.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-10">
          <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Marketplace
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Image */}
            <div className="glass-card rounded-lg overflow-hidden aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {product.district}
                </span>
                <span className="text-xs text-muted-foreground">{product.category}</span>
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm text-foreground font-medium">{product.sellerRating}</span>
                </div>
                <span className="text-sm text-muted-foreground">by {product.sellerName}</span>
                <span className="flex items-center gap-1 text-xs text-primary">
                  <Shield className="h-3 w-3" /> Verified
                </span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

              <div className="text-3xl font-bold text-primary mb-6">₹{product.price.toLocaleString()}</div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center glass-card rounded-lg">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-foreground hover:text-primary">−</button>
                  <span className="px-4 py-2 text-foreground font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-foreground hover:text-primary">+</button>
                </div>
                <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
              </div>

              <div className="flex gap-3 mb-8">
                <Button size="lg" className="neon-glow flex-1 gap-2" onClick={handleAddToCart}>
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  Buy Now
                </Button>
              </div>

              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Ships from {product.district}, {product.state}
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  Free delivery on orders above ₹999
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Authenticity guaranteed under ODOP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
