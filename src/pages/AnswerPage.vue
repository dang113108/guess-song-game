<template>
  <div class="answer-page">
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
      <button class="btn-correct" @click="correctAnswer">
        <span class="icon">✓</span>
        答對
      </button>
      <button class="btn-wrong" @click="incorrectAnswer">
        <span class="icon">✗</span>
        答錯
      </button>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/store/gameStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const game = useGameStore()
const router = useRouter()

// 取得當前題目
const currentQuestion = computed(() => game.getCurrentQuestion())

// 回到問題頁
const goBackToQuestion = () => {
  router.push('/question')
}

// 記錄答對
const correctAnswer = () => {
  game.correctAnswer()
  router.push('/question')
}

// 記錄答錯
const incorrectAnswer = () => {
  game.incorrectAnswer()
  router.push('/question')
}
</script>


<style scoped>
.answer-page {
  text-align: center;
  animation: fadeIn 0.5s ease-out;
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
}
</style>
