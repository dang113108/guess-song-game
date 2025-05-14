import { ref } from 'vue'

const questions = ref([]) // 儲存題庫
const currentQuestionIndex = ref(0) // 顯示當前題目的索引

const loadQuestions = async () => {
  try {
    const response = await fetch('/guess-song-game/questions.json')
    const data = await response.json()
    console.log('題庫已載入:', data) // 輸出題庫資料
    questions.value = data.questions
    currentQuestionIndex.value = 0  // 確保載入題庫後將索引設為 0
  } catch (error) {
    console.error('載入題庫錯誤:', error)
  }
}

const getCurrentQuestion = () => {
  console.log('當前題目索引:', currentQuestionIndex.value) // 輸出當前題目索引
  return questions.value[currentQuestionIndex.value] // 根據索引取得題目
}

const nextQuestion = () => {
  currentQuestionIndex.value++
  if (currentQuestionIndex.value >= questions.value.length) {
    currentQuestionIndex.value = 0 // 回到第一題，或你可以選擇結束遊戲
  }
}

export const useGameStore = () => ({
  questions,
  currentQuestionIndex,
  loadQuestions,
  getCurrentQuestion,
  nextQuestion,
})
