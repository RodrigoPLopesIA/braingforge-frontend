import { useEffect, useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';
import { Link } from 'react-router';

export default function ExerciseList() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/exercises')
      .then(res => res.json())
      .then(data => setExercises(data));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">All Exercises</h1>
      {exercises.map(ex => (
        <Link 
          to={`/exercise/${ex.id}`} 
          key={ex.id} 
          className="block p-4 bg-white rounded-lg shadow-md hover:bg-blue-50"
        >
          <h2 className="font-semibold">{ex.theme}</h2>
          <p className="text-gray-600">{ex.description}</p>
        </Link>
      ))}
    </div>
  );
}
