import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
export interface ScienceQuestion {
    id: string;
    statement: string;
    options: string[] | null;
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
    score: number;
    explanation: string;
}

export interface ScienceExercise {
    id: string;
    exerciseId: string;
    title: string;
    totalScore: number;
    userScore: number;
    questions: ScienceQuestion[];
    createdAt: string;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface PagedScienceExercises {
    content: ScienceExercise[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export default function ExerciseList() {
  const [results, setResults] = useState<PagedScienceExercises>();
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { exerciseId } = useParams <{ exerciseId: string }>();
  const navigation = useNavigate();
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:8080/exercises/${exerciseId}/answers`); // 🔹 busca todos os exercícios
        if (!response.ok) {
          throw new Error("Erro ao buscar resultados");
        }
        const data = await response.json();

        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <p>Carregando resultados...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Exercícios Respondidos</h2>

      {results?.content.length === 0 ? (
        <p>Nenhum exercício respondido encontrado.</p>
      ) : (
        results?.content.map((exercise) => (
          <div
            key={exercise.exerciseId}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor: "#fafafa",
              cursor: "pointer",
            }}
            onClick={() =>
              setExpanded(expanded === exercise.exerciseId ? null : exercise.exerciseId)
            }
          >
            <div>
              <h3 style={{ marginBottom: "5px" }}>{exercise.title}</h3>
              <p>
                <strong>Pontuação:</strong> {exercise.userScore}/{exercise.totalScore}
              </p>
              <p>
              <strong>Data de resposta:</strong>{" "}
              {new Date(exercise.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}{" "}
              às{" "}
              {new Date(exercise.createdAt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
              <p style={{ color: "#555" }}>
                {expanded === exercise.exerciseId
                  ? "Clique para ocultar respostas ▲"
                  : "Clique para ver respostas ▼"}
              </p>
              <button onClick={() =>  navigation(`/exercises/${exercise.exerciseId}/answered/${exercise.id}`)}>Details</button>
            </div>

            {expanded === exercise.exerciseId && (
              <div style={{ marginTop: "15px" }}>
                {exercise.questions.map((q) => (
                  <div
                    key={q.id}
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      border: "1px solid #eee",
                      borderRadius: "6px",
                      backgroundColor: q.isCorrect ? "#e6ffed" : "#ffe6e6",
                    }}
                  >
                    <p><strong>Pergunta:</strong> {q.statement}</p>
                    <p><strong>Sua Resposta:</strong> {q.userAnswer}</p>
                    <p><strong>Resposta Correta:</strong> {q.correctAnswer}</p>
                    <p><strong>Explicação:</strong> {q.explanation}</p>
                    <p><strong>Correto?</strong> {q.isCorrect ? "Sim" : "Não"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
