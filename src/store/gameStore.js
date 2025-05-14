import { ref } from 'vue'

const questions = ref([]) // 儲存題庫
const currentQuestionIndex = ref(0) // 顯示當前題目的索引

const loadQuestions = async () => {
  try {
    const response = await fetch('/guess-song-game/questions.json')
    const data = await response.json()
    console.log('題庫已載入:', data) // 輸出題庫資料

    // 將每個問題加入 isCorrect 屬性用於追蹤回答
    questions.value = data.questions.map(q => ({
      ...q,
      isCorrect: null // null = 尚未回答, true = 答對, false = 答錯
    }))

    currentQuestionIndex.value = 0  // 確保載入題庫後將索引設為 0
  } catch (error) {
    console.error('載入題庫錯誤:', error)
  }
}

const getCurrentQuestion = () => {
  console.log('當前題目索引:', currentQuestionIndex.value) // 輸出當前題目索引
  return questions.value[currentQuestionIndex.value] // 根據索引取得題目
}

const nextQuestion = (isCorrect = null) => {
  // 記錄當前問題的回答結果
  if (isCorrect !== null && currentQuestionIndex.value < questions.value.length) {
    questions.value[currentQuestionIndex.value].isCorrect = isCorrect
  }

  currentQuestionIndex.value++
  if (currentQuestionIndex.value >= questions.value.length) {
    currentQuestionIndex.value = 0 // 回到第一題，或你可以選擇結束遊戲
  }
}

const correctAnswer = () => {
  nextQuestion(true)
}

const incorrectAnswer = () => {
  nextQuestion(false)
}

export const useGameStore = () => ({
  questions,
  currentQuestionIndex,
  loadQuestions,
  getCurrentQuestion,
  nextQuestion,
  correctAnswer,
  incorrectAnswer
})
