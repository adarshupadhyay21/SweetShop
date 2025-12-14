import React, { useEffect, useState } from "react";
import { getAllSweets, searchSweets } from "../api/api.js";
import SweetList from "../components/SweetList";

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await getAllSweets();
        setSweets(Array.isArray(res) ? res : res?.data || []);
      } catch (err) {
        setError(err.message || "Failed to load sweets");
      } finally {
        setLoading(false);
      }
    };
    fetchSweets();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const params = { q: query, minPrice, maxPrice };
      const res = await searchSweets(params);
      setSweets(Array.isArray(res) ? res : res?.data || []);
    } catch (err) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setQuery("");
    setMinPrice("");
    setMaxPrice("");
    setLoading(true);
    setError(null);
    try {
      const res = await getAllSweets();
      setSweets(Array.isArray(res) ? res : res?.data || []);
    } catch (err) {
      setError(err.message || "Failed to reload sweets");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Loading sweets...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-purple-600">SweetShop</h2>
        <nav className="flex flex-col gap-4">
          <a href="/" className="text-gray-700 hover:text-purple-600 transition">Dashboard</a>
          <a href="/users" className="text-gray-700 hover:text-purple-600 transition">Users</a>
          <a href="/add-sweet" className="text-gray-700 hover:text-purple-600 transition">Add Sweet</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
            Logout
          </button>
        </div>

        {/* Search & Filters */}
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded shadow"
        >
          <input
            type="text"
            placeholder="Search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Reset
          </button>
        </form>

        {/* Sweet List */}
        <SweetList sweets={sweets} />
      </main>
    </div>
  );
};

export default Dashboard;
