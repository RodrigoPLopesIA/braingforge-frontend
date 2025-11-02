import { Link } from "react-router";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to BrainForge</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        Explore exercises, practice questions, and create new challenges to enhance your learning experience.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          View Exercises
        </Link>

        <Link
          to="/create"
          className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 transition"
        >
          Create Exercise
        </Link>
      </div>
    </div>
  );
}
