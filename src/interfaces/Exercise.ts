export interface Question {
  id: string;
  title: string;
  options: string[];
  type: "MULTIPLE_CHOICE" | "DISCURSIVE";
  createdAt: string;
  updatedAt: string;
}

export interface Exercise {
  id: string;
  theme: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD"; 
  questions: Question[];
  createdAt: string; // ou Date
  updatedAt: string; // ou Date
}
