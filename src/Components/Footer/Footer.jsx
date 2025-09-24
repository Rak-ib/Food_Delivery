import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Animation variants
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const socialLinks = [
        {
            name: "Facebook",
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            ),
            href: "https://facebook.com"
        },
        {
            name: "Twitter",
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
            ),
            href: "https://twitter.com"
        },
        {
            name: "Instagram",
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.508 0-4.541-2.033-4.541-4.541s2.033-4.541 4.541-4.541 4.541 2.033 4.541 4.541-2.033 4.541-4.541 4.541zm7.126 0c-2.508 0-4.541-2.033-4.541-4.541s2.033-4.541 4.541-4.541 4.541 2.033 4.541 4.541-2.033 4.541-4.541 4.541z"/>
                </svg>
            ),
            href: "https://instagram.com"
        },
        {
            name: "LinkedIn",
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            ),
            href: "https://linkedin.com"
        }
    ];

    const footerSections = [
        {
            title: "Our Services",
            links: [
                { name: "Food Delivery", href: "/delivery" },
                { name: "Catering", href: "/catering" },
                { name: "Table Booking", href: "/booking" },
                { name: "Meal Plans", href: "/meal-plans" },
                { name: "Corporate Orders", href: "/corporate" }
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Careers", href: "/careers" },
                { name: "Press Kit", href: "/press" },
                { name: "Partner with Us", href: "/partner" }
            ]
        },
        {
            title: "Support",
            links: [
                { name: "Help Center", href: "/help" },
                { name: "Track Your Order", href: "/track" },
                { name: "Returns & Refunds", href: "/returns" },
                { name: "Safety", href: "/safety" },
                { name: "Accessibility", href: "/accessibility" }
            ]
        },
        {
            title: "Legal",
            links: [
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "Delivery Terms", href: "/delivery-terms" }
            ]
        }
    ];

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden" id="footer">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500 rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-400 rounded-full opacity-5 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Top Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
                        {/* Brand Section */}
                        <motion.div variants={itemVariants} className="lg:col-span-2">
                            <Link to="/" className="inline-flex items-center gap-2 mb-6">
                                <span className="text-2xl">🍽️</span>
                                <h3 className="text-2xl font-bold text-white">FeelHungry</h3>
                            </Link>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
                                Connecting food lovers with their favorite restaurants. 
                                Fresh ingredients, fast delivery, and unforgettable flavors 
                                delivered right to your doorstep.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Call us</p>
                                        <p className="font-semibold">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Email us</p>
                                        <p className="font-semibold">hello@feelhungry.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
                                <div className="flex gap-2">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                                    />
                                    <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-colors">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Footer Links */}
                        {footerSections.map((section, index) => (
                            <motion.div key={section.title} variants={itemVariants}>
                                <h4 className="text-lg font-semibold text-orange-400 mb-6">
                                    {section.title}
                                </h4>
                                <nav className="space-y-3">
                                    {section.links.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className="block text-gray-400 hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 transform"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </nav>
                            </motion.div>
                        ))}
                    </div>

                    {/* Middle Section - App Download */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-12"
                    >
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                            <div className="text-center lg:text-left">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Get Our Mobile App
                                </h3>
                                <p className="text-orange-100">
                                    Download now and get exclusive deals and faster ordering
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.13997 6.91 8.85997 6.88C10.15 6.86 11.38 7.75 12.1 7.75C12.83 7.75 14.3 6.68 15.85 6.84C16.48 6.87 18.29 7.13 19.56 8.77C19.47 8.83 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                                    </svg>
                                    App Store
                                </button>
                                <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                                    </svg>
                                    Google Play
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Section */}
                    <motion.div 
                        variants={itemVariants}
                        className="border-t border-gray-800 pt-8"
                    >
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                            {/* Copyright */}
                            <div className="text-center lg:text-left">
                                <p className="text-gray-400">
                                    © {currentYear} FeelHungry. All rights reserved.
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Made with ❤️ for food lovers everywhere
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 text-sm">Follow us:</span>
                                <div className="flex gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                                            aria-label={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Back to top */}
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-orange-500 hover:bg-orange-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                                aria-label="Back to top"
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;