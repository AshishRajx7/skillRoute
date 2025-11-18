import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function SkillDetail() {
  const { id } = useParams();
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/paths/${id}`);
        setPath(res.data);
      } catch (err) {
        console.error("Failed to load skill path", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Skill Path...
      </div>
    );
  }

  if (!path) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        Skill Path Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-extrabold mb-4">{path.title}</h1>

      {/* Add Step Button */}
      <Link
        to={`/skill/${id}/add-step`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-6"
      >
        Add a Step
      </Link>

      <p className="text-gray-700 text-lg mb-4">{path.description}</p>

      <div className="flex flex-wrap gap-3 mb-6">
        <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm">
          Difficulty: {path.difficulty}
        </span>

        {path.tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}

        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
          Views: {path.views}
        </span>

        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
          Likes: {path.likes}
        </span>
      </div>

      <h2 className="text-2xl font-bold mb-4">Steps</h2>

      {path.steps.length === 0 && (
        <p className="text-gray-600">No steps added yet.</p>
      )}

      <div className="flex flex-col gap-6">
        {path.steps.map((step) => (
          <div
            key={step._id}
            className="bg-white p-5 rounded-lg shadow-md border"
          >
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-gray-700 mt-2">{step.description}</p>
            <p className="mt-1 text-sm text-gray-500">
              Order: {step.stepNumber}
            </p>

            {step.resources?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-lg mb-2">Resources</h4>
                <ul className="list-disc ml-5 space-y-1">
                  {step.resources.map((r) => (
                    <li key={r._id}>
                      <a
                        href={r.url}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        {r.title}
                      </a>
                      <p className="text-sm text-gray-500">{r.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
