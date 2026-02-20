import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Package, User, LogOut, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const BuyerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const { toast } = useToast();

  const approvedProducts = products.filter(p => p.status === "approved");
  const filteredProducts = approvedProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (productId: string) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productInCart = existingCart.find((item: any) => item.id === productId);
    
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      const product = products.find(p => p.id === productId);
      existingCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCartCount(existingCart.reduce((sum: number, item: any) => sum + item.quantity, 0));
    
    toast({
      title: "Added to cart",
      description: "Product has been added to your cart",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Buyer Header */}
      <section className="pt-20 pb-6 border-b border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back, Buyer!</h1>
              <p className="text-muted-foreground">Explore authentic products from India's districts</p>
            </div>
            <div className="flex gap-3">
              <Link to="/cart">
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link to="/orders">
                <Button variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Orders
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="shop" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="shop">Shop Products</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            </TabsList>

            <TabsContent value="shop" className="space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, districts, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group">
                    <ProductCard product={product} />
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full mt-3 neon-glow"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found matching your search.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="wishlist" className="space-y-6">
              <div className="text-center py-12 glass-card rounded-lg">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your wishlist is empty</p>
                <p className="text-sm text-muted-foreground mt-2">Start adding products you love!</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BuyerDashboard;
