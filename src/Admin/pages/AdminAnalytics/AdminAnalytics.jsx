import { useState, useEffect } from 'react';
import {
    
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingBag,
    Users,
    Clock,
    Download,
    RefreshCw,
    Target,
    CreditCard,
    MapPin,
    Star,
    Activity
} from 'lucide-react';
import axios from 'axios';

const AdminAnalytics = () => {
    const [timeRange, setTimeRange] = useState( '30d');
    const [loading, setLoading] = useState(true);
    const [analyticsData, setAnalyticsData] = useState({
        overview: {
            totalRevenue: 0,
            totalOrders: 0,
            avgOrderValue: 0,
            activeUsers: 0,
            revenueChange: 0,
            ordersChange: 0,
            avgValueChange: 0,
            usersChange: 0
        },
        revenueData: [],
        topFoods: [],
        categoryData: [],
        paymentMethods: [],
        cityData: [],
        hourlyData: []
    });

    const timeRangeOptions = [
        { value: '7d', label: 'Last 7 Days' },
        { value: '30d', label: 'Last 30 Days' },
        { value: '90d', label: 'Last 3 Months' },
        { value: '1y', label: 'Last Year' }
    ];

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://server-food-delivery-new.vercel.app/order/analytics?range=${timeRange}`, {
                withCredentials: true
            });
            
            if (response.data.success) {
                const data = response.data.data;
                
                // Transform payment methods data for only two methods: online and COD
                const paymentMethodsData = [
                    {
                        method: 'Online',
                        orders: data.paymentMethods?.online || 0,
                        percentage: data.paymentMethods ? 
                            Math.round((data.paymentMethods.online / (data.paymentMethods.online + data.paymentMethods.cod)) * 100) : 0,
                        color: '#4ECDC4'
                    },
                    {
                        method: 'Cash on Delivery',
                        orders: data.paymentMethods?.cod || 0,
                        percentage: data.paymentMethods ? 
                            Math.round((data.paymentMethods.cod / (data.paymentMethods.online + data.paymentMethods.cod)) * 100) : 0,
                        color: '#FF6B6B'
                    }
                ];

                setAnalyticsData({
                    overview: {
                        totalRevenue: data.overview?.totalRevenue || 0,
                        totalOrders: data.overview?.totalOrders || 0,
                        avgOrderValue: data.overview?.avgOrderValue || 0,
                        activeUsers: data.overview?.activeUsers || 0,
                        revenueChange: data.overview?.revenueChange || 0,
                        ordersChange: data.overview?.ordersChange || 0,
                        avgValueChange: data.overview?.avgValueChange || 0,
                        usersChange: data.overview?.usersChange || 0
                    },
                    revenueData: data.revenueData || [],
                    topFoods: data.topFoods || [],
                    categoryData: data.categoryData || [],
                    paymentMethods: paymentMethodsData,
                    cityData: data.cityData || [],
                    hourlyData: data.hourlyData || []
                });
            }
        } catch (error) {
            console.error('Error fetching analytics:', error);
            // Set empty data structure on error
            setAnalyticsData({
                overview: {
                    totalRevenue: 0,
                    totalOrders: 0,
                    avgOrderValue: 0,
                    activeUsers: 0,
                    revenueChange: 0,
                    ordersChange: 0,
                    avgValueChange: 0,
                    usersChange: 0
                },
                revenueData: [],
                topFoods: [],
                categoryData: [],
                paymentMethods: [],
                cityData: [],
                hourlyData: []
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, [timeRange]);

    const formatCurrency = (value) => `৳${value?.toLocaleString() || '0'}`;
    const formatPercent = (value) => `${value > 0 ? '+' : ''}${value?.toFixed(1) || '0'}%`;

    const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
        const isPositive = change > 0;
        const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            orange: 'bg-orange-50 text-orange-600',
            purple: 'bg-purple-50 text-purple-600'
        };

        return (
            <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                        <div className="flex items-center mt-2">
                            {isPositive ? (
                                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            ) : (
                                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                            )}
                            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {formatPercent(change)}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">vs last period</span>
                        </div>
                    </div>
                    <div className={`p-3 rounded-full ${colorClasses[color]}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-medium">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
                            <p className="text-gray-600">Track performance and gain insights into your business</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900"
                            >
                                {timeRangeOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <button 
                                onClick={fetchAnalytics}
                                disabled={loading}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Export Report
                            </button>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Revenue"
                        value={formatCurrency(analyticsData.overview.totalRevenue)}
                        change={analyticsData.overview.revenueChange}
                        icon={DollarSign}
                        color="green"
                    />
                    <StatCard
                        title="Total Orders"
                        value={analyticsData.overview.totalOrders.toLocaleString()}
                        change={analyticsData.overview.ordersChange}
                        icon={ShoppingBag}
                        color="blue"
                    />
                    <StatCard
                        title="Avg Order Value"
                        value={formatCurrency(analyticsData.overview.avgOrderValue)}
                        change={analyticsData.overview.avgValueChange}
                        icon={Target}
                        color="orange"
                    />
                    <StatCard
                        title="Active Users"
                        value={analyticsData.overview.activeUsers.toLocaleString()}
                        change={analyticsData.overview.usersChange}
                        icon={Users}
                        color="purple"
                    />
                </div>

                {/* Revenue & Orders Trend */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Revenue Trend</h3>
                            <Activity className="w-5 h-5 text-gray-500" />
                        </div>
                        {analyticsData.revenueData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={analyticsData.revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis 
                                        dataKey="date" 
                                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        stroke="#6b7280"
                                    />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip 
                                        formatter={(value, ) => [formatCurrency(value), 'Revenue']}
                                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#f97316"
                                        fill="url(#revenueGradient)"
                                        strokeWidth={2}
                                    />
                                    <defs>
                                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0.05}/>
                                        </linearGradient>
                                    </defs>
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-300 flex items-center justify-center text-gray-500">
                                No revenue data available
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Orders by Hour</h3>
                            <Clock className="w-5 h-5 text-gray-500" />
                        </div>
                        {analyticsData.hourlyData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={analyticsData.hourlyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="hour" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip formatter={(value) => [value, 'Orders']} />
                                    <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-300 flex items-center justify-center text-gray-500">
                                No hourly data available
                            </div>
                        )}
                    </div>
                </div>

                {/* Category Performance & Payment Methods */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Sales by Category</h3>
                            <Star className="w-5 h-5 text-gray-500" />
                        </div>
                        {analyticsData.categoryData.length > 0 ? (
                            <>
                                <div className="flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={analyticsData.categoryData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={120}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {analyticsData.categoryData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value, ) => [`${value}%`, 'Share']} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-4 space-y-2">
                                    {analyticsData.categoryData.map((category, index) => (
                                        <div key={index} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center">
                                                <div 
                                                    className="w-3 h-3 rounded-full mr-2" 
                                                    style={{ backgroundColor: category.color }}
                                                ></div>
                                                <span className="text-gray-700">{category.name}</span>
                                            </div>
                                            <span className="font-semibold text-gray-900">{formatCurrency(category.revenue)}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="h-300 flex items-center justify-center text-gray-500">
                                No category data available
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Payment Methods</h3>
                            <CreditCard className="w-5 h-5 text-gray-500" />
                        </div>
                        {analyticsData.paymentMethods.length > 0 ? (
                            <div className="space-y-4">
                                {analyticsData.paymentMethods.map((method, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-700">{method.method}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-500">{method.orders} orders</span>
                                                <span className="text-sm font-semibold text-gray-900">{method.percentage}%</span>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${method.percentage}%`,
                                                    backgroundColor: method.color
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-300 flex items-center justify-center text-gray-500">
                                No payment data available
                            </div>
                        )}
                    </div>
                </div>

                {/* Top Foods & Geographic Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Top Performing Foods</h3>
                            <Star className="w-5 h-5 text-gray-500" />
                        </div>
                        {analyticsData.topFoods.length > 0 ? (
                            <div className="space-y-4">
                                {analyticsData.topFoods.map((food, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{food.name}</p>
                                                <p className="text-sm text-gray-500">{food.category}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">{formatCurrency(food.revenue)}</p>
                                            <p className="text-sm text-gray-500">{food.orders} orders</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-300 flex items-center justify-center text-gray-500">
                                No food data available
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Sales by City</h3>
                            <MapPin className="w-5 h-5 text-gray-500" />
                        </div>
                        {analyticsData.cityData.length > 0 ? (
                            <div className="space-y-4">
                                {analyticsData.cityData.map((city, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                                            <div>
                                                <p className="font-semibold text-gray-900">{city.city}</p>
                                                <p className="text-sm text-gray-500">{city.orders} orders</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">{formatCurrency(city.revenue)}</p>
                                            <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
                                                <div
                                                    className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full transition-all duration-500"
                                                    style={{ width: `${(city.revenue / Math.max(...analyticsData.cityData.map(c => c.revenue))) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-300 flex items-center justify-center text-gray-500">
                                No city data available
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;