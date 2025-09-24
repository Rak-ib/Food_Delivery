import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pic1 from "../../../src/assets/Screenshot 2024-07-08 022546.png";
import pic2 from "../../../src/assets/Screenshot 2024-07-08 023510.png";
import header_img from "../../assets/frontend_assets/header_img.png";

const Header = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);

    // Slide data with better content
    const slides = [
        {
            id: 1,
            image: pic1,
            title: "Order Your Favourite Food Here",
            subtitle: "Delicious Meals Delivered",
            description: "Discover a world of flavors with our carefully curated selection of dishes from top-rated restaurants. Fresh ingredients, expert preparation, and lightning-fast delivery.",
            ctaText: "Order Now",
            ctaAction: () => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            id: 2,
            image: header_img,
            title: "Fresh & Healthy Options",
            subtitle: "Nutritious Choices Daily",
            description: "Fuel your body with our range of healthy, organic, and nutritionally balanced meals. From vegan delights to protein-packed options, we have something for everyone.",
            ctaText: "Explore Menu",
            ctaAction: () => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            id: 3,
            image: pic1,
            title: "Fast & Reliable Delivery",
            subtitle: "30 Minutes or Less",
            description: "Experience the convenience of ultra-fast delivery with our network of professional drivers. Hot, fresh food delivered right to your doorstep in record time.",
            ctaText: "Track Order",
            ctaAction: () => console.log("Track order clicked")
        },
        {
            id: 4,
            image: pic2,
            title: "Special Offers & Deals",
            subtitle: "Save More, Eat Better",
            description: "Don't miss out on our exclusive deals and seasonal offers. Premium dining experiences at unbeatable prices, available for a limited time only.",
            ctaText: "View Offers",
            ctaAction: () => console.log("View offers clicked")
        }
    ];

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    // Animation variants
    const slideVariants = {
        enter: { opacity: 0, x: 100 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 }
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="relative w-full h-[70vh] lg:h-[80vh] overflow-hidden">
            {/* Background Carousel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Background Image */}
                    <div className="relative w-full h-full">
                        <img
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        
                        {/* Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`content-${currentSlide}`}
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="text-white"
                            >
                                {/* Subtitle */}
                                <motion.div variants={itemVariants}>
                                    <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
                                        {slides[currentSlide].subtitle}
                                    </span>
                                </motion.div>

                                {/* Main Title */}
                                <motion.h1 
                                    variants={itemVariants}
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                                >
                                    {slides[currentSlide].title}
                                </motion.h1>

                                {/* Description */}
                                <motion.p 
                                    variants={itemVariants}
                                    className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl"
                                >
                                    {slides[currentSlide].description}
                                </motion.p>

                                {/* CTA Buttons */}
                                <motion.div 
                                    variants={itemVariants}
                                    className="flex flex-col sm:flex-row gap-4"
                                >
                                    <button
                                        onClick={slides[currentSlide].ctaAction}
                                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                                    >
                                        {slides[currentSlide].ctaText}
                                    </button>
                                    
                                    <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                                        Learn More
                                    </button>
                                </motion.div>

                                {/* Stats or Features */}
                                <motion.div 
                                    variants={itemVariants}
                                    className="flex items-center gap-8 mt-12 text-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <span>30min delivery</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        </div>
                                        <span>4.8 rating</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <span>50k+ customers</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
                <button
                    onClick={prevSlide}
                    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm pointer-events-auto opacity-0 hover:opacity-100 group-hover:opacity-100"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                
                <button
                    onClick={nextSlide}
                    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm pointer-events-auto opacity-0 hover:opacity-100 group-hover:opacity-100"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide
                                ? 'bg-orange-500 w-8'
                                : 'bg-white/50 hover:bg-white/75'
                        }`}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <motion.div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    key={currentSlide}
                />
            </div>

            {/* Play/Pause Button */}
            <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
                {isAutoPlaying ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 4h10a1 1 0 001-1V7a1 1 0 00-1-1H6a1 1 0 00-1 1v10a1 1 0 001 1z" />
                    </svg>
                )}
            </button>
        </section>
    );
};

export default Header;