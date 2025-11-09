import { useState } from 'react';
import type { Exercise } from '../interfaces/Exercise';

export default function ExerciseCreate() {
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">('EASY');
  const [type, setType] = useState<"ANY" | "DISCURSIVE" | "MULTIPLE_CHOICE">('ANY');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newExercise: Partial<Exercise> = { theme, description, difficulty, type, numberOfQuestions };

    await fetch('http://localhost:8080/exercises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExercise),
    });

    alert('Exercise created!');
    setTheme('');
    setDescription('');
    setDifficulty('EASY');
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Exercise</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Theme</label>
          <input
            type="text"
            value={theme}
            onChange={e => setTheme(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border rounded-md p-2"
            rows={4}
          />
        </div>
        <div>
          <label className="block mb-1">Number of questions</label>
          <input type="number" value={numberOfQuestions} onChange={e => setNumberOfQuestions(Number(e.target.value))} className="w-full border rounded-md p-2" />
        </div>

        <div>
          <label className="block mb-1">Difficulty</label>
          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Type</label>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="ANY">Any</option>
            <option value="DISCURSIVE">Discursive</option>
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Exercise
        </button>
      </form>
    </div>
  );
}
