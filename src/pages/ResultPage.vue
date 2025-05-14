<template>
  <div class="result-page">
    <div class="card result-card">
      <h2>遊戲結束</h2>
      <div class="score-summary">
        <div class="score-item correct">
          <span class="score-number">{{ correctCount }}</span>
          <span class="score-label">答對</span>
        </div>
        <div class="divider"></div>
        <div class="score-item incorrect">
          <span class="score-number">{{ incorrectCount }}</span>
          <span class="score-label">答錯</span>
        </div>
      </div>
    </div>
    
    <h3 class="history-title">所有歌曲列表</h3>
    <div class="song-list">
      <div 
        v-for="(question, index) in game.questions" 
        :key="index" 
        class="song-item"
      >
        <div class="song-details">
          <div class="song-title">{{ question.title }}</div>
          <div class="song-singer">{{ question.singer }}</div>
        </div>
        <button class="btn-view" @click="viewQuestion(index)">
          <span class="icon">👁</span>
          查看歌詞
        </button>
      </div>
    </div>
    
    <button class="btn-restart" @click="restartGame">
      <span class="icon">🔄</span>
      重新開始
    </button>
  </div>
</template>

<script setup>
import { useGameStore } from '@/store/gameStore'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const game = useGameStore()
const router = useRouter()
const showDetailsId = ref(null)

// 正確數量與錯誤數量
const correctCount = computed(() => game.questions.filter(q => q.isCorrect).length)
const incorrectCount = computed(() => game.questions.filter(q => !q.isCorrect).length)

// 查看問題
const viewQuestion = (index) => {
  showDetailsId.value = showDetailsId.value === index ? null : index
}

// 重新開始遊戲
const restartGame = () => {
  router.push('/')
}
</script>


<style scoped>
.result-page {
  text-align: center;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.result-card {
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

.score-summary {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 1rem;
}

.score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
}

.score-number {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.score-label {
  font-size: 1rem;
  color: #666;
}

.score-item.correct .score-number {
  color: #4caf50;
}

.score-item.incorrect .score-number {
  color: #f44336;
}

.divider {
  width: 1px;
  height: 60px;
  background-color: #e0e0e0;
}

.history-title {
  color: #3f51b5;
  margin: 2rem 0 1rem;
  font-size: 1.4rem;
}

.song-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.song-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: left;
}

.song-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.song-details {
  display: flex;
  flex-direction: column;
}

.song-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.2rem;
}

.song-singer {
  font-size: 0.9rem;
  color: #666;
}

.btn-view {
  padding: 0.5rem 1rem;
  background-color: #f1f3ff;
  color: #3f51b5;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-view:hover {
  background-color: #e8eaff;
  transform: none;
  box-shadow: none;
}

.btn-restart {
  margin-top: 1.5rem;
  padding: 0.8rem 2rem;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
}

.btn-restart:hover {
  background-color: #303f9f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.icon {
  margin-right: 8px;
}

@media (max-width: 480px) {
  .score-item {
    padding: 0 1rem;
  }
  
  .song-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .btn-view {
    width: 100%;
  }
}

@media (prefers-color-scheme: dark) {
  .result-card {
    background-color: #2d2d2d;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  }
  
  .score-label {
    color: #aaa;
  }
  
  .divider {
    background-color: #444;
  }
  
  .history-title {
    color: #8c9eff;
  }
  
  .song-item {
    background-color: #2d2d2d;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  .song-title {
    color: #e0e0e0;
  }
  
  .song-singer {
    color: #aaa;
  }
  
  .btn-view {
    background-color: #3a3a3a;
    color: #8c9eff;
  }
  
  .btn-view:hover {
    background-color: #444;
  }
}
</style>
