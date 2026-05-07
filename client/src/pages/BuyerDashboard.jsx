import React, { useState, useEffect } from 'react';
import { 
    Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Chip, Box, Tabs, Tab, Grid, Card, CardMedia, CardContent, 
    CardActions, Button, IconButton, TextField, Avatar, Divider
} from '@mui/material';
import { 
    ShoppingBag, ShoppingCart, Receipt, Person, Add, Remove, Delete 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { getAssetUrl } from '../config';
import { useAuth } from '../context/AuthContext';

const BuyerDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        fetchOrders();
        fetchProducts();
        fetchCart();
        if (user) {
            setProfile({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || ''
            });
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const { data } = await API.get('/buyer/orders');
            setOrders(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchProducts = async () => {
        try {
            const { data } = await API.get('/buyer/products');
            setProducts(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchCart = async () => {
        try {
            const { data } = await API.get('/buyer/cart');
            setCartItems(data.products || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            await API.post('/buyer/cart', { productId, quantity: 1 });
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateQuantity = async (productId, quantity) => {
        try {
            await API.put('/buyer/cart', { productId, quantity });
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            await API.delete(`/buyer/cart/${productId}`);
            fetchCart();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCheckout = async () => {
        try {
            await API.post('/buyer/checkout');
            fetchCart();
            fetchOrders();
            setActiveTab(2); // Switch to orders tab
        } catch (err) {
            console.error(err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'warning';
            case 'shipped': return 'info';
            case 'delivered': return 'success';
            default: return 'default';
        }
    };

    const calculateCartTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.productId?.price || 0) * item.quantity;
        }, 0);
    };

    // Browse Products Tab
    const BrowseTab = () => (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Browse Products
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={getAssetUrl(product.image) || '/placeholder.jpg'}
                                alt={product.name}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {product.description?.substring(0, 100)}...
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    ₹{product.price}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Stock: {product.stock}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    size="small" 
                                    variant="outlined"
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    View Details
                                </Button>
                                <Button 
                                    size="small" 
                                    variant="contained"
                                    startIcon={<ShoppingCart />}
                                    onClick={() => handleAddToCart(product._id)}
                                    disabled={product.stock === 0}
                                >
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    // Cart Tab
    const CartTab = () => (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Shopping Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <ShoppingCart sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography color="text.secondary">Your cart is empty</Typography>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        {cartItems.map((item) => (
                            <Paper key={item.productId?._id} sx={{ p: 2, mb: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={3}>
                                        <img 
                                            src={item.productId?.image || '/placeholder.jpg'} 
                                            alt={item.productId?.name}
                                            style={{ width: '100%', borderRadius: 8 }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h6">
                                            {item.productId?.name}
                                        </Typography>
                                        <Typography variant="h6" color="primary">
                                            ₹{item.productId?.price}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Box display="flex" alignItems="center">
                                            <IconButton 
                                                size="small"
                                                onClick={() => handleUpdateQuantity(item.productId?._id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Remove />
                                            </IconButton>
                                            <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                                            <IconButton 
                                                size="small"
                                                onClick={() => handleUpdateQuantity(item.productId?._id, item.quantity + 1)}
                                                disabled={item.quantity >= item.productId?.stock}
                                            >
                                                <Add />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton 
                                            color="error"
                                            onClick={() => handleRemoveFromCart(item.productId?._id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                            <Typography variant="h6" gutterBottom>
                                Order Summary
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                                <Typography>Subtotal:</Typography>
                                <Typography>₹{calculateCartTotal()}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                                <Typography variant="h6">Total:</Typography>
                                <Typography variant="h6" color="primary">
                                    ₹{calculateCartTotal()}
                                </Typography>
                            </Box>
                            <Button 
                                variant="contained" 
                                fullWidth 
                                size="large"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Box>
    );

    // Orders Tab
    const OrdersTab = () => (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Order History
            </Typography>
            {orders.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Receipt sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography color="text.secondary">No orders found</Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#1a237e' }}>
                                <TableCell sx={{ color: 'white' }}>Order ID</TableCell>
                                <TableCell sx={{ color: 'white' }}>Products</TableCell>
                                <TableCell sx={{ color: 'white' }}>Total Amount</TableCell>
                                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                <TableCell sx={{ color: 'white' }}>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>
                                        {order.products?.map(p => (
                                            <Box key={p.productId?._id}>
                                                {p.productId?.name} x {p.quantity}
                                            </Box>
                                        ))}
                                    </TableCell>
                                    <TableCell>₹{order.totalAmount}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={order.status} 
                                            color={getStatusColor(order.status)} 
                                            variant="outlined" 
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );

    // Profile Tab
    const ProfileTab = () => (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                My Profile
            </Typography>
            <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
                <Box display="flex" flexDirection="column" alignItems="center" sx={{ mb: 4 }}>
                    <Avatar sx={{ width: 100, height: 100, bgcolor: '#1a237e', fontSize: 40, mb: 2 }}>
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Typography variant="h5">{user?.name}</Typography>
                    <Chip label={user?.role} color="primary" size="small" sx={{ mt: 1 }} />
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={profile.email}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            multiline
                            rows={3}
                            value={profile.address}
                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth>
                            Update Profile
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Buyer Dashboard
                </Typography>
                <Paper sx={{ mt: 2 }}>
                    <Tabs 
                        value={activeTab} 
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        variant="fullWidth"
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        <Tab icon={<ShoppingBag />} label="Browse" />
                        <Tab icon={<ShoppingCart />} label="Cart" />
                        <Tab icon={<Receipt />} label="Orders" />
                        <Tab icon={<Person />} label="Profile" />
                    </Tabs>
                </Paper>
            </Box>

            <Box sx={{ py: 3 }}>
                {activeTab === 0 && <BrowseTab />}
                {activeTab === 1 && <CartTab />}
                {activeTab === 2 && <OrdersTab />}
                {activeTab === 3 && <ProfileTab />}
            </Box>
        </Container>
    );
};

export default BuyerDashboard;
