<template>
  <div class="start-page">
    <h1>猜歌遊戲</h1>
    <div class="description">
      <p>測試你的音樂知識！看歌詞猜歌名和歌手</p>
    </div>
    <button class="start-button" @click="startGame">
      <span class="icon">▶</span>
      開始遊戲
    </button>
    <div class="game-info">
      <p>準備好挑戰自己的音樂知識了嗎？</p>
    </div>
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
  padding: 2rem 1rem;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

h1 {
  margin-bottom: 1rem;
  font-size: 3rem;
  background: linear-gradient(45deg, #3f51b5, #5c6bc0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(63, 81, 181, 0.2);
}

.description {
  margin-bottom: 2.5rem;
  font-size: 1.2rem;
  color: #666;
}

.start-button {
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  background: linear-gradient(45deg, #3f51b5, #5c6bc0);
  color: white;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(63, 81, 181, 0.4);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.start-button:hover {
  background: linear-gradient(45deg, #303f9f, #3f51b5);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(63, 81, 181, 0.6);
}

.icon {
  margin-right: 8px;
  font-size: 1.1rem;
}

.game-info {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #888;
}

@media (prefers-color-scheme: dark) {
  .description {
    color: #aaa;
  }
  
  .game-info {
    color: #777;
  }
  
  h1 {
    background: linear-gradient(45deg, #5c6bc0, #8c9eff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
