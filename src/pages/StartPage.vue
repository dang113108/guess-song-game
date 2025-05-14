<template>
  <div class="start-page">
    <h1>猜歌遊戲</h1>
    <button @click="startGame">開始遊戲</button>
  </div>
</template>

<script setup>
import { useGameStore } from '@/store/gameStore'
import { useRouter } from 'vue-router'

const game = useGameStore()
const router = useRouter()

// 開始遊戲
const startGame = async () => {
  await game.loadQuestions() // 載入題庫
  router.push('/question')    // 跳轉到問題頁
}
</script>


<style scoped>
.start-page {
  text-align: center;
  padding: 3rem;
}

button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #388e3c;
}
</style>
