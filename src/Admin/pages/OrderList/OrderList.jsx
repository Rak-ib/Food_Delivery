import  { useState, useEffect, useCallback } from 'react';
import {
    Package,
    Search,
    Filter,
    Eye,
    Download,
    MapPin,
    Phone,
    Mail,
    Clock,
    CheckCircle,
    Calendar,
    DollarSign,
    ShoppingBag,
    TrendingUp,
    Printer,
    Edit,
    Trash2,
    User,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import axios from 'axios';

const AdminOrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const ordersPerPage = 10;

    const statusOptions = [
        { value: "all", label: "All Orders", color: "text-gray-600" },
        { value: "Pending", label: "Pending", color: "text-yellow-600" },
        { value: "Processing", label: "Processing", color: "text-blue-600" },
        { value: "Shipped", label: "Shipped", color: "text-purple-600" },
        { value: "Delivered", label: "Delivered", color: "text-green-600" },
        { value: "Cancelled", label: "Cancelled", color: "text-red-600" },
        { value: "Failed", label: "Failed", color: "text-red-600" },
        { value: "Refunded", label: "Refunded", color: "text-gray-600" }
    ];

    const dateOptions = [
        { value: "all", label: "All Time" },
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
        { value: "week", label: "This Week" },
        { value: "month", label: "This Month" }
    ];

    // Replace with your actual API call
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const result = await axios.get('https://server-food-delivery-new.vercel.app/order/orderList', { withCredentials: true });
            if (result.data.success) {
                setOrders(result.data.orders);
                setFilteredOrders(result.data.orders);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`https://server-food-delivery-new.vercel.app/order/${orderId}/status`, {
                status: newStatus
            }, { withCredentials: true });

            setOrders(prev => prev.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
            setFilteredOrders(prev => prev.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ));

            // Show success message (you can use toast here)
            console.log(`Order status updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    // Move handleSearchAndFilter definition before the useEffect that uses it
    const handleSearchAndFilter = useCallback(() => {
        let filtered = [...orders];

        if (searchTerm) {
            filtered = filtered.filter(order =>
                order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                `${order.address.firstName} ${order.address.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.address.mobile?.includes(searchTerm) ||
                order.items.some(item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        if (dateFilter !== "all") {
            const now = new Date();
            filtered = filtered.filter(order => {
                const orderDate = new Date(order.date);
                switch (dateFilter) {
                    case "today":
                        return orderDate.toDateString() === now.toDateString();
                    case "yesterday":
                        const yesterday = new Date(now);
                        yesterday.setDate(yesterday.getDate() - 1);
                        return orderDate.toDateString() === yesterday.toDateString();
                    case "week":
                        const weekAgo = new Date(now);
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return orderDate >= weekAgo;
                    case "month":
                        const monthAgo = new Date(now);
                        monthAgo.setMonth(monthAgo.getMonth() - 1);
                        return orderDate >= monthAgo;
                    default:
                        return true;
                }
            });
        }

        setFilteredOrders(filtered);
        setCurrentPage(1);
    }, [orders, searchTerm, statusFilter, dateFilter]);

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        handleSearchAndFilter();
    }, [searchTerm, statusFilter, dateFilter, orders, handleSearchAndFilter]);

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const calculateTotal = (order) => {
        return order.amount;
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
            'Shipped': 'bg-purple-100 text-purple-800 border-purple-200',
            'Delivered': 'bg-green-100 text-green-800 border-green-200',
            'Cancelled': 'bg-red-100 text-red-800 border-red-200',
            'Failed': 'bg-red-100 text-red-800 border-red-200',
            'Refunded': 'bg-gray-100 text-gray-800 border-gray-200'
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const exportOrders = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Order ID,Customer,Items,Total,Date,Status\n"
            + filteredOrders.map(order =>
                `#${order._id.slice(-6)},"${order.address.firstName} ${order.address.lastName}","${order.items.map(item => `${item.name} x${item.quantity}`).join('; ')}",৳${calculateTotal(order)},${formatDate(order.date)},${order.status}`
            ).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "orders_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading orders...</p>
                </div>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl shadow-sm border">
                    <Package className="text-6xl text-gray-300 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-600 mb-2">No Orders Yet</h2>
                    <p className="text-gray-500 text-center max-w-md">
                        When customers place orders, they will appear here. You can manage all orders from this dashboard.
                    </p>
                    <button className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        View Analytics
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Management</h1>
                            <p className="text-gray-600">Manage and track all customer orders</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                onClick={exportOrders}
                            >
                                <Download className="w-4 h-4" />
                                Export CSV
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                                <Printer className="w-4 h-4" />
                                Print Report
                            </button>
                            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                View Analytics
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-full">
                                <ShoppingBag className="text-blue-600 w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">All time orders</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {filteredOrders.filter(o => o.status === 'Pending').length}
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-full">
                                <Clock className="text-yellow-600 w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Require attention</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Delivered</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {filteredOrders.filter(o => o.status === 'Delivered').length}
                                </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-full">
                                <CheckCircle className="text-green-600 w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Successful deliveries</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Revenue</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    ৳{filteredOrders.reduce((sum, order) => sum + calculateTotal(order), 0)}
                                </p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-full">
                                <DollarSign className="text-orange-600 w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Total earnings</p>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="text-gray-400 w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by order ID, customer, phone..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors bg-white text-gray-900"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Filter className="text-gray-400 w-4 h-4" />
                            </div>
                            <select
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors bg-white text-gray-900"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                {statusOptions.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="text-gray-400 w-4 h-4" />
                            </div>
                            <select
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors bg-white text-gray-900"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            >
                                {dateOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order Details</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer Info</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Items & Total</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="font-mono text-sm font-medium text-gray-900">#{order._id.slice(-8)}</div>
                                                <div className="text-xs text-gray-500 flex items-center">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {formatDate(order.date)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Payment: {order.paymentMethod}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="font-medium text-gray-900">{order.address.firstName} {order.address.lastName}</div>
                                                <div className="text-xs text-gray-500 flex items-center">
                                                    <Phone className="w-3 h-3 mr-1" />
                                                    {order.address.mobile}
                                                </div>
                                                <div className="text-xs text-gray-500 flex items-center">
                                                    <MapPin className="w-3 h-3 mr-1" />
                                                    {order.address.street}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="space-y-2">
                                                <div className="flex flex-wrap gap-1">
                                                    {order.items.slice(0, 2).map((item, index) => (
                                                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            {item.name} × {item.quantity}
                                                        </span>
                                                    ))}
                                                    {order.items.length > 2 && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            +{order.items.length - 2} more
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="font-bold text-green-600">৳{calculateTotal(order)}</div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-2">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>

                                                <select
                                                    className="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                >
                                                    {statusOptions.filter(opt => opt.value !== "all").map((status) => (
                                                        <option key={status.value} value={status.value}>
                                                            {status.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex gap-1">
                                                <button
                                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setShowOrderDetails(true);
                                                    }}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
                            <div className="text-sm text-gray-600">
                                Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors text-gray-700"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                    const page = i + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-3 py-2 border rounded-lg transition-colors ${currentPage === page
                                                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500'
                                                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors text-gray-700"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Details Modal */}
                {showOrderDetails && selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                                <h3 className="text-xl font-bold text-gray-900">Order Details - #{selectedOrder._id.slice(-8)}</h3>
                                <button
                                    onClick={() => setShowOrderDetails(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Customer Information */}
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-gray-800">Customer Information</h4>
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-gray-900">
                                            <div className="flex items-center">
                                                <User className="w-4 h-4 mr-2 text-gray-500" />
                                                <span>{selectedOrder.address.firstName} {selectedOrder.address.lastName}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                                <span>{selectedOrder.address.mobile}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                                <span>{selectedOrder.address.email}</span>
                                            </div>
                                            <div className="flex items-start">
                                                <MapPin className="w-4 h-4 mr-2 text-gray-500 mt-1 flex-shrink-0" />
                                                <div>
                                                    <div>{selectedOrder.address.street}</div>
                                                    <div>{selectedOrder.address.city}, ZIP: {selectedOrder.address.zipCode}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Information */}
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-gray-800">Order Information</h4>
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-gray-900">
                                            <div>Order ID: #{selectedOrder._id.slice(-8)}</div>
                                            <div>Date: {formatDate(selectedOrder.date)}</div>
                                            <div>Payment Method: {selectedOrder.paymentMethod}</div>
                                            <div>Payment Status:
                                                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${selectedOrder.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {selectedOrder.payment ? 'Paid' : 'Pending'}
                                                </span>
                                            </div>
                                            <div>Status:
                                                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder.status)}`}>
                                                    {selectedOrder.status}
                                                </span>
                                            </div>
                                            {selectedOrder.transactionId && (
                                                <div className="pt-2 border-t border-gray-200">
                                                    <p className="text-sm font-medium text-gray-600">Transaction ID</p>
                                                    <p className="font-mono text-sm bg-gray-100 p-2 rounded mt-1 break-all">{selectedOrder.transactionId}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Details */}
                                {selectedOrder.paymentDetails && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold text-gray-800 mb-4">Payment Details</h4>
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-gray-900">
                                            {selectedOrder.paymentDetails.val_id && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Validation ID:</span>
                                                    <span className="font-mono text-sm">{selectedOrder.paymentDetails.val_id}</span>
                                                </div>
                                            )}
                                            {selectedOrder.paymentDetails.bank_tran_id && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Bank Transaction:</span>
                                                    <span className="font-mono text-sm">{selectedOrder.paymentDetails.bank_tran_id}</span>
                                                </div>
                                            )}
                                            {selectedOrder.paymentDetails.card_issuer && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Card Issuer:</span>
                                                    <span>{selectedOrder.paymentDetails.card_issuer}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Order Items */}
                                <div className="mt-6">
                                    <h4 className="font-semibold text-gray-800 mb-4">Order Items</h4>
                                    <div className="overflow-x-auto">
                                        <table className="w-full bg-white border border-gray-200 rounded-lg">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Item</th>
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Quantity</th>
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {selectedOrder.items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-4 py-3 text-gray-900">
                                                            <div>
                                                                <div className="font-medium">{item.name}</div>
                                                                {item.foodId && (
                                                                    <div className="text-xs text-gray-500">ID: {item.foodId}</div>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-gray-900">{item.quantity}</td>
                                                        <td className="px-4 py-3 text-gray-900">৳{item.price}</td>
                                                        <td className="px-4 py-3 text-gray-900">৳{item.price * item.quantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot className="bg-gray-50">
                                                <tr>
                                                    <td colSpan="3" className="px-4 py-3 text-right font-semibold text-gray-900">Total Amount:</td>
                                                    <td className="px-4 py-3 font-bold text-green-600 text-lg">৳{calculateTotal(selectedOrder)}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                                <button
                                    onClick={() => setShowOrderDetails(false)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    Close
                                </button>
                                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors flex items-center gap-2">
                                    <Printer className="w-4 h-4" />
                                    Print Receipt
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrderManagement;