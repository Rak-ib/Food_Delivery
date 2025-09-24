import { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck,  MapPin, Calendar, Eye, Phone, ArrowLeft, User, Mail } from 'lucide-react';
import axios from 'axios';

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' or 'detail'

  // Fetch orders from your API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await axios.get('http://localhost:5000/order/userOrder', { withCredentials: true });
      console.log(result.data.order);
      if (result.data.success) {
        setOrders(result.data.orders);
        console.log("orders ",result.data);
      }
      else{
        setOrders([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const getStatusIcon = (status) => {
    const icons = {
      'Pending': <Clock className="w-4 h-4" />,
      'Processing': <Package className="w-4 h-4" />,
      'Shipped': <Truck className="w-4 h-4" />,
      'Delivered': <CheckCircle className="w-4 h-4" />,
      'Cancelled': <XCircle className="w-4 h-4" />,
      'Failed': <XCircle className="w-4 h-4" />,
      'Refunded': <XCircle className="w-4 h-4" />
    };
    return icons[status] || <Clock className="w-4 h-4" />;
  };

  const formatDate = (dateString) => {
    // Handle both MongoDB date formats
    const date = new Date(dateString.$date ? parseInt(dateString.$date.$numberLong) : dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatItems = (items) => {
    return items.map(item => `${item.name} (${item.quantity})`).join(', ');
  };

  const getPaymentMethodIcon = (method) => {
    const methods = {
      'COD': '💵',
      'bkash': '📱',
      'card': '💳',
      'sslcommerz': '🔒'
    };
    return methods[method] || '💰';
  };

  const getPaymentMethodDisplay = (method, paymentDetails) => {
    if (method === 'sslcommerz' && paymentDetails?.card_type) {
      const cardType = paymentDetails.card_type.toLowerCase();
      if (cardType.includes('bkash')) return 'bKash';
      if (cardType.includes('card')) return 'Card';
      if (cardType.includes('rocket')) return 'Rocket';
      return paymentDetails.card_type;
    }
    return method?.toUpperCase() || 'COD';
  };

  // const calculateItemTotal = (price, quantity) => {
  //   const priceValue = typeof price === 'object' ? parseInt(price.$numberInt) : price;
  //   const quantityValue = typeof quantity === 'object' ? parseInt(quantity.$numberInt) : quantity;
  //   return priceValue * quantityValue;
  // };

  const getAmountValue = (amount) => {
    return typeof amount === 'object' ? parseInt(amount.$numberInt) : amount;
  };

  const showOrderDetail = (order) => {
    setSelectedOrder(order);
    setView('detail');
  };

  const backToList = () => {
    setView('list');
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">When you place orders, they will appear here.</p>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Start Ordering
          </button>
        </div>
      </div>
    );
  }

  // Order Detail View
  if (view === 'detail' && selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-6">
            <button 
              onClick={backToList}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600">Order ID: {selectedOrder._id.$oid || selectedOrder._id}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Status */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
                  <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="font-medium">{selectedOrder.status}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span>Ordered: {formatDate(selectedOrder.createdAt || selectedOrder.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>Estimated Delivery: {formatDate(selectedOrder.estimatedDelivery)}</span>
                  </div>
                  {selectedOrder.deliveryDate && (
                    <div className="flex items-center gap-3 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span>Delivered: {formatDate(selectedOrder.deliveryDate)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => {
                    const price = typeof item.price === 'object' ? parseInt(item.price.$numberInt) : item.price;
                    const quantity = typeof item.quantity === 'object' ? parseInt(item.quantity.$numberInt) : item.quantity;
                    const total = price * quantity;
                    
                    return (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                          {item.foodId && (
                            <p className="text-xs text-gray-500">ID: {item.foodId}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">৳{total}</p>
                          <p className="text-sm text-gray-600">৳{price} each</p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                      <span className="text-lg font-bold text-orange-600">৳{getAmountValue(selectedOrder.amount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payment Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Method</span>
                    <div className="flex items-center gap-2">
                      <span>{getPaymentMethodIcon(selectedOrder.paymentMethod)}</span>
                      <span className="font-medium">{getPaymentMethodDisplay(selectedOrder.paymentMethod, selectedOrder.paymentDetails)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedOrder.payment 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedOrder.payment ? 'Paid' : 'Pending'}
                    </div>
                  </div>
                  {selectedOrder.transactionId && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-600 mb-1">Transaction ID</p>
                      <p className="font-mono text-xs bg-gray-50 p-2 rounded break-all">{selectedOrder.transactionId}</p>
                    </div>
                  )}
                  {selectedOrder.paymentDetails && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-600 mb-2">Payment Details</p>
                      <div className="space-y-1 text-xs text-gray-600">
                        {selectedOrder.paymentDetails.val_id && (
                          <p>Validation ID: <span className="font-mono">{selectedOrder.paymentDetails.val_id}</span></p>
                        )}
                        {selectedOrder.paymentDetails.bank_tran_id && (
                          <p>Bank Transaction: <span className="font-mono">{selectedOrder.paymentDetails.bank_tran_id}</span></p>
                        )}
                        {selectedOrder.paymentDetails.card_issuer && (
                          <p>Issuer: {selectedOrder.paymentDetails.card_issuer}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Information</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 font-medium">
                        {selectedOrder.address.firstName} {selectedOrder.address.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900">{selectedOrder.address.street}</p>
                      <p className="text-gray-600">{selectedOrder.address.city}</p>
                      {selectedOrder.address.zipCode && (
                        <p className="text-gray-600">ZIP: {selectedOrder.address.zipCode}</p>
                      )}
                    </div>
                  </div>
                  {selectedOrder.address.mobile && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-900">{selectedOrder.address.mobile}</span>
                    </div>
                  )}
                  {selectedOrder.address.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-900">{selectedOrder.address.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {(selectedOrder.status === 'Pending' || selectedOrder.status === 'Processing') && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions</h2>
                  <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Orders List View
  if(orders.length > 0)
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your food delivery orders</p>
        </div>

        {/* Mobile Cards View */}
        <div className="lg:hidden space-y-4">
          {orders.map((order, index) => (
            <div key={order._id.$oid || order._id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-gray-900">Order #{index + 1}</p>
                  <p className="text-sm text-gray-600">{formatDate(order.createdAt || order.date)}</p>
                </div>
                <div className={`px-3 py-1 rounded-full border flex items-center gap-2 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="text-sm font-medium">{order.status}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-1">Items:</p>
                <p className="text-sm text-gray-900 line-clamp-2">{formatItems(order.items)}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>{getPaymentMethodIcon(order.paymentMethod)}</span>
                  <span className="font-bold text-orange-600">৳{getAmountValue(order.amount)}</span>
                  <div className={`ml-2 px-2 py-1 rounded text-xs ${
                    order.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.payment ? 'Paid' : 'Unpaid'}
                  </div>
                </div>
                <button 
                  onClick={() => showOrderDetail(order)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Payment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <tr key={order._id.$oid || order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">#{index + 1}</p>
                        <p className="text-sm text-gray-600">
                          {(order._id.$oid || order._id).slice(-8)}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-900 truncate">{formatItems(order.items)}</p>
                        <p className="text-xs text-gray-600">{order.items.length} item(s)</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-orange-600">৳{getAmountValue(order.amount)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{getPaymentMethodIcon(order.paymentMethod)}</span>
                        <div>
                          <p className="text-sm font-medium">
                            {getPaymentMethodDisplay(order.paymentMethod, order.paymentDetails)}
                          </p>
                          <p className={`text-xs ${order.payment ? 'text-green-600' : 'text-yellow-600'}`}>
                            {order.payment ? 'Paid' : 'Pending'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex px-3 py-1 rounded-full border items-center gap-2 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-medium">{order.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{formatDate(order.createdAt || order.date)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => showOrderDetail(order)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrder;