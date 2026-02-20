import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/mockData";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="glass-card rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(155_62%_53%/0.1)]">
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {product.district}
            </span>
            <span className="text-[10px] text-muted-foreground">{product.category}</span>
          </div>
          <h3 className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors truncate">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-primary text-lg">₹{product.price.toLocaleString()}</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-warning text-warning" />
              <span>{product.sellerRating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
