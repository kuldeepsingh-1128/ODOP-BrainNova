import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-nav border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center font-bold text-primary-foreground text-sm">
                O
              </div>
              <span className="font-bold text-lg text-foreground">
                ODOP <span className="text-primary">Market</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering district artisans and craftspeople through India's One District One Product initiative.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Platform</h4>
            <div className="flex flex-col gap-2">
              <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-primary transition-colors">Marketplace</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About ODOP</Link>
              <Link to="/register?role=seller" className="text-sm text-muted-foreground hover:text-primary transition-colors">Become a Seller</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Support</h4>
            <div className="flex flex-col gap-2">
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Government</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Ministry of Commerce</span>
              <span className="text-sm text-muted-foreground">DPIIT Initiative</span>
              <span className="text-sm text-muted-foreground">Make in India</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 ODOP Market Linkage Platform. An initiative under One District One Product.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-muted-foreground">🇮🇳 Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
