import { create } from 'zustand'
import { QuizSchema } from '@/lib/schema'

interface QuizState {
  currentQuestion: number
  answers: Partial<QuizSchema>
  setAnswer: (question: keyof QuizSchema, answer: string) => void
  nextQuestion: () => void
  resetQuiz: () => void
}

export const useQuizStore = create<QuizState>((set) => ({
  currentQuestion: 0,
  answers: {},
  setAnswer: (question, answer) => set((state) => ({
    answers: { ...state.answers, [question]: answer }
  })),
  nextQuestion: () => set((state) => ({
    currentQuestion: state.currentQuestion + 1
  })),
  resetQuiz: () => set({ currentQuestion: 0, answers: {} })
}))

