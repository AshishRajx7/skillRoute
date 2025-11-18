import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddStep() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stepNumber, setStepNumber] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/steps/add", {
  skillPathId: id,
  stepNumber: Number(stepNumber),
  title,
  description,
      });

      return navigate(`/skill/${id}`);
    } catch (err) {
        
      console.log(err);
      setError(err.response?.data?.message || "Failed to add step");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow-xl p-8 rounded-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">Add Step</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-700 mb-1">Step Number</label>
            <input
              type="number"
              value={stepNumber}
              onChange={(e) => setStepNumber(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Step Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Step Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            ></textarea>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Adding..." : "Add Step"}
          </button>
        </form>
      </div>
    </div>
  );
}
