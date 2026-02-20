import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, MapPin, Users, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About ODOP</h1>
          <p className="text-muted-foreground leading-relaxed mb-10">
            The <strong className="text-foreground">One District One Product (ODOP)</strong> initiative aims to identify, promote, and brand products unique to each district of India. This platform serves as a digital marketplace connecting artisans directly with buyers nationwide.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: MapPin, title: "761+ Districts", desc: "Every district in India has a signature product — from Banarasi silks to Mysore sandalwood." },
              { icon: Users, title: "Direct Market Access", desc: "Eliminating middlemen so artisans earn fair prices for their craftsmanship." },
              { icon: Shield, title: "Verified Sellers", desc: "All sellers undergo verification to ensure product authenticity and quality." },
              { icon: Sparkles, title: "AI-Powered", desc: "AI-generated product descriptions and smart recommendations for buyers." },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-lg p-6">
                <item.icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
