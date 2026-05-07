import React, { useState, useEffect } from 'react';
import {
    Container, Grid, Card, CardMedia, CardContent,
    Typography, TextField, Box, Button, InputAdornment,
    Chip, Stack, Paper, CircularProgress, Rating
} from '@mui/material';
import { Search, LocationOn, Star, FilterList } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { getAssetUrl } from '../config';
import { motion } from 'framer-motion';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [district, setDistrict] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            filterProducts();
        }, 300); // Debounce search by 300ms

        return () => clearTimeout(timer);
    }, [search, district, selectedCategory, products]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await API.get('/buyer/products');
            setProducts(data);
            setFilteredProducts(data);
            
            // Extract unique categories
            const uniqueCategories = [...new Set(data.map(p => p.category).filter(Boolean))];
            setCategories(uniqueCategories);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const filterProducts = () => {
        let filtered = [...products];

        // Filter by search term (searches in name, description, and category)
        if (search.trim()) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(search.toLowerCase().trim()) ||
                p.description?.toLowerCase().includes(search.toLowerCase().trim()) ||
                p.category?.toLowerCase().includes(search.toLowerCase().trim())
            );
        }

        // Filter by selected category
        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Filter by district
        if (district.trim()) {
            filtered = filtered.filter(p => 
                p.district?.toLowerCase().includes(district.toLowerCase().trim())
            );
        }

        setFilteredProducts(filtered);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(selectedCategory === category ? '' : category);
    };

    return (
        <Box sx={{ 
            bgcolor: 'background.default',
            minHeight: '100vh',
            background: 'linear-gradient(180deg, rgba(26, 35, 126, 0.02) 0%, rgba(255,255,255,0) 100%)',
        }}>
            <Container maxWidth="xl" sx={{ py: 7 }}>
            {/* Hero Section */}
            <Box sx={{ mb: 6, textAlign: 'center', position: 'relative' }}>
                {/* Decorative Background */}
                <Box sx={{
                    position: 'absolute',
                    top: -50,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '130%',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(26, 35, 126, 0.03) 0%, transparent 70%)',
                    zIndex: 0,
                    pointerEvents: 'none',
                }} />
                
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography 
                        variant="h2" 
                        fontWeight={900} 
                        gutterBottom
                        sx={{ 
                            background: 'linear-gradient(135deg, #1a237e 0%, #f57c00 50%, #d32f2f 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            letterSpacing: '-0.5px',
                        }}
                    >
                        🇮🇳 Discover Our Heritage
                    </Typography>
                    <Typography 
                        variant="h6" 
                        color="text.secondary" 
                        sx={{ 
                            mb: 5, 
                            fontWeight: 400,
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            maxWidth: '700px',
                            mx: 'auto',
                            lineHeight: 1.6,
                        }}
                    >
                        Browse authentic handcrafted products from <strong>700+ districts</strong> across India
                        <br />
                        <Chip 
                            label="One District, One Product" 
                            size="small" 
                            sx={{ 
                                mt: 2,
                                bgcolor: 'rgba(26, 35, 126, 0.08)',
                                color: 'primary.main',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                px: 2,
                                py: 2.5,
                            }}
                        />
                    </Typography>
                </Box>

                {/* Search and Filter Section */}
                <Paper 
                    elevation={0}
                    sx={{ 
                        p: 4, 
                        borderRadius: 5, 
                        border: '2px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    }}
                >
                    <Grid container spacing={2.5}>
                        <Grid item xs={12} md={5}>
                            <TextField
                                fullWidth
                                placeholder="Search by name, category, or description..."
                                variant="outlined"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search sx={{ color: 'primary.main', fontSize: 24 }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 4,
                                        bgcolor: 'background.default',
                                        fontSize: '1rem',
                                        '& input': {
                                            py: 2,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'primary.main',
                                            borderWidth: '2px',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderWidth: '2px',
                                        }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <TextField
                                fullWidth
                                placeholder="Filter by district..."
                                variant="outlined"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn sx={{ color: 'primary.main', fontSize: 24 }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 4,
                                        bgcolor: 'background.default',
                                        fontSize: '1rem',
                                        '& input': {
                                            py: 2,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'primary.main',
                                            borderWidth: '2px',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderWidth: '2px',
                                        }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                sx={{ 
                                    height: '56px',
                                    borderRadius: 4,
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    borderWidth: '2px',
                                    '&:hover': {
                                        borderWidth: '2px',
                                    }
                                }}
                                onClick={() => {
                                    setSearch('');
                                    setDistrict('');
                                    setSelectedCategory('');
                                }}
                            >
                                Clear All
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Helper Text */}
                    <Box sx={{ 
                        mt: 3, 
                        p: 2.5,
                        bgcolor: 'rgba(26, 35, 126, 0.03)',
                        borderRadius: 3,
                        border: '1px solid rgba(26, 35, 126, 0.1)',
                    }}>
                        <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                                textAlign: 'center',
                                fontSize: '0.9rem',
                            }}
                        >
                            💡 <strong>Popular searches:</strong> Jaipur, Textiles, Handicrafts, Art, Jewelry
                        </Typography>
                    </Box>
                </Paper>

                {/* Category Filter Chips */}
                {categories.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography 
                            variant="subtitle1" 
                            sx={{ 
                                mb: 2.5, 
                                fontWeight: 700,
                                color: 'text.primary',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                            }}
                        >
                            <FilterList sx={{ fontSize: 20 }} />
                            Browse by Category
                        </Typography>
                        <Stack 
                            direction="row" 
                            spacing={1.5} 
                            flexWrap="wrap" 
                            justifyContent="center"
                            sx={{ gap: 2 }}
                        >
                            {categories.map((category) => (
                                <Chip
                                    key={category}
                                    label={category}
                                    onClick={() => handleCategoryClick(category)}
                                    color={selectedCategory === category ? 'primary' : 'default'}
                                    variant={selectedCategory === category ? 'filled' : 'outlined'}
                                    sx={{ 
                                        fontWeight: selectedCategory === category ? 800 : 600,
                                        cursor: 'pointer',
                                        fontSize: '0.95rem',
                                        px: 3,
                                        py: 3,
                                        borderRadius: 50,
                                        borderWidth: '2px',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: selectedCategory === category 
                                                ? '0 12px 24px rgba(26, 35, 126, 0.25)' 
                                                : '0 8px 20px rgba(0,0,0,0.12)',
                                            borderWidth: '2px',
                                        }
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>
                )}
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 20 }}>
                    <CircularProgress size={70} thickness={3.5} />
                    <Typography variant="h6" color="text.secondary" sx={{ mt: 3, fontWeight: 500 }}>
                        Loading products...
                    </Typography>
                </Box>
            ) : (
                <>
                    {/* Results Count */}
                    {filteredProducts.length > 0 && (
                        <Box sx={{ 
                            mb: 4, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 2,
                            p: 3,
                            bgcolor: 'rgba(26, 35, 126, 0.03)',
                            borderRadius: 4,
                            border: '1px solid rgba(26, 35, 126, 0.1)',
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''} Found
                                {(search || district || selectedCategory) && (
                                    <Chip 
                                        label="Filtered" 
                                        size="small" 
                                        color="primary"
                                        sx={{ ml: 2, fontWeight: 700 }}
                                    />
                                )}
                            </Typography>
                            {(search || district || selectedCategory) && (
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    {search && `Search: "${search}"`}
                                    {district && ` • District: "${district}"`}
                                    {selectedCategory && ` • Category: "${selectedCategory}"`}
                                </Typography>
                            )}
                        </Box>
                    )}

                    <Grid container spacing={3}>
                        {filteredProducts.map((product, idx) => (
                            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                >
                                    <Card
                                        component={Link}
                                        to={`/product/${product._id}`}
                                        elevation={0}
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            borderRadius: 3,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            overflow: 'hidden',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            bgcolor: 'background.paper',
                                            '&:hover': {
                                                transform: 'translateY(-6px)',
                                                boxShadow: '0 12px 40px rgba(26, 35, 126, 0.12)',
                                                borderColor: 'primary.main',
                                                '& .product-image': {
                                                    transform: 'scale(1.05)',
                                                }
                                            }
                                        }}
                                    >
                                        {/* Image Section */}
                                        <Box sx={{ position: 'relative', overflow: 'hidden', height: 220, bgcolor: '#f5f5f5' }}>
                                            <CardMedia
                                                className="product-image"
                                                component="img"
                                                height="220"
                                                image={getAssetUrl(product.image)}
                                                alt={product.name}
                                                sx={{ 
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.4s ease',
                                                }}
                                            />

                                            {/* Badges */}
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 12,
                                                left: 12,
                                                right: 12,
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                zIndex: 2,
                                            }}>
                                                {/* Stock Badge */}
                                                {product.stock > 0 && product.stock <= 10 && (
                                                    <Chip
                                                        label={`${product.stock} left`}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: 'rgba(255, 152, 0, 0.95)',
                                                            color: 'white',
                                                            fontWeight: 700,
                                                            fontSize: '0.65rem',
                                                            height: 22,
                                                        }}
                                                    />
                                                )}
                                                
                                                {/* Category Chip */}
                                                <Chip
                                                    label={product.category}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                                                        fontWeight: 600,
                                                        fontSize: '0.65rem',
                                                        height: 22,
                                                        ml: 'auto',
                                                    }}
                                                />
                                            </Box>
                                        </Box>

                                        {/* Content Section */}
                                        <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                            {/* Location */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                                                <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                                    {product.district}
                                                </Typography>
                                            </Box>

                                            {/* Product Name */}
                                            <Typography 
                                                variant="subtitle1" 
                                                sx={{ 
                                                    fontWeight: 600, 
                                                    mb: 1,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    minHeight: '2.6em',
                                                    lineHeight: 1.3,
                                                    fontSize: '0.95rem',
                                                }}
                                            >
                                                {product.name}
                                            </Typography>
                                            
                                            {/* Rating */}
                                            {product.rating && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                                                    <Rating 
                                                        value={product.rating} 
                                                        precision={0.1} 
                                                        size="small" 
                                                        readOnly
                                                        sx={{
                                                            fontSize: '1rem',
                                                            '& .MuiRating-iconFilled': {
                                                                color: '#FFB400',
                                                            }
                                                        }}
                                                    />
                                                    <Typography 
                                                        variant="caption" 
                                                        sx={{ 
                                                            fontWeight: 600,
                                                            color: 'text.secondary',
                                                            fontSize: '0.75rem',
                                                        }}
                                                    >
                                                        {product.rating.toFixed(1)}
                                                    </Typography>
                                                </Box>
                                            )}

                                            <Box sx={{ flexGrow: 1 }} />

                                            {/* Price and Stock */}
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'space-between',
                                                mt: 1,
                                                pt: 1.5,
                                                borderTop: '1px solid',
                                                borderColor: 'divider',
                                            }}>
                                                <Typography 
                                                    variant="h6" 
                                                    sx={{ 
                                                        color: 'primary.main', 
                                                        fontWeight: 700,
                                                        fontSize: '1.1rem',
                                                    }}
                                                >
                                                    ₹{product.price.toLocaleString()}
                                                </Typography>
                                                
                                                {product.stock > 0 ? (
                                                    <Chip 
                                                        label="In Stock" 
                                                        size="small" 
                                                        color="success"
                                                        sx={{ 
                                                            height: 20,
                                                            fontSize: '0.65rem',
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                ) : (
                                                    <Chip 
                                                        label="Out of Stock" 
                                                        size="small" 
                                                        color="error"
                                                        sx={{ 
                                                            height: 20,
                                                            fontSize: '0.65rem',
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            {!loading && filteredProducts.length === 0 && (
                <Paper 
                    elevation={0}
                    sx={{ 
                        textAlign: 'center', 
                        py: 12,
                        px: 4,
                        borderRadius: 5,
                        border: '3px dashed',
                        borderColor: 'divider',
                        bgcolor: 'background.default'
                    }}
                >
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h1" sx={{ fontSize: '5rem', mb: 3, opacity: 0.8 }}>
                            🔍
                        </Typography>
                        <Typography variant="h4" color="text.primary" fontWeight={800} gutterBottom>
                            No Products Found
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: '500px', mx: 'auto' }}>
                            {search || district || selectedCategory 
                                ? `We couldn't find any products matching your search criteria.`
                                : "No products available at the moment."
                            }
                        </Typography>
                    </Box>
                    {(search || district || selectedCategory) && (
                        <Button 
                            variant="contained" 
                            size="large"
                            startIcon={<Search />}
                            sx={{ 
                                borderRadius: 50,
                                px: 5,
                                py: 2,
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                boxShadow: '0 8px 24px rgba(26, 35, 126, 0.25)',
                                '&:hover': {
                                    boxShadow: '0 12px 32px rgba(26, 35, 126, 0.35)',
                                }
                            }}
                            onClick={() => {
                                setSearch('');
                                setDistrict('');
                                setSelectedCategory('');
                            }}
                        >
                            Clear All Filters & Browse All
                        </Button>
                    )}
                </Paper>
            )}
            </Container>
        </Box>
    );
};

export default ProductList;
