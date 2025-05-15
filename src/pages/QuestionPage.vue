<template>
  <div class="question-page" v-if="currentQuestion" :key="refreshKey">
    <div class="card lyrics-card">
      <h2>猜猜這首歌</h2>
      <div class="lyrics">{{ currentQuestion.lyrics }}</div>
    </div>
    
    <div class="buttons">
      <button class="btn-skip" @click="passQuestion">
        <span class="icon">⏭</span>
        跳過
      </button>
      <button class="btn-answer" @click="showAnswer">
        <span class="icon">👁</span>
        查看答案
      </button>
      <button class="btn-end" @click="endGame">
        <span class="icon">⏹</span>
        結束遊戲
      </button>
    </div>
  </div>
  <div v-else class="loading">
    <div class="spinner"></div>
    <p>載入中...</p>
  </div>
</template>

<script setup>
import { useGameStore } from '@/store/gameStore'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const game = useGameStore()
const router = useRouter()
const refreshKey = ref(0)

// 取得當前題目
const currentQuestion = computed(() => game.getCurrentQuestion())

// 跳過題目
const passQuestion = () => {
  // 移動到下一題並強制重新渲染
  game.goToNextQuestion()
  refreshKey.value++
}

// 顯示答案
const showAnswer = () => {
  router.push('/answer')
}

// 結束遊戲
const endGame = () => {
  router.push('/result')
}
</script>

<style scoped>
.question-page {
  text-align: center;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.lyrics-card {
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: slideIn 0.6s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.lyrics {
  font-size: 1.4rem;
  margin: 1.5rem 0;
  line-height: 1.6;
  font-weight: 500;
  color: #333;
  padding: 1rem;
  border-left: 4px solid #3f51b5;
  background-color: #f8f9ff;
  text-align: left;
  border-radius: 0 8px 8px 0;
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

.btn-skip {
  background-color: #ff9800;
  color: white;
}

.btn-skip:hover {
  background-color: #f57c00;
}

.btn-answer {
  background-color: #3f51b5;
  color: white;
}

.btn-answer:hover {
  background-color: #303f9f;
}

.btn-end {
  background-color: #f44336;
  color: white;
}

.btn-end:hover {
  background-color: #d32f2f;
}

.icon {
  margin-right: 8px;
  font-size: 1rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(63, 81, 181, 0.2);
  border-radius: 50%;
  border-top-color: #3f51b5;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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
  .lyrics-card {
    background-color: #2d2d2d;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  }
  
  .lyrics {
    color: #e0e0e0;
    background-color: #3a3a3a;
    border-left: 4px solid #5c6bc0;
  }
  
  .spinner {
    border-color: rgba(92, 107, 192, 0.2);
    border-top-color: #5c6bc0;
  }
}
</style>
