<template>
  <div class="answer-page">
    <h2>正確答案</h2>
    <p>{{ currentQuestion.title }} - {{ currentQuestion.singer }}</p>
    <div class="buttons">
      <button @click="goBackToQuestion">回到問題頁</button>
      <button @click="correctAnswer">答對</button>
      <button @click="incorrectAnswer">答錯</button>
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
  game.nextQuestion()
  router.push('/question')
}

// 記錄答錯
const incorrectAnswer = () => {
  game.nextQuestion()
  router.push('/question')
}
</script>


<style scoped>
.answer-page {
  text-align: center;
  padding: 2rem;
}

.info {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.video {
  margin: 1rem 0;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

button {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button.back {
  background-color: #999;
  color: white;
}

button.correct {
  background-color: #4caf50;
  color: white;
}

button.wrong {
  background-color: #d9534f;
  color: white;
}

.loading {
  text-align: center;
  padding: 2rem;
}
</style>
