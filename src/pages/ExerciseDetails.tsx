import { useEffect, useState } from "react";
import type { Exercise } from "../interfaces/Exercise";
import { useParams } from "react-router";

export default function ExerciseDetails() {
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetch(`http://localhost:8080/exercises/${id}`)
            .then(res => res.json())
            .then(data => setExercise(data));
    }, []);

    const handleSelectOption = (questionId: string, option: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 font-sans">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{exercise?.theme}</h1>
                <p className="text-gray-700">{exercise?.description}</p>
            </header>

            <main>
                <h2 className="text-2xl font-semibold mb-4">Questions</h2>
                <div className="space-y-6">
                    {exercise?.questions.map((question, qIndex) => (
                        <div key={question.id} className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="font-medium mb-2">
                                {qIndex + 1}. {question.title}
                            </h3>

                            {question.type === 'MULTIPLE_CHOICE' ? (
                                <div className="space-y-2">
                                    {question.options.map(option => (
                                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value={option}
                                                checked={answers[question.id] === option}
                                                onChange={() => handleSelectOption(question.id, option)}
                                                className="accent-blue-500"
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <textarea
                                    id={question.id}
                                    placeholder="Write your answer here..."
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    rows={4}
                                />
                            )}
                        </div>
                    ))}

                    <div>
                        <button className="btn">Submit Answers</button>
                    </div>
                </div>
            </main>
        </div>
    );
}