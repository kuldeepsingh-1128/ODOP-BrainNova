import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, MapPin, CreditCard, Calendar, ChevronDown, Download, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Order {
  id: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  total: number;
  status: string;
  paymentMethod: string;
  date: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
  };
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [openOrders, setOpenOrders] = useState<string[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  };

  const toggleOrder = (orderId: string) => {
    setOpenOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const downloadInvoice = (order: Order) => {
    alert(`Invoice for ${order.id} would be downloaded here. Backend integration required.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Order History</h1>
            <p className="text-muted-foreground">View and track all your orders</p>
          </div>

          {orders.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Orders Yet</h3>
                <p className="text-muted-foreground mb-6">Start shopping to see your orders here!</p>
                <Link to="/buyer-dashboard">
                  <Button className="neon-glow">
                    Start Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="glass-card">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">Order {order.id}</CardTitle>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(order.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <span className="text-lg font-bold text-primary">₹{order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <Collapsible
                      open={openOrders.includes(order.id)}
                      onOpenChange={() => toggleOrder(order.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between">
                          <span>View Details</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${
                            openOrders.includes(order.id) ? 'rotate-180' : ''
                          }`} />
                        </Button>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="pt-4 space-y-6">
                        {/* Items */}
                        <div>
                          <h4 className="font-semibold mb-3 text-foreground">Order Items</h4>
                          <div className="space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-card/50">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                )}
                                <div className="flex-1">
                                  <p className="font-medium text-foreground">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                </div>
                                <span className="font-semibold text-foreground">
                                  ₹{(item.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shipping Address */}
                        <div>
                          <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            Shipping Address
                          </h4>
                          <div className="p-4 rounded-lg bg-card/50 space-y-1 text-sm">
                            <p className="font-medium text-foreground">{order.shippingAddress.name}</p>
                            <p className="text-muted-foreground">{order.shippingAddress.address}</p>
                            <p className="text-muted-foreground">
                              {order.shippingAddress.city} - {order.shippingAddress.pincode}
                            </p>
                            <p className="text-muted-foreground">Phone: {order.shippingAddress.phone}</p>
                          </div>
                        </div>

                        {/* Payment Info */}
                        <div>
                          <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-primary" />
                            Payment Information
                          </h4>
                          <div className="p-4 rounded-lg bg-card/50 text-sm">
                            <p className="text-muted-foreground">
                              Payment Method: <span className="font-medium text-foreground capitalize">{order.paymentMethod}</span>
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => downloadInvoice(order)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Invoice
                          </Button>
                          <Link to="/contact" className="flex-1">
                            <Button variant="outline" className="w-full">
                              Need Help?
                            </Button>
                          </Link>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrderHistory;
