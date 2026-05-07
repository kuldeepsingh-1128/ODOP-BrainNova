import React, { useState, useEffect } from 'react';
import {
    Container, Grid, Typography, Button, Box, Paper,
    Divider, Chip, Stack, IconButton, Fade
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, LocalShipping, Security, Payments, ShoppingCart } from '@mui/icons-material';
import API from '../api/axios';
import { getAssetUrl } from '../config';
import { motion } from 'framer-motion';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await API.get(`/buyer/products/${id}`);
                setProduct(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existing = cart.find(item => item.productId === product._id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ productId: product._id, product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart!');
        navigate('/cart');
    };

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Button
                component={Link}
                to="/products"
                startIcon={<ChevronLeft />}
                sx={{ mb: 4, color: 'text.secondary' }}
            >
                Back to Gallery
            </Button>

            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                        <Paper elevation={0} sx={{
                            borderRadius: 6, overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
                        }}>
                            <img
                                src={getAssetUrl(product.image)}
                                alt={product.name}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </Paper>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
                        <Box sx={{ pt: 2 }}>
                            <Typography variant="caption" color="secondary" fontWeight={800} sx={{ textTransform: 'uppercase', letterSpacing: 1.5 }}>
                                {product.category}
                            </Typography>
                            <Typography variant="h2" fontWeight={800} sx={{ mb: 2, mt: 1, color: 'primary.main' }}>
                                {product.name}
                            </Typography>

                            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                                <Chip label={product.district} variant="outlined" color="primary" sx={{ borderRadius: 2 }} />
                                <Chip label="In Stock" variant="filled" color="success" size="small" sx={{ borderRadius: 2 }} />
                            </Stack>

                            <Typography variant="h3" fontWeight={800} color="text.primary" sx={{ mb: 3 }}>
                                ₹{product.price.toLocaleString()}
                            </Typography>

                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', mb: 4, lineHeight: 1.7 }}>
                                {product.description}
                            </Typography>

                            <Divider sx={{ mb: 4 }} />

                            <Stack spacing={3} sx={{ mb: 5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <LocalShipping color="action" />
                                    <Typography variant="body2">Free Delivery specialized for regional logistics</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Security color="action" />
                                    <Typography variant="body2">Verified Authentic under ODOP Guidelines</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Payments color="action" />
                                    <Typography variant="body2">Secure Payment & Direct Artisan Payout</Typography>
                                </Box>
                            </Stack>

                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<ShoppingCart />}
                                fullWidth
                                disabled={product.stock <= 0}
                                onClick={addToCart}
                                sx={{
                                    py: 2, fontSize: '1.1rem', fontWeight: 800,
                                    boxShadow: '0 8px 25px rgba(26, 35, 126, 0.25)'
                                }}
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetails;
