import { menu_list } from "../../assets/frontend_assets/assets";
import { motion } from "framer-motion";
import { useState } from "react";

const ExploreMenu = ({ category, SetCategory }) => {
    const [imageLoadingStates, setImageLoadingStates] = useState({});

    const handleImageLoad = (menuName) => {
        setImageLoadingStates(prev => ({
            ...prev,
            [menuName]: false
        }));
    };

    const handleImageError = (menuName) => {
        setImageLoadingStates(prev => ({
            ...prev,
            [menuName]: false
        }));
    };

    const handleCategorySelect = (menuName) => {
        // Toggle category - if same category is clicked, reset to "All"
        SetCategory(category === menuName ? "All" : menuName);
    };

    // Animation variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="relative bg-gradient-to-b from-orange-50 to-white py-16" id="menu">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-300 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Explore Our
                        <span className="text-orange-500 ml-3">Menu</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mb-6 rounded-full"></div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Discover our carefully curated selection of delicious cuisines from around the world
                    </p>
                </motion.div>

                {/* Filter Info */}
                {category && category !== "All" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center mb-8"
                    >
                        <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full flex items-center gap-2">
                            <span className="text-sm font-medium">Showing: {category}</span>
                            <button
                                onClick={() => SetCategory("All")}
                                className="text-orange-600 hover:text-orange-800 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Menu Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8"
                >
                    {menu_list.map((menu, index) => {
                        const isActive = category === menu.menu_name;
                        const isLoading = imageLoadingStates[menu.menu_name] !== false;

                        return (
                            <motion.div
                                key={`${menu.menu_name}-${index}`}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="flex flex-col items-center group cursor-pointer"
                                onClick={() => handleCategorySelect(menu.menu_name)}
                            >
                                {/* Image Container */}
                                <div className="relative mb-4">
                                    {/* Loading skeleton */}
                                    {isLoading && (
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-full animate-pulse"></div>
                                    )}
                                    
                                    {/* Menu Image */}
                                    <motion.img
                                        src={menu.menu_image}
                                        alt={`${menu.menu_name} category`}
                                        className={`
                                            w-20 h-20 md:w-24 md:h-24 object-cover rounded-full transition-all duration-300 shadow-lg
                                            ${isActive 
                                                ? 'ring-4 ring-orange-500 ring-offset-2 shadow-orange-200' 
                                                : 'ring-2 ring-gray-200 group-hover:ring-orange-300 group-hover:ring-4 group-hover:ring-offset-2'
                                            }
                                            ${isLoading ? 'opacity-0' : 'opacity-100'}
                                        `}
                                        whileHover={{ 
                                            scale: 1.1,
                                            rotate: [0, -5, 5, 0],
                                            transition: { duration: 0.3 }
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onLoad={() => handleImageLoad(menu.menu_name)}
                                        onError={() => handleImageError(menu.menu_name)}
                                        loading="lazy"
                                    />
                                    
                                    {/* Active indicator */}
                                    {isActive && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>
                                    )}

                                    {/* Hover overlay */}
                                    <div className={`
                                        absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-20 
                                        rounded-full transition-all duration-300
                                        ${isActive ? 'bg-opacity-10' : ''}
                                    `}></div>
                                </div>

                                {/* Menu Name */}
                                <h3 className={`
                                    text-center font-semibold text-sm md:text-base transition-all duration-300
                                    ${isActive 
                                        ? 'text-orange-600 font-bold' 
                                        : 'text-gray-700 group-hover:text-orange-600'
                                    }
                                `}>
                                    {menu.menu_name}
                                </h3>

                                {/* Active underline */}
                                {isActive && (
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        className="h-0.5 bg-orange-500 mt-1 rounded-full"
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-center mt-12"
                >
                    <button
                        onClick={() => SetCategory("All")}
                        className={`
                            px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg transform hover:scale-105
                            ${category === "All" || !category
                                ? 'bg-orange-500 text-white shadow-orange-200' 
                                : 'bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-50'
                            }
                        `}
                    >
                        {category === "All" || !category ? 'Showing All Categories' : 'View All Categories'}
                    </button>
                </motion.div>

                {/* Stats or additional info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="text-center mt-8 text-gray-500"
                >
                    <p className="text-sm">
                        {menu_list.length} delicious categories to explore
                    </p>
                </motion.div>
            </div>

            {/* Bottom border decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>
        </section>
    );
};

export default ExploreMenu;