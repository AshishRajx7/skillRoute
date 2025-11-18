import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Discover() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch random item (used for button clicks)
  const fetchRandom = async () => {
    setLoading(true);
    try {
      const res = await api.get("/paths/random");
      setItem(res.data);
    } catch (error) {
      console.log("Failed to fetch random skill", error);
      setItem(null);
    }
    setLoading(false);
  };

  // Fetch random item on first load (inside effect to avoid warnings)
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get("/paths/random");
        setItem(res.data);
      } catch (error) {
        console.log("Failed to fetch random skill", error);
        setItem(null);
      }
      setLoading(false);
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Discover a Random Skill Path</h1>

      {/* Loading state */}
      {loading && (
        <div className="text-xl mt-10">Searching...</div>
      )}

      {/* No skill paths in DB */}
      {!loading && item?.message === "No skill paths available" && (
        <div className="text-gray-600 text-xl mt-10">
          No skill paths exist yet.
        </div>
      )}

      {/* Random card */}
      {!loading && item && !item.message && (
        <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-xl">
          <h2 className="text-3xl font-semibold">{item.title}</h2>

          <p className="mt-3 text-gray-700">{item.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm">
              Difficulty: {item.difficulty}
            </span>
          </div>

          <Link
            to={`/skill/${item._id}`}
            className="mt-6 inline-block w-full bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700 transition"
          >
            View Full Skill Path
          </Link>
        </div>
      )}

      {/* Discover button */}
      <button
        onClick={fetchRandom}
        className="mt-8 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
      >
        Discover Another
      </button>
    </div>
  );
}
