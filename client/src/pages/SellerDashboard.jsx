import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, TextField, Box } from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import API from '../api/axios';
import { getAssetUrl } from '../config';

const SellerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        name: '', description: '', price: '', stock: '', district: '', category: ''
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await API.get('/seller/products');
            setProducts(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpen = (product = null) => {
        if (product) {
            setCurrentProduct(product);
            setEditMode(true);
        } else {
            setCurrentProduct({ name: '', description: '', price: '', stock: '', district: '', category: '' });
            setEditMode(false);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setImage(null);
    };

    const handleChange = (e) => {
        setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(currentProduct).forEach(key => {
            if (key !== '_id' && key !== 'sellerId' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v' && key !== 'image') {
                data.append(key, currentProduct[key]);
            }
        });
        if (image) data.append('image', image);

        try {
            if (editMode) {
                await API.put(`/seller/products/${currentProduct._id}`, data);
            } else {
                await API.post('/seller/products', data);
            }
            fetchProducts();
            handleClose();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await API.delete(`/seller/products/${id}`);
                fetchProducts();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">My Products</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()} sx={{ bgcolor: '#1a237e' }}>
                    Add Product
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#1a237e' }}>
                            <TableCell sx={{ color: 'white' }}>Image</TableCell>
                            <TableCell sx={{ color: 'white' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white' }}>Category</TableCell>
                            <TableCell sx={{ color: 'white' }}>Price</TableCell>
                            <TableCell sx={{ color: 'white' }}>Stock</TableCell>
                            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>
                                    <img src={getAssetUrl(product.image)} alt={product.name} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>₹{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(product)} color="primary"><Edit /></IconButton>
                                    <IconButton onClick={() => handleDelete(product._id)} color="error"><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>{editMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField fullWidth label="Product Name" name="name" value={currentProduct.name} onChange={handleChange} margin="normal" required />
                        <TextField fullWidth label="Description" name="description" value={currentProduct.description} onChange={handleChange} margin="normal" multiline rows={3} required />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField fullWidth label="Price" name="price" type="number" value={currentProduct.price} onChange={handleChange} margin="normal" required />
                            <TextField fullWidth label="Stock" name="stock" type="number" value={currentProduct.stock} onChange={handleChange} margin="normal" required />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField fullWidth label="District" name="district" value={currentProduct.district} onChange={handleChange} margin="normal" required />
                            <TextField fullWidth label="Category" name="category" value={currentProduct.category} onChange={handleChange} margin="normal" required />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2">Product Image</Typography>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} required={!editMode} />
                        </Box>
                        <Button fullWidth variant="contained" type="submit" sx={{ mt: 3, bgcolor: '#1a237e' }}>
                            {editMode ? 'Update Product' : 'Add Product'}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default SellerDashboard;
