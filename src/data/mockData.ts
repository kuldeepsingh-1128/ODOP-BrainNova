export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  district: string;
  state: string;
  image: string;
  sellerName: string;
  sellerRating: number;
  description: string;
  stock: number;
  status: "approved" | "pending" | "rejected";
}

export interface Seller {
  id: string;
  name: string;
  district: string;
  state: string;
  rating: number;
  totalProducts: number;
  verified: boolean;
}

export const districts = [
  "Varanasi", "Lucknow", "Jaipur", "Mysore", "Chanderi",
  "Moradabad", "Firozabad", "Kannauj", "Bastar", "Pochampally",
  "Kanchipuram", "Pashmina", "Dharmavaram", "Salem", "Bhagalpur",
];

export const categories = [
  "Textiles & Handloom", "Handicrafts", "Food & Spices",
  "Pottery & Ceramics", "Metalwork", "Leather Goods",
  "Woodwork", "Jewelry", "Natural Products",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Banarasi Silk Saree",
    price: 4500,
    category: "Textiles & Handloom",
    district: "Varanasi",
    state: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
    sellerName: "Ramesh Weavers",
    sellerRating: 4.8,
    description: "Authentic handwoven Banarasi silk saree with intricate zari work, crafted by master weavers of Varanasi.",
    stock: 12,
    status: "approved",
  },
  {
    id: "2",
    name: "Blue Pottery Vase",
    price: 1200,
    category: "Pottery & Ceramics",
    district: "Jaipur",
    state: "Rajasthan",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop",
    sellerName: "Jaipur Crafts Co.",
    sellerRating: 4.5,
    description: "Traditional Jaipur blue pottery vase with hand-painted floral motifs using natural dyes.",
    stock: 25,
    status: "approved",
  },
  {
    id: "3",
    name: "Brass Diya Set",
    price: 850,
    category: "Metalwork",
    district: "Moradabad",
    state: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=400&h=400&fit=crop",
    sellerName: "Moradabad Brass Works",
    sellerRating: 4.3,
    description: "Hand-crafted brass diya set from the brass capital of India, perfect for festive decoration.",
    stock: 50,
    status: "approved",
  },
  {
    id: "4",
    name: "Chanderi Fabric (5m)",
    price: 2200,
    category: "Textiles & Handloom",
    district: "Chanderi",
    state: "Madhya Pradesh",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop",
    sellerName: "Chanderi Weavers Guild",
    sellerRating: 4.7,
    description: "Premium Chanderi fabric with gold tissue weave, known for its sheer texture and rich craftsmanship.",
    stock: 18,
    status: "approved",
  },
  {
    id: "5",
    name: "Kannauj Attar (10ml)",
    price: 650,
    category: "Natural Products",
    district: "Kannauj",
    state: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    sellerName: "Kannauj Perfumery",
    sellerRating: 4.9,
    description: "Pure natural attar from Kannauj, the perfume capital of India, distilled using traditional methods.",
    stock: 100,
    status: "approved",
  },
  {
    id: "6",
    name: "Mysore Sandalwood Carving",
    price: 3500,
    category: "Woodwork",
    district: "Mysore",
    state: "Karnataka",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop",
    sellerName: "Mysore Heritage Crafts",
    sellerRating: 4.6,
    description: "Exquisite sandalwood carving from Mysore, handcrafted by skilled artisans with decades of experience.",
    stock: 8,
    status: "approved",
  },
  {
    id: "7",
    name: "Firozabad Glass Bangles Set",
    price: 350,
    category: "Jewelry",
    district: "Firozabad",
    state: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
    sellerName: "Firozabad Glass Art",
    sellerRating: 4.2,
    description: "Colorful handmade glass bangles from the glass city of India, available in vibrant combinations.",
    stock: 200,
    status: "approved",
  },
  {
    id: "8",
    name: "Bastar Tribal Art Panel",
    price: 2800,
    category: "Handicrafts",
    district: "Bastar",
    state: "Chhattisgarh",
    image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=400&h=400&fit=crop",
    sellerName: "Bastar Tribal Art Collective",
    sellerRating: 4.4,
    description: "Authentic Bastar tribal iron art panel depicting traditional folklore, crafted by indigenous artisans.",
    stock: 5,
    status: "approved",
  },
];

export const sellers: Seller[] = [
  { id: "1", name: "Ramesh Weavers", district: "Varanasi", state: "Uttar Pradesh", rating: 4.8, totalProducts: 24, verified: true },
  { id: "2", name: "Jaipur Crafts Co.", district: "Jaipur", state: "Rajasthan", rating: 4.5, totalProducts: 18, verified: true },
  { id: "3", name: "Moradabad Brass Works", district: "Moradabad", state: "Uttar Pradesh", rating: 4.3, totalProducts: 32, verified: true },
  { id: "4", name: "Chanderi Weavers Guild", district: "Chanderi", state: "Madhya Pradesh", rating: 4.7, totalProducts: 15, verified: true },
  { id: "5", name: "Kannauj Perfumery", district: "Kannauj", state: "Uttar Pradesh", rating: 4.9, totalProducts: 9, verified: true },
];

export const stats = {
  totalSellers: 1240,
  totalProducts: 8500,
  totalDistricts: 761,
  totalOrders: 45000,
};
