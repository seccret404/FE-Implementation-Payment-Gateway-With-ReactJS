import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiLoader, FiStar, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
     const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [searchTerm, setSearchTerm] = useState('');
     const [activeCategory, setActiveCategory] = useState('all');

     // Animation variants
     const containerVariants = {
          hidden: { opacity: 0 },
          show: {
               opacity: 1,
               transition: {
                    staggerChildren: 0.1
               }
          }
     };

     const itemVariants = {
          hidden: { y: 20, opacity: 0 },
          show: { y: 0, opacity: 1 }
     };

     useEffect(() => {
          const fetchProducts = async () => {
               try {
                    const response = await fetch('https://fakestoreapi.com/products');
                    if (!response.ok) throw new Error('Failed to fetch products');
                    const data = await response.json();
                    setProducts(data);
                    setFilteredProducts(data);
               } catch (err) {
                    setError(error);
               } finally {
                    setLoading(false);
               }
          };

          fetchProducts();
     }, []);

     useEffect(() => {
          let results = products;

          if (searchTerm) {
               results = results.filter(product =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase())
               );
          }

          if (activeCategory !== 'all') {
               results = results.filter(product =>
                    product.category === activeCategory
               );
          }

          setFilteredProducts(results);
     }, [searchTerm, activeCategory, products]);

     const categories = [...new Set(products.map(p => p.category))];

     if (loading) return (
          <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#FFF6E9] to-[#BBE2EC]">
               <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
               >
                    <FiStar className={"mr-1 text-yellow-400"} as={"svg"} />
               </motion.div>
               <p className="text-[#0D9276] text-xl font-medium">Loading products...</p>
          </div>
     );

     if (error) return (
          <div className="flex justify-center items-center h-screen bg-[#FFF6E9]">
               <p className="text-red-500 text-xl">Error: {error}</p>
          </div>
     );

const ProductCard = ({ product }: { product: Product }) => {
          const [ref, inView] = useInView({
               triggerOnce: true,
               threshold: 0.1
          });

          return (
               <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    variants={itemVariants}
                    transition={{ duration: 0.5 }}
               >
                    <Link
                         to={`/product/${product.id}`}
                         className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full group"
                    >
                         <div className="relative">
                              <div className="aspect-square flex items-center justify-center bg-gray-50">
                                   <img
                                        src={product.image}
                                        alt={product.title}
                                        className="object-contain h-64 w-full p-6 transition-transform duration-500 group-hover:scale-110"
                                   />
                              </div>
                              <div className="absolute top-3 right-3 bg-[#0D9276] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                   <FiStar className="mr-1" />
                                   {product.rating?.rate || '4.5'}
                              </div>
                         </div>

                         <div className="p-5 flex-grow flex flex-col">
                              <div className="flex-grow">
                                   <h3 className="text-gray-800 font-bold text-lg mb-2 line-clamp-2">
                                        {product.title}
                                   </h3>
                                   <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                        {product.description}
                                   </p>
                              </div>

                              <div className="mt-auto">
                                   <div className="flex justify-between items-center mb-3">
                                        <span className="text-[#0D9276] font-extrabold text-xl">
                                             ${product.price}
                                        </span>
                                        <span className="bg-[#40A2E3]/10 text-[#40A2E3] text-xs px-3 py-1 rounded-full capitalize">
                                             {product.category}
                                        </span>
                                   </div>

                                   <button className="w-full flex items-center justify-center gap-2 bg-[#0D9276] hover:bg-[#0D9276]/90 text-white py-2 px-4 rounded-lg transition-colors">
                                        <FiShoppingCart /> Add to Cart
                                   </button>
                              </div>
                         </div>
                    </Link>
               </motion.div>
          );
     };

     return (
          <div className="min-h-screen bg-gradient-to-b from-[#FFF6E9] to-[#BBE2EC] pb-12">
               {/* Hero Section */}
               <div className="bg-[#40A2E3] text-white py-12 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                         <motion.h1
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                              className="text-4xl md:text-5xl font-bold mb-4"
                         >
                              Discover Amazing Products
                         </motion.h1>
                         <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2, duration: 0.5 }}
                              className="text-xl max-w-2xl mx-auto mb-8"
                         >
                              Find exactly what you're looking for in our curated collection
                         </motion.p>

                         <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4, duration: 0.5 }}
                              className="relative max-w-2xl mx-auto"
                         >
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                   <FiSearch className="text-gray-400 text-xl" />
                              </div>
                              <input
                                   type="text"
                                   placeholder="Search for products, categories..."
                                   className="block w-full pl-12 pr-4 py-3 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9276] focus:border-transparent shadow-lg"
                                   value={searchTerm}
                                   onChange={(e) => setSearchTerm(e.target.value)}
                              />
                         </motion.div>
                    </div>
               </div>

               {/* Category Filter */}
               <div className="max-w-7xl mx-auto px-4 mt-8">
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                         <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setActiveCategory('all')}
                              className={`px-4 py-2 rounded-full font-medium ${activeCategory === 'all' ? 'bg-[#0D9276] text-white' : 'bg-white text-gray-800'}`}
                         >
                              All Products
                         </motion.button>

                         {categories.map(category => (
                              <motion.button
                                   key={category}
                                   whileHover={{ scale: 1.05 }}
                                   whileTap={{ scale: 0.95 }}
                                   onClick={() => setActiveCategory(category)}
                                   className={`px-4 py-2 rounded-full font-medium capitalize ${activeCategory === category ? 'bg-[#0D9276] text-white' : 'bg-white text-gray-800'}`}
                              >
                                   {category}
                              </motion.button>
                         ))}
                    </div>

                    {/* Products Count */}
                    <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="text-[#0D9276] font-medium mb-6"
                    >
                         {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    </motion.div>

                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
                         <motion.div
                              variants={containerVariants}
                              initial="hidden"
                              animate="show"
                              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                         >
                              {filteredProducts.map((product) => (
                                   <ProductCard key={product.id} product={product} />
                              ))}
                         </motion.div>
                    ) : (
                         <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-center py-16"
                         >
                              <div className="text-gray-500 text-5xl mb-4">😕</div>
                              <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
                              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                              <motion.button
                                   whileHover={{ scale: 1.05 }}
                                   whileTap={{ scale: 0.95 }}
                                   onClick={() => {
                                        setSearchTerm('');
                                        setActiveCategory('all');
                                   }}
                                   className="px-6 py-3 bg-[#40A2E3] text-white rounded-lg font-medium hover:bg-[#40A2E3]/90 transition-colors"
                              >
                                   Reset Filters
                              </motion.button>
                         </motion.div>
                    )}
               </div>
          </div>
     );
}