import { useEffect, useState } from 'react';
import type { ApiResponse, Exercise } from '../interfaces/Exercise';
import { Link } from 'react-router';

export default function ExerciseList() {
  const [exercises, setExercises] = useState<ApiResponse>();
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/exercises?page=${page}&size=3`)
      .then(res => res.json())
      .then(data => setExercises(data));
  }, [page]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">All Exercises</h1>

      {exercises?.content.map(ex => (
        <Link 
          to={`/exercise/${ex.id}`} 
          key={ex.id} 
          className="block p-4 bg-white rounded-lg shadow-md hover:bg-blue-50"
        >
          <h2 className="font-semibold">{ex.theme}</h2>
          <p className="text-gray-600">{ex.description}</p>
        </Link>
      ))}

      {/* Paginação */}
      <div className="flex items-center gap-4 mt-6">
        <button
          disabled={exercises?.first}
          onClick={() => setPage(prev => prev - 1)}
          className={`px-4 py-2 rounded bg-gray-200 ${
            exercises?.first ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
          }`}
        >
          Anterior
        </button>

        <span>
          Página {exercises?.number! + 1} de {exercises?.totalPages}
        </span>

        <button
          disabled={exercises?.last}
          onClick={() => setPage(prev => prev + 1)}
          className={`px-4 py-2 rounded bg-gray-200 ${
            exercises?.last ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
          }`}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
