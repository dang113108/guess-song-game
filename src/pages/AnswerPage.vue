<template>
  <div>
    <div class="answer-page" :class="{ 'hidden': showDialog }">
      <div class="card answer-card">
        <h2>正確答案</h2>
        <div class="song-info">
          <div class="song-title">{{ currentQuestion.title }}</div>
          <div class="song-singer">{{ currentQuestion.singer }}</div>
        </div>
        <div class="lyrics-preview">
          <div class="quote">"</div>
          <p>{{ currentQuestion.lyrics }}</p>
          <div class="quote closing">"</div>
        </div>
      </div>
      
      <div class="buttons">
        <button class="btn-back" @click="goBackToQuestion">
          <span class="icon">⬅</span>
          回到問題頁
        </button>
        <button class="btn-correct" @click="handleCorrectAnswer">
          <span class="icon">✓</span>
          答對
        </button>
        <button class="btn-wrong" @click="handleIncorrectAnswer">
          <span class="icon">✗</span>
          答錯
        </button>
      </div>
    </div>
    
    <!-- 結果提示對話框 (獨立於答案頁) -->
    <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
      <div class="dialog-content" :class="{ 'correct': isCorrectAnswer, 'incorrect': !isCorrectAnswer }">
        <div class="dialog-icon">{{ isCorrectAnswer ? '🎉' : '😅' }}</div>
        <h3>{{ dialogMessage }}</h3>
        <button class="dialog-button" @click="closeDialog">
          <span class="icon">➡️</span>
          進入下一題
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/store/gameStore'
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const game = useGameStore()
const router = useRouter()

// 對話框控制
const showDialog = ref(false)
const dialogMessage = ref('')
const isCorrectAnswer = ref(false)

// 當組件掛載時確保答案頁面是可見的
onMounted(() => {
  showDialog.value = false
})

// 取得當前題目
const currentQuestion = computed(() => game.getCurrentQuestion())

// 回到問題頁
const goBackToQuestion = () => {
  router.push('/question')
}

// 關閉對話框並導向下一題
const closeDialog = () => {
  showDialog.value = false
  
  // 導向問題頁
  router.push({
    path: '/question',
    query: { t: Date.now() }
  })
}

// 處理答對
const handleCorrectAnswer = () => {
  // 1. 先標記當前題目為答對
  game.markAsCorrect()
  
  // 2. 顯示成功對話框 (同時隱藏答案頁面)
  dialogMessage.value = '恭喜答對！進入下一題'
  isCorrectAnswer.value = true
  showDialog.value = true
  
  // 3. 移動到下一題
  game.goToNextQuestion()
}

// 處理答錯
const handleIncorrectAnswer = () => {
  // 1. 先標記當前題目為答錯
  game.markAsIncorrect()
  
  // 2. 顯示失敗對話框 (同時隱藏答案頁面)
  dialogMessage.value = '哎呀！答錯了！下一題再接再厲！'
  isCorrectAnswer.value = false
  showDialog.value = true
  
  // 3. 移動到下一題
  game.goToNextQuestion()
}
</script>


<style scoped>
.answer-page {
  text-align: center;
  animation: fadeIn 0.5s ease-out;
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.answer-page.hidden {
  visibility: hidden;
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.answer-card {
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  animation: slideIn 0.6s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.song-info {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background-color: #f8f9ff;
  border-radius: 8px;
  border-left: 4px solid #3f51b5;
}

.song-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #3f51b5;
  margin-bottom: 0.5rem;
}

.song-singer {
  font-size: 1.2rem;
  color: #666;
}

.lyrics-preview {
  position: relative;
  font-style: italic;
  color: #666;
  padding: 0 1.5rem;
  margin: 1.5rem 0;
}

.quote {
  position: absolute;
  top: -10px;
  left: 0;
  font-size: 2rem;
  color: #3f51b5;
  opacity: 0.3;
}

.quote.closing {
  left: auto;
  right: 0;
  top: auto;
  bottom: -20px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

button {
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-weight: 500;
}

.btn-back {
  background-color: #9e9e9e;
  color: white;
}

.btn-back:hover {
  background-color: #757575;
}

.btn-correct {
  background-color: #4caf50;
  color: white;
}

.btn-correct:hover {
  background-color: #388e3c;
}

.btn-wrong {
  background-color: #f44336;
  color: white;
}

.btn-wrong:hover {
  background-color: #d32f2f;
}

.icon {
  margin-right: 8px;
  font-size: 1rem;
}

/* 對話框樣式 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease-out;
}

.dialog-content {
  background-color: transparent;
  padding: 2rem;
  max-width: 100%;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.4s ease-out;
  box-shadow: none;
}

.dialog-content.correct {
  background: linear-gradient(135deg, rgba(51, 105, 30, 0.9), rgba(76, 175, 80, 0.8));
}

.dialog-content.incorrect {
  background: linear-gradient(135deg, rgba(183, 28, 28, 0.9), rgba(244, 67, 54, 0.8));
}

.dialog-icon {
  font-size: 6rem;
  margin-bottom: 2rem;
  animation: bounce 0.5s ease infinite alternate;
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-10px); }
}

.dialog-content h3 {
  margin-bottom: 2rem;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.dialog-button {
  background: white;
  color: #333;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin-top: 2rem;
  transition: all 0.3s ease;
}

.dialog-button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.dialog-content.correct .dialog-button {
  color: #2e7d32;
}

.dialog-content.incorrect .dialog-button {
  color: #c62828;
}

@media (max-width: 480px) {
  .buttons {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  button {
    width: 100%;
  }
}

@media (prefers-color-scheme: dark) {
  .answer-card {
    background-color: #2d2d2d;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  }
  
  .song-info {
    background-color: #3a3a3a;
    border-left: 4px solid #5c6bc0;
  }
  
  .song-title {
    color: #8c9eff;
  }
  
  .song-singer {
    color: #aaa;
  }
  
  .lyrics-preview {
    color: #aaa;
  }
  
  .quote {
    color: #5c6bc0;
  }
  
  /* 黑暗模式下的對話框 */
  .dialog-content.correct {
    background: linear-gradient(135deg, rgba(46, 125, 50, 0.95), rgba(67, 160, 71, 0.9));
  }
  
  .dialog-content.incorrect {
    background: linear-gradient(135deg, rgba(198, 40, 40, 0.95), rgba(229, 57, 53, 0.9));
  }
  
  .dialog-button {
    background-color: rgba(255, 255, 255, 0.9);
  }
}
</style>
