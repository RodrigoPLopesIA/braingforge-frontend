import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "flowbite-react";

export interface UserQuestion {
    id: string;
    statement: string;
    options: string[] | null;
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
    score: number;
    explanation: string;
}

export interface UserExercise {
    id: string;
    exerciseId: string;
    title: string;
    totalScore: number;
    userScore: number;
    questions: UserQuestion[];
    createdAt: string;
}


export default function AnsweredExercise() {
  const [exercise, setExercise] = useState<UserExercise | null>(null);
  const { exerciseId, answeredExerciseId } = useParams<{
    exerciseId: string;
    answeredExerciseId: string;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/exercises/${exerciseId}/answered/${answeredExerciseId}`)
      .then((res) => res.json())
      .then((data) => setExercise(data))
      .catch((err) => console.error("Erro ao carregar respostas:", err));
  }, [exerciseId, answeredExerciseId]);

  if (!exercise) {
    return <p className="text-center mt-10">Carregando respostas...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{exercise.title}</h1>
        <p className="text-gray-600">
          <strong>Pontuação total:</strong> {exercise.userScore} / {exercise.totalScore}
        </p>
        <p className="text-gray-500 text-sm">
          Respondido em: {new Date(exercise.createdAt).toLocaleString("pt-BR")}
        </p>
      </header>

      <main>
        <h2 className="text-2xl font-semibold mb-4">Questões Respondidas</h2>

        <div className="space-y-6">
          {exercise.questions.map((q, qIndex) => (
            <div
              key={q.id}
              className={`p-4 rounded-lg shadow-md bg-white"
                }`}
            >
              <h3 className="font-medium mb-3">
                {qIndex + 1}. {q.statement}
              </h3>

              {/* Questões de múltipla escolha */}
              {q.options?.length > 0 ? (
                <div className="space-y-2 mb-3">
                  {q.options.map((option) => {
                    let inputId = `${q.id}-${option}`;
                    let isUserAnswer = option === q.userAnswer;
                    let isCorrect = option === q.correctAnswer;

                    const color =
                      isCorrect
                        ? "bg-green-50 border-green-500"
                        : isUserAnswer
                          ? "bg-red-50 border-red-500"
                          : "border-gray-300";

                    return (
                      <label
                        key={inputId}
                        htmlFor={inputId}
                        className={`flex items-center space-x-2 border rounded-md p-2 cursor-not-allowed ${color}`}
                      >
                        <input
                          id={inputId}
                          type="radio"
                          name={q.id}
                          value={option}
                          checked={isUserAnswer}
                          disabled
                          className="accent-blue-500"
                        />
                        <span>{option}</span>

                        {isUserAnswer && (
                          <span className="ml-2 text-sm text-gray-700">(sua resposta)</span>
                        )}
                        {isCorrect && (
                          <span className="ml-2 text-sm text-green-700 font-semibold">(correta)</span>
                        )}
                      </label>
                    );
                  })}
                </div>
              ) : (
                // Questões discursivas
                <div className="mb-3">
                  <textarea
                    value={q.userAnswer}
                    disabled
                    rows={4}
                    className={`w-full border rounded-md p-2 resize-none ${q.isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
                      }`}
                  />
                  <p className="mt-2 text-sm">
                    <strong>Resposta correta:</strong>{" "}
                    <span className="text-green-700">{q.correctAnswer}</span>
                  </p>
                </div>
              )}

              {/* Explicação */}
              <div className="bg-gray-50 border-l-4 border-blue-400 rounded-md p-3 mt-3 text-sm">
                <strong>Explicação:</strong> {q.explanation}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button color="blue" onClick={() => navigate("/exercises")}>
            Voltar aos Exercícios
          </Button>
        </div>
      </main>
    </div>
  );
}
