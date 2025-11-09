import { useEffect, useState } from "react";
import type { Exercise } from "../interfaces/Exercise";
import { useNavigate, useParams } from "react-router";
import { Button } from "flowbite-react";


interface IAnswer {
    questionId: string;
    value: string;
}
export default function ExerciseDetails() {
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [answers, setAnswers] = useState<IAnswer[]>([]);
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:8080/exercises/${id}`)
            .then(res => res.json())
            .then(data => setExercise(data));
    }, []);
    const handleSelectOption = (questionId: string, value: string) => {
        setAnswers(prevAnswers => {
            const existingAnswerIndex = prevAnswers.findIndex(a => a.questionId === questionId);
            if (existingAnswerIndex > -1) {
                // Update existing answer
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[existingAnswerIndex] = { questionId, value };
                return updatedAnswers;
            } else {
                // Add new answer
                return [...prevAnswers, { questionId, value }];
            }
        });

        
    };

    const submit = () => {
        fetch(`http://localhost:8080/exercises/${id}/answer`, {
            body: JSON.stringify(answers),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setExercise(data));

            navigate(`/exercises/${id}/answered`);

        
    }

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
                                    {question.options.map(option => {
                                        const inputId = `${question.id}-${option}`;
                                        const checked = answers.find(a => a.questionId === question.id)?.value === option;
                                        return (
                                            <label key={inputId} htmlFor={inputId} className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    id={inputId}
                                                    type="radio"
                                                    name={question.id}
                                                    value={option}
                                                    checked={checked}
                                                    onChange={() => handleSelectOption(question.id, option)}
                                                    className="accent-blue-500"
                                                />
                                                <span>{option}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            ) : (
                                <textarea
                                    id={question.id}
                                    value={answers.find(a => a.questionId === question.id)?.value || ''}
                                    onChange={(e) => handleSelectOption(question.id, e.target.value)}
                                    placeholder="Write your answer here..."
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    rows={4}
                                />
                            )}
                        </div>
                    ))}

                    <div>
                        <Button className="btn btn-primary" onClick={submit}>Submit Answers</Button>
                    </div>
                </div>
            </main>
        </div>
    );
}