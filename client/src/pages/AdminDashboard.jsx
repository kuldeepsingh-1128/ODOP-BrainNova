import React, { useState, useEffect } from 'react';
import { 
    Container, Typography, Paper, Grid, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Button, Box, Card, CardContent,
    Alert, Badge, Chip, Divider
} from '@mui/material';
import { PendingActions, CheckCircle, Warning } from '@mui/icons-material';
import API from '../api/axios';
import { getAssetUrl } from '../config';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const usersRes = await API.get('/admin/users');
            const analyticsRes = await API.get('/admin/analytics');
            setUsers(usersRes.data);
            setAnalytics(analyticsRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleVerify = async (id, isVerified) => {
        try {
            await API.put(`/admin/verify-seller/${id}`, { isVerified });
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const pendingSellers = users.filter(u => u.role === 'seller' && !u.isVerified);
    const verifiedSellers = users.filter(u => u.role === 'seller' && u.isVerified);

    return (
        <Container sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight={700}>Admin Dashboard</Typography>
                {pendingSellers.length > 0 && (
                    <Badge badgeContent={pendingSellers.length} color="error">
                        <Chip 
                            icon={<PendingActions />} 
                            label="Pending Approvals" 
                            color="warning" 
                            variant="outlined"
                        />
                    </Badge>
                )}
            </Box>

            {/* Pending Seller Alerts */}
            {pendingSellers.length > 0 && (
                <Alert 
                    severity="warning" 
                    icon={<Warning />}
                    sx={{ mb: 3, fontWeight: 600 }}
                >
                    You have {pendingSellers.length} seller account{pendingSellers.length > 1 ? 's' : ''} waiting for approval!
                </Alert>
            )}

            {analytics && (
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={3}>
                        <Card sx={{ bgcolor: '#e8eaf6' }}>
                            <CardContent>
                                <Typography color="text.secondary" gutterBottom>Total Users</Typography>
                                <Typography variant="h4">{analytics.totalUsers}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card sx={{ bgcolor: '#e8f5e9' }}>
                            <CardContent>
                                <Typography color="text.secondary" gutterBottom>Total Products</Typography>
                                <Typography variant="h4">{analytics.totalProducts}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card sx={{ bgcolor: '#fff3e0' }}>
                            <CardContent>
                                <Typography color="text.secondary" gutterBottom>Total Orders</Typography>
                                <Typography variant="h4">{analytics.totalOrders}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card sx={{ bgcolor: '#f3e5f5' }}>
                            <CardContent>
                                <Typography color="text.secondary" gutterBottom>Revenue</Typography>
                                <Typography variant="h4">₹{analytics.totalRevenue}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}

            {/* Pending Seller Verifications */}
            {pendingSellers.length > 0 && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PendingActions color="warning" />
                        Pending Seller Approvals ({pendingSellers.length})
                    </Typography>
                    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#ff9800' }}>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Name</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Email</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Phone</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>District</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Category</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Documents</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pendingSellers.map((user) => (
                                    <TableRow key={user._id} sx={{ bgcolor: '#fff3e0' }}>
                                        <TableCell sx={{ fontWeight: 600 }}>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.district}</TableCell>
                                        <TableCell>{user.productCategory}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                {user.aadhaarFile && (
                                                    <Button 
                                                        size="small" 
                                                        variant="outlined"
                                                        component="a" 
                                                        href={getAssetUrl(user.aadhaarFile)} 
                                                        target="_blank"
                                                    >
                                                        Aadhaar
                                                    </Button>
                                                )}
                                                {user.shopPhoto && (
                                                    <Button 
                                                        size="small" 
                                                        variant="outlined"
                                                        component="a" 
                                                        href={getAssetUrl(user.shopPhoto)} 
                                                        target="_blank"
                                                    >
                                                        Shop Photo
                                                    </Button>
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Button 
                                                variant="contained" 
                                                color="success" 
                                                size="small" 
                                                onClick={() => handleVerify(user._id, true)}
                                                sx={{ fontWeight: 700 }}
                                            >
                                                Approve
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            <Divider sx={{ my: 4 }} />

            {/* Verified Sellers */}
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle color="success" />
                Verified Sellers ({verifiedSellers.length})
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#1a237e' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Email</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Phone</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>District</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Category</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Status</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {verifiedSellers.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.district}</TableCell>
                                <TableCell>{user.productCategory}</TableCell>
                                <TableCell>
                                    <Chip label="Verified" color="success" size="small" />
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outlined" 
                                        color="error" 
                                        size="small" 
                                        onClick={() => handleVerify(user._id, false)}
                                    >
                                        Suspend
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminDashboard;
