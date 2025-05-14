<template>
  <div class="question-page" v-if="currentQuestion">
    <h2>{{ currentQuestion.lyrics }}</h2>
    <div class="buttons">
      <button @click="passQuestion">跳過</button>
      <button @click="showAnswer">查看答案</button>
      <button @click="endGame">結束遊戲</button>
    </div>
  </div>
  <div v-else>
    <p>載入中...</p>
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

// 跳過題目
const passQuestion = () => {
  game.nextQuestion()
  router.push('/question')
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
  padding: 2rem;
}

.lyrics {
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
}

button {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button.pass {
  background-color: #f0ad4e;
  color: white;
}

button.answer {
  background-color: #0275d8;
  color: white;
}

button.end {
  background-color: #d9534f;
  color: white;
}

.loading {
  text-align: center;
  padding: 2rem;
}
</style>
