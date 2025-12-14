import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import SweetImage from "./abc"; 
import { getSweetImageUrl } from "../lib/sweet"; 

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    } 
    fetchSweets();
  }, [user]);

  useEffect(() => {
    filterSweets();
  }, [searchTerm, categoryFilter, sweets]);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/sweets");
      setSweets(res.data);
      setFilteredSweets(res.data);
    } catch (err) {
      setError("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  const filterSweets = () => {
    let data = sweets;

    if (searchTerm) {
      data = data.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      data = data.filter((s) => s.category === categoryFilter);
    }

    setFilteredSweets(data);
  };

  const handlePurchase = async (id) => {
    try {
      await axios.post(`http://localhost:3000/api/sweets/${id}/purchase`, {
        quantity: 1,
      });
      fetchSweets();
      alert("Purchase successful 🍬");
    } catch (err) {
      alert("Purchase failed");
    }
  };

  const categories = [
    "all",
    ...new Set(sweets.map((s) => s.category).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        🍬 Loading sweets...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-2">Sweets Store 🍭</h1>
      <p className="text-gray-600 mb-6">
        Discover delicious sweets
      </p>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="border rounded-lg px-4 py-2"
          placeholder="Search sweets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-2"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Grid */}
      {filteredSweets.length === 0 ? (
        <div className="text-center text-xl">No sweets found 🍭</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSweets.map((sweet) => (
            <div
              key={sweet._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <SweetImage
                src={sweet.imageUrl || getSweetImageUrl(sweet)}
                alt={sweet.name}
                emoji={sweet.emoji || "🍬"}
                className="h-48"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold">{sweet.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {sweet.description || "Delicious sweet"}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-purple-600 font-bold text-xl">
                    ₹{sweet.price}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      sweet.quantity > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {sweet.quantity > 0
                      ? `In Stock (${sweet.quantity})`
                      : "Out of Stock"}
                  </span>
                </div>

                <button
                  disabled={sweet.quantity === 0}
                  onClick={() => handlePurchase(sweet._id)}
                  className={`w-full py-2 rounded-lg font-semibold ${
                    sweet.quantity === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}