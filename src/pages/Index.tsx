import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Store, Package, TrendingUp, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, stats, districts } from "@/data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="gradient-radial-glow absolute inset-0 pointer-events-none" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <Shield className="h-3 w-3" /> Government of India Initiative
            </motion.div>
            <motion.h1 custom={1} variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
              One District,{" "}
              <span className="text-primary neon-text">One Product</span>
              <br />Digital Marketplace
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Connecting India's district artisans directly with buyers. Discover authentic handcrafted products from 761+ districts, powered by AI.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/marketplace">
                <Button size="lg" className="neon-glow w-full sm:w-auto gap-2">
                  Explore Marketplace <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/register?role=seller">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Become a Seller
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: MapPin, label: "Districts", value: stats.totalDistricts.toLocaleString() },
              { icon: Store, label: "Sellers", value: stats.totalSellers.toLocaleString() },
              { icon: Package, label: "Products", value: stats.totalProducts.toLocaleString() },
              { icon: TrendingUp, label: "Orders", value: stats.totalOrders.toLocaleString() + "+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-lg p-6 text-center"
              >
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Products</h2>
              <p className="text-muted-foreground text-sm mt-1">Handpicked from verified artisans across India</p>
            </div>
            <Link to="/marketplace">
              <Button variant="ghost" className="text-primary gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Browse by District</h2>
          <p className="text-muted-foreground text-sm mb-10 max-w-lg mx-auto">
            Every district in India has a unique product. Discover what makes each region special.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {districts.map((d) => (
              <Link
                key={d}
                to={`/marketplace?district=${d}`}
                className="px-4 py-2 rounded-lg glass-card text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              >
                {d}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="gradient-radial-glow absolute inset-0 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                Are you an artisan?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Join thousands of sellers across India. List your products, reach buyers nationwide, and grow your craft business.
              </p>
              <Link to="/register">
                <Button size="lg" className="neon-glow gap-2">
                  Start Selling Today <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
