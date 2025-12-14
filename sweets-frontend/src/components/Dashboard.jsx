import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { getSweetImageUrl } from "../lib/sweet";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [purchasing, setPurchasing] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);
  const [quantities, setQuantities] = useState({}); // Track quantity for each sweet

  useEffect(() => {
    // Wait for auth to finish loading before checking user
    if (authLoading) {
      return;
    }
    
    // Only redirect if auth has finished loading and user is not present
    if (!user) {
      navigate("/login");
      return;
    }
    
    fetchSweets();
  }, [user, authLoading, navigate]);

  useEffect(() => {
    filterSweets();
  }, [searchTerm, selectedCategory, sweets]);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/sweets");
      setSweets(res.data);
    } catch (err) {
      alert("Failed to load sweets");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterSweets = () => {
    let filtered = [...sweets];

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (sweet) =>
          sweet.name.toLowerCase().includes(term) ||
          (sweet.description && sweet.description.toLowerCase().includes(term)) ||
          (sweet.category && sweet.category.toLowerCase().includes(term))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (sweet) => sweet.category && sweet.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredSweets(filtered);
  };

  const handlePurchase = async (sweetId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setPurchasing(sweetId);
      const res = await axios.post(`http://localhost:3000/api/sweets/${sweetId}/purchase`, {
        quantity: 1,
      });
      
      alert(`Purchase successful! ${res.data.message}`);
      // Refresh sweets to update quantities
      fetchSweets();
    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed. Please try again.");
      console.error(err);
    } finally {
      setPurchasing(null);
    }
  };

  const handleQuantityChange = (sweetId, change) => {
    setQuantities((prev) => {
      const currentQty = prev[sweetId] || 0;
      const sweet = sweets.find((s) => (s._id || s.id) === sweetId);
      const maxQty = sweet ? sweet.quantity : 0;
      
      const newQty = Math.max(0, Math.min(maxQty, currentQty + change));
      return { ...prev, [sweetId]: newQty };
    });
  };

  const handleQuantityInput = (sweetId, value) => {
    const numValue = parseInt(value) || 0;
    const sweet = sweets.find((s) => (s._id || s.id) === sweetId);
    const maxQty = sweet ? sweet.quantity : 0;
    
    setQuantities((prev) => ({
      ...prev,
      [sweetId]: Math.max(0, Math.min(maxQty, numValue)),
    }));
  };

  const handleAddToCart = (sweet) => {
    if (sweet.quantity === 0) {
      alert("This item is out of stock!");
      return;
    }
    
    const sweetId = sweet._id || sweet.id;
    const qty = quantities[sweetId] || 0;
    
    if (qty === 0) {
      alert("Please select a quantity greater than 0!");
      return;
    }
    
    setAddingToCart(sweetId);
    addToCart(sweet, qty);
    
    // Reset quantity after adding
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[sweetId];
      return newQuantities;
    });
    
    // Show feedback
    setTimeout(() => {
      setAddingToCart(null);
    }, 500);
  };

  // Get unique categories for filter
  const categories = ["all", ...new Set(sweets.map((s) => s.category).filter(Boolean))];

  // Show loading while auth is being checked or sweets are being fetched
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // If not authenticated (after loading), this will redirect, but show nothing while redirecting
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50 py-2 sm:py-4">
        <p className="text-xs sm:text-sm md:text-base lg:text-lg bg-[#a6d4e2] font-medium text-center mb-4 sm:mb-6 md:mb-8 text-gray-800 px-2 sm:px-4">
        Freshness & Hygiene Assured | No Chemical Preservatives | Ultra Long Shelf Life
        </p>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">

        {/* Search and Filter Section */}
        <div className="mb-6 sm:mb-8 space-y-4 md:flex md:items-center md:justify-between md:space-y-0">
          {/* Search Bar */}
          <div className="flex-1 max-w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search sweets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium text-sm sm:text-base hidden sm:inline">Filter by:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6 text-gray-600 text-sm sm:text-base">
          Showing {filteredSweets.length} of {sweets.length} sweets
        </div>

        {/* Sweets Grid */}
        {filteredSweets.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No sweets found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSweets.map((sweet) => {
              const imageUrl = sweet.imageUrl || getSweetImageUrl(sweet);
              const sweetId = sweet._id || sweet.id;
              
              return (
                <div
                  key={sweetId}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col"
                >
                  {/* Sweet Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-blue-100 to-pink-100">
                    <img
                      src={imageUrl}
                      alt={sweet.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        e.target.style.display = 'none';
                        const parent = e.target.parentElement;
                        if (parent && !parent.querySelector('.emoji-fallback')) {
                          const emojiDiv = document.createElement('div');
                          emojiDiv.className = 'emoji-fallback text-6xl flex items-center justify-center h-full';
                          emojiDiv.textContent = sweet.emoji || "🍬";
                          parent.appendChild(emojiDiv);
                        }
                      }}
                    />
                    {/* Price Badge - More Prominent */}
                    <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-gradient-to-r from-blue-600 to-pink-600 text-white rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 shadow-xl border-2 border-white">
                      <div className="text-[10px] sm:text-xs font-medium opacity-90">Price</div>
                      <span className="text-lg sm:text-xl md:text-2xl font-bold">₹{sweet.price}</span>
                    </div>
                    {/* Stock Badge */}
                    {sweet.quantity === 0 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        Out of Stock
                      </div>
                    )}
                    {sweet.quantity > 0 && sweet.quantity < 10 && (
                      <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        Only {sweet.quantity} left!
                      </div>
                    )}
                  </div>

                  {/* Sweet Details */}
                  <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 flex-1">{sweet.name}</h3>
                      {sweet.category && (
                        <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded ml-2 whitespace-nowrap flex-shrink-0">
                          {sweet.category}
                        </span>
                      )}
                    </div>
                    
                    {sweet.description && (
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 flex-1">
                        {sweet.description}
                      </p>
                    )}

                    {/* Stock Status */}
                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">Stock:</span>
                        <span
                          className={`font-semibold ${
                            sweet.quantity > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {sweet.quantity > 0 ? `${sweet.quantity} available` : "Out of stock"}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Selector with +/- Buttons */}
                    {sweet.quantity > 0 && (
                      <div className="mb-3 sm:mb-4">
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                          Quantity:
                        </label>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <button
                            onClick={() => handleQuantityChange(sweetId, -1)}
                            disabled={(quantities[sweetId] || 0) <= 0}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-bold text-base sm:text-lg flex items-center justify-center transition-all ${
                              (quantities[sweetId] || 0) <= 0
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95"
                            }`}
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="0"
                            max={sweet.quantity}
                            value={quantities[sweetId] || 0}
                            onChange={(e) => handleQuantityInput(sweetId, e.target.value)}
                            className="w-12 sm:w-16 h-8 sm:h-10 text-center text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                          />
                          <button
                            onClick={() => handleQuantityChange(sweetId, 1)}
                            disabled={(quantities[sweetId] || 0) >= sweet.quantity}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-bold text-base sm:text-lg flex items-center justify-center transition-all ${
                              (quantities[sweetId] || 0) >= sweet.quantity
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95"
                            }`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2 mt-auto">
                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(sweet)}
                        disabled={sweet.quantity === 0 || (quantities[sweetId] || 0) === 0 || addingToCart === sweetId}
                        className={`w-full py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 ${
                          sweet.quantity === 0 || (quantities[sweetId] || 0) === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : addingToCart === sweetId
                            ? "bg-green-400 text-white cursor-wait"
                            : "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg active:scale-95"
                        }`}
                      >
                        {addingToCart === sweetId ? (
                          <>
                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="hidden sm:inline">Adding...</span>
                            <span className="sm:hidden">...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="hidden sm:inline">Add to Cart</span>
                            <span className="sm:hidden">Cart</span>
                            {(quantities[sweetId] || 0) > 0 && <span className="hidden sm:inline">({(quantities[sweetId] || 0)})</span>}
                          </>
                        )}
                      </button>

                      {/* Purchase Button */}
                      <button
                        onClick={() => handlePurchase(sweetId)}
                        disabled={sweet.quantity === 0 || purchasing === sweetId}
                        className={`w-full py-1.5 sm:py-2 rounded-lg font-semibold transition-all duration-200 text-xs sm:text-sm ${
                          sweet.quantity === 0
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : purchasing === sweetId
                            ? "bg-blue-400 text-white cursor-wait"
                            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95"
                        }`}
                      >
                        {purchasing === sweetId
                          ? "Processing..."
                          : sweet.quantity === 0
                          ? "Out of Stock"
                          : "Buy Now"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
