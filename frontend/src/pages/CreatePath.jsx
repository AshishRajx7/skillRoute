import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreatePath() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      const res = await api.post("/paths/create", {
        title,
        description,
        difficulty,
        tags,
      });

      const createdId = res.data?.path?._id;

      if (!createdId) {
        setError("Unexpected response from server");
        setLoading(false);
        return;
      }

      navigate(`/skill/${createdId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create skill path");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow-xl p-8 rounded-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">Create New Skill Path</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded focus:ring focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full border px-4 py-2 rounded focus:ring focus:border-blue-500"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-gray-700 mb-1">Difficulty</label>
            <select
              className="w-full border px-4 py-2 rounded focus:ring focus:border-blue-500"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded focus:ring focus:border-blue-500"
              placeholder="ai, ml, python, react"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create Skill Path"}
          </button>
        </form>
      </div>
    </div>
  );
}
