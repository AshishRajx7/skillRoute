import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/paths");
        setPaths(res.data);
      } catch (error) {
        console.log("Failed to load paths", error);
      }
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Skill Paths</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path) => (
          <Link
            key={path._id}
            to={`/skill/${path._id}`}
            className="bg-white shadow-md p-5 rounded-lg hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-semibold">{path.title}</h2>

            <p className="text-gray-600 mt-2 line-clamp-2">
              {path.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {path.tags?.map((t, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>Difficulty: {path.difficulty}</span>
              <span>Likes: {path.likes}</span>
              <span>Views: {path.views}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
