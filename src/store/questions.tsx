import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
}

//el create recibe un set que es una funcion que recibe un
///objeto con las propiedades que queremos actualizar
export const useQuestionsStore = create<State>((set, get) => {
  return {
    loading: false,
    questions: [],
    currentQuestion: 0, // indice de la pregunta actual

    fetchQuestions: async (limit: number) => {
      // fetch es una funcion asincrona
      const res = await fetch("http://localhost:5173/data.json");
      const json = await res.json();
      // creramos un nuevo array con las preguntas aleatorias
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);

      // set es una funcion que recibe un objeto con las propiedades que queremos actualizar
      set({ questions });
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get();
      //usando StrcutureClone para clonar objeto
      const newQuestions = structuredClone(questions); //clonamos el array de preguntas
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId); //buscamos el indice de la pregunta
      const questionInfo = newQuestions[questionIndex]; //obtenemos la pregunta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex; //comparamos la respuesta del usuario con la respuesta correcta

      if (isCorrectUserAnswer) confetti();

      //cambiar la informacion en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex,
      };

      //actualizar el estado
      set({ questions: newQuestions });
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion });
      }
    },

    goPreviousQuestion: () => {
      const { currentQuestion } = get();
      const previousQuestion = currentQuestion - 1;

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion });
      }
    },
  };
});
