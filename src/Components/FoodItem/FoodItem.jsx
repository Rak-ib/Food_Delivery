import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../Context/StoreContext";

const FoodItem = ({ food }) => {
    const { AddToCart, loading, CartItems, RemoveFromCart } = useContext(StoreContext);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    
    const cartQuantity = CartItems[food._id] || 0;
    
    // Dynamic rating based on food rating or default
    const foodRating = food.rating || 4; // Default to 4 if no rating
    
    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <input
                key={index}
                type="radio"
                name={`rating-${food._id}`}
                className={`mask mask-star-2 ${
                    index < foodRating ? 'bg-orange-400' : 'bg-gray-300'
                } cursor-default`}
                readOnly
                checked={index === foodRating - 1}
            />
        ));
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleImageError = () => {
        setImageLoading(false);
        setImageError(true);
    };

    const handleAddToCart = async () => {
        try {
            await AddToCart(food._id);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const handleRemoveFromCart = async () => {
        if (cartQuantity > 0) {
            try {
                await RemoveFromCart(food._id);
            } catch (error) {
                console.error('Failed to remove from cart:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="bg-gray-200 rounded-xl w-full h-48 mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-6 rounded w-1/2"></div>
            </div>
        );
    }

    return (
        <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden">
                {imageLoading && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-2xl flex items-center justify-center">
                        <div className="loading loading-spinner loading-md text-orange-400"></div>
                    </div>
                )}
                
                {imageError ? (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-2xl">
                        <div className="text-center text-gray-400">
                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm">Image not available</p>
                        </div>
                    </div>
                ) : (
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        src={food.image}
                        className={`w-full h-48 object-cover rounded-t-2xl transition-opacity duration-300 ${
                            imageLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        alt={food.name}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        loading="lazy"
                    />
                )}
                
                {/* Overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
                
                {/* Discount badge if available */}
                {food.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{food.discount}%
                    </div>
                )}
                
                {/* Favorite button */}
                <button className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Food Name */}
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-orange-600 transition-colors duration-200">
                    {food.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="rating rating-sm">
                        {renderStars()}
                    </div>
                    <span className="text-sm text-gray-500">
                        ({foodRating}.0)
                    </span>
                    {food.reviewCount && (
                        <span className="text-xs text-gray-400">
                            • {food.reviewCount} reviews
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {food.description}
                </p>

                {/* Category/Tags */}
                {food.category && (
                    <div className="flex items-center gap-2">
                        <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                            {food.category}
                        </span>
                        {food.isVegan && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                🌱 Vegan
                            </span>
                        )}
                        {food.isSpicy && (
                            <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                                🌶️ Spicy
                            </span>
                        )}
                    </div>
                )}

                {/* Price and Cart Controls */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-orange-600">
                            ${food.price}
                        </span>
                        {food.originalPrice && food.originalPrice > food.price && (
                            <span className="text-sm text-gray-400 line-through">
                                ${food.originalPrice}
                            </span>
                        )}
                    </div>

                    {/* Cart Controls */}
                    <div className="flex items-center gap-3">
                        {cartQuantity === 0 ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddToCart}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 text-sm shadow-md"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add to Cart
                            </motion.button>
                        ) : (
                            <div className="flex items-center gap-2 bg-orange-50 rounded-full p-1">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleRemoveFromCart}
                                    className="bg-white hover:bg-red-50 text-red-500 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm"
                                    disabled={loading}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                </motion.button>
                                
                                <span className="bg-orange-500 text-white min-w-[2rem] h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                    {cartQuantity}
                                </span>
                                
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleAddToCart}
                                    className="bg-white hover:bg-green-50 text-green-500 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm"
                                    disabled={loading}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Info */}
                {(food.prepTime || food.calories) && (
                    <div className="flex items-center justify-between pt-2 text-xs text-gray-500 border-t border-gray-100">
                        {food.prepTime && (
                            <div className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {food.prepTime} min
                            </div>
                        )}
                        {food.calories && (
                            <div className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                {food.calories} cal
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default FoodItem;