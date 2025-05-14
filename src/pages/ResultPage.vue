<template>
  <div class="result-page">
    <h2>遊戲結束</h2>
    <p>答對了 {{ correctCount }} 題，答錯了 {{ incorrectCount }} 題。</p>
    <div v-for="(question, index) in game.questions" :key="index" class="question-result">
      <p>{{ question.title }} - {{ question.singer }}</p>
      <button @click="viewQuestion(index)">查看問題</button>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/store/gameStore'
import { computed } from 'vue'

const game = useGameStore()

// 正確數量與錯誤數量
const correctCount = computed(() => game.questions.filter(q => q.isCorrect).length)
const incorrectCount = computed(() => game.questions.filter(q => !q.isCorrect).length)

// 查看問題
const viewQuestion = (index) => {
  // 根據需要顯示問題詳細
}
</script>


<style scoped>
.result-page {
  text-align: center;
  padding: 2rem;
}

.history-list {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.history-list li {
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #ccc;
}

.history-list li:hover {
  background-color: #f5f5f5;
}

.history-list li.correct {
  color: #4caf50;
}

.history-list li.wrong {
  color: #d9534f;
}

.history-list li.pass {
  color: #999;
}

/* Dialog */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-box {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.dialog-box .video {
  margin: 1rem 0;
}

button.close {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
