import { ref } from 'vue'

const questions = ref([]) // 儲存題庫
const currentQuestionIndex = ref(0) // 顯示當前題目的索引
const pendingAction = ref(null) // 用來存儲下一個動作

// Fisher-Yates shuffle 算法
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const loadQuestions = async () => {
  try {
    const response = await fetch('/guess-song-game/questions.json')
    const data = await response.json()
    console.log('題庫已載入:', data.questions.length + " questions loaded."); // 輸出題庫資料

    // 將每個問題加入 isCorrect 屬性用於追蹤回答，並進行隨機排序
    questions.value = shuffleArray(data.questions.map(q => ({
      ...q,
      isCorrect: null // null = 尚未回答, true = 答對, false = 答錯, 'skipped' = 跳過
    })))
    console.log('Questions processed and shuffled. First few new questions (if present among initial shuffle):', questions.value.slice(0,Math.min(5, questions.value.length)).filter(q => ["稻香", "老鼠愛大米", "卡路里"].includes(q.title)));


    currentQuestionIndex.value = 0  // 確保載入題庫後將索引設為 0
  } catch (error) {
    console.error('載入題庫錯誤:', error)
  }
}

// 標記當前問題為跳過
const markAsSkipped = () => {
  if (currentQuestionIndex.value < questions.value.length) {
    questions.value[currentQuestionIndex.value].isCorrect = 'skipped';
    console.log(`Question ${currentQuestionIndex.value} marked as skipped. State:`, questions.value[currentQuestionIndex.value].isCorrect);
  }
}

const getCurrentQuestion = () => {
  console.log('當前題目索引:', currentQuestionIndex.value) // 輸出當前題目索引
  return questions.value[currentQuestionIndex.value] // 根據索引取得題目
}

// 標記當前問題為答對
const markAsCorrect = () => {
  if (currentQuestionIndex.value < questions.value.length) {
    questions.value[currentQuestionIndex.value].isCorrect = true;
    console.log(`Question ${currentQuestionIndex.value} marked as correct. State:`, questions.value[currentQuestionIndex.value].isCorrect);
  }
}

// 標記當前問題為答錯
const markAsIncorrect = () => {
  if (currentQuestionIndex.value < questions.value.length) {
    questions.value[currentQuestionIndex.value].isCorrect = false;
    console.log(`Question ${currentQuestionIndex.value} marked as incorrect. State:`, questions.value[currentQuestionIndex.value].isCorrect);
  }
}

// 移動到下一題（不會自動記錄答案）
const goToNextQuestion = () => {
  currentQuestionIndex.value++
  if (currentQuestionIndex.value >= questions.value.length) {
    currentQuestionIndex.value = 0
  }
}

export const useGameStore = () => ({
  questions,
  currentQuestionIndex,
  loadQuestions,
  getCurrentQuestion,
  markAsCorrect,
  markAsIncorrect,
  markAsSkipped,
  goToNextQuestion
})
