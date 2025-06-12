import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart, FiStar, FiPlus, FiMinus, FiLoader } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
export default function DetailProduct() {
     const { id } = useParams();
     const navigate = useNavigate();
     const [product, setProduct] = useState<Product[]>([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [quantity, setQuantity] = useState(1);
     const [addingToCart, setAddingToCart] = useState(false);

     useEffect(() => {
          const fetchProduct = async () => {
               try {
                    setLoading(true);
                    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

                    if (!response.ok) {
                         if (response.status === 404) {
                              throw new Error('Product not found');
                         }
                         throw new Error('Failed to fetch product');
                    }

                    const data = await response.json();
                    setProduct(data);
               } catch (err) {
                    setError(error);
                    toast.error(error);
               } finally {
                    setLoading(false);
               }
          };

          fetchProduct();
     }, [id]);

     const handleAddToCart = () => {
          setAddingToCart(true);

          // Simulate API call to add to cart
          setTimeout(() => {
               toast.success(`${quantity} ${product.title} added to cart!`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
               });
               setAddingToCart(false);
          }, 1000);
     };

     const incrementQuantity = () => {
          setQuantity(prev => prev + 1);
     };

     const decrementQuantity = () => {
          if (quantity > 1) {
               setQuantity(prev => prev - 1);
          }
     };

     if (loading) {
          return (
               <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#FFF6E9] to-[#BBE2EC]">
                    <motion.div
                         animate={{ rotate: 360 }}
                         transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                         className="text-[#0D9276] text-4xl"
                    >
                         <FiLoader />
                    </motion.div>
               </div>
          );
     }

     if (error) {
          return (
               <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFF6E9] to-[#BBE2EC] p-4">
                    <motion.div
                         initial={{ scale: 0.8 }}
                         animate={{ scale: 1 }}
                         className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md"
                    >
                         <h2 className="text-2xl font-bold text-[#0D9276] mb-4">Oops!</h2>
                         <p className="text-gray-700 mb-6">{error}</p>
                         <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => navigate('/')}
                              className="px-6 py-3 bg-[#40A2E3] text-white rounded-lg font-medium"
                         >
                              Back to Home
                         </motion.button>
                    </motion.div>
               </div>
          );
     }

     return (
          <div className="min-h-screen bg-gradient-to-b from-[#FFF6E9] to-[#BBE2EC] pb-12">
               {/* Navigation */}
               <div className="container mx-auto px-4 py-6">
                    <motion.button
                         whileHover={{ x: -3 }}
                         onClick={() => navigate(-1)}
                         className="flex items-center text-[#0D9276] font-medium"
                    >
                         <FiArrowLeft className="mr-2" /> Back to Products
                    </motion.button>
               </div>

               {/* Product Detail */}
               <div className="container mx-auto px-4">
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.5 }}
                         className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                         <div className="md:flex">
                              {/* Product Image */}
                              <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
                                   <motion.img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-96 object-contain"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                   />
                              </div>

                              {/* Product Info */}
                              <div className="md:w-1/2 p-8">
                                   <div className="flex justify-between items-start mb-4">
                                        <div>
                                             <span className="bg-[#40A2E3]/10 text-[#40A2E3] text-sm px-3 py-1 rounded-full capitalize">
                                                  {product.category}
                                             </span>
                                             <h1 className="text-3xl font-bold text-gray-900 mt-3">{product.title}</h1>
                                        </div>
                                        <div className="flex items-center bg-[#0D9276] text-white text-sm font-bold px-2 py-1 rounded">
                                             <FiStar className="mr-1" />
                                             {product.rating?.rate || '4.5'}
                                        </div>
                                   </div>

                                   <p className="text-gray-600 mb-6">{product.description}</p>

                                   <div className="mb-8">
                                        <div className="text-4xl font-extrabold text-[#0D9276] mb-2">
                                             ${product.price}
                                        </div>
                                        <div className="text-sm text-gray-500">+ Free shipping</div>
                                   </div>

                                   {/* Quantity Selector */}
                                   <div className="mb-8">
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
                                        <div className="flex items-center">
                                             <motion.button
                                                  whileTap={{ scale: 0.9 }}
                                                  onClick={decrementQuantity}
                                                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg text-gray-600 hover:bg-gray-100"
                                                  disabled={quantity <= 1}
                                             >
                                                  <FiMinus />
                                             </motion.button>
                                             <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300 text-gray-900 font-medium">
                                                  {quantity}
                                             </div>
                                             <motion.button
                                                  whileTap={{ scale: 0.9 }}
                                                  onClick={incrementQuantity}
                                                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg text-gray-600 hover:bg-gray-100"
                                             >
                                                  <FiPlus />
                                             </motion.button>
                                        </div>
                                   </div>

                                   {/* Add to Cart Button */}
                                   <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAddToCart}
                                        disabled={addingToCart}
                                        className={`w-full py-4 px-6 rounded-lg font-bold flex items-center justify-center gap-2 ${addingToCart ? 'bg-[#0D9276]/80' : 'bg-[#0D9276] hover:bg-[#0D9276]/90'} text-white transition-all`}
                                   >
                                        {addingToCart ? (
                                             <>
                                                  <motion.span
                                                       animate={{ rotate: 360 }}
                                                       transition={{ repeat: Infinity, duration: 1 }}
                                                       className="inline-block"
                                                  >
                                                       <FiLoader />
                                                  </motion.span>
                                                  Adding...
                                             </>
                                        ) : (
                                             <>
                                                  <FiShoppingCart /> Add to Cart (${(product.price * quantity).toFixed(2)})
                                             </>
                                        )}
                                   </motion.button>

                                   {/* Product Meta */}
                                   <div className="mt-8 pt-6 border-t border-gray-100">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                             <div>
                                                  <h4 className="font-medium text-gray-500">Category</h4>
                                                  <p className="text-gray-900 capitalize">{product.category}</p>
                                             </div>
                                             <div>
                                                  <h4 className="font-medium text-gray-500">Reviews</h4>
                                                  <p className="text-gray-900">{product.rating?.count || '120'} reviews</p>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </motion.div>

                    {/* Related Products (Optional) */}
                    <div className="mt-16">
                         <h2 className="text-2xl font-bold text-[#0D9276] mb-6">You might also like</h2>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {/* You would fetch related products here */}
                              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                                   <div className="text-gray-500 text-sm">More products coming soon</div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}