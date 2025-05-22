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
        <div class="song-info">
          <div class="song-title">{{ question.title }}</div>
          <div class="song-singer">{{ question.singer }}</div>
          <div 
            :class="['song-status', getStatusClass(question.isCorrect)]"
          >
            {{ getStatusText(question.isCorrect) }}
          </div>
        </div>
        <button class="btn-view" @click="viewQuestion(index)">
          <span class="icon">👁</span>
          {{ showDetailsId === index ? '隱藏歌詞' : '查看歌詞' }}
        </button>
      </div>
      <div v-if="showDetailsId === index" class="song-full-details">
        <h4>{{ question.title }} - {{ question.singer }}</h4>
        <pre class="lyrics">{{ question.lyrics }}</pre>
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
const correctCount = computed(() => game.questions.value.filter(q => q.isCorrect === true).length)
const incorrectCount = computed(() => game.questions.value.filter(q => q.isCorrect === false || q.isCorrect === 'skipped').length)

const getStatusText = (status) => {
  if (status === true) return '答對'
  if (status === false) return '答錯'
  if (status === 'skipped') return '跳過'
  return '未回答'
}

const getStatusClass = (status) => {
  if (status === true) return 'status-correct'
  if (status === false) return 'status-incorrect'
  if (status === 'skipped') return 'status-skipped'
  return 'status-not-answered'
}

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
  /* The parent .song-list is a flex column, 
     so song-item itself doesn't need to be flex unless its direct children need specific flex alignment.
     The items *inside* song-item (song-info and btn-view) are handled by the inner display:flex of song-item.
     The new song-full-details will be a separate div outside this flex flow, appearing below.
  */
}

/* This rule was for the song-item itself, let's adjust if the new structure needs it */
.song-item > .song-info { /* Targeting the direct child to avoid affecting song-full-details */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
/* We need to ensure the button doesn't get pushed around if song-info grows. */
/* The song-item itself should be flex to arrange song-info and btn-view */
.song-item {
  display: flex; /* This was already here and is correct */
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: white;
  border-radius: 8px; /* Apply to top part only if details are shown */
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  text-align: left;
  /* If song-full-details is visible, round only top corners */
}

.song-item:has(+ .song-full-details) {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}


.song-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.song-info { /* Was .song-details */
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
}

.song-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.2rem;
}

.song-singer {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.4rem; 
}

.song-status {
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  display: inline-block; 
  align-self: flex-start; 
}

.status-correct {
  background-color: #e8f5e9; 
  color: #388e3c; 
}

.status-incorrect {
  background-color: #ffebee; 
  color: #c62828; 
}

.status-skipped {
  background-color: #fff3e0; 
  color: #ef6c00; 
}

.status-not-answered {
  background-color: #eceff1; 
  color: #455a64; 
}

.song-full-details {
  background-color: #f9f9f9;
  padding: 1rem 1.5rem;
  /* margin-top: -1px; Remove margin-top, ensure border-radius handles the join */
  border-radius: 0 0 8px 8px; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.05), inset 0 2px 4px rgba(0,0,0,0.04); /* Add outer shadow too */
  text-align: left;
  animation: fadeInDetail 0.4s ease-out;
  border-top: 1px solid #eee; /* Add a subtle top border */
}

@keyframes fadeInDetail {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.song-full-details h4 {
  margin-top: 0;
  margin-bottom: 0.8rem;
  color: #3f51b5;
}

.lyrics {
  white-space: pre-wrap; 
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  color: #555;
  max-height: 200px; 
  overflow-y: auto;
  background-color: #fff;
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid #eee;
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
  flex-shrink: 0; 
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
  
  .song-item { /* This style is for the general .song-item in dark mode */
    background-color: #2d2d2d;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  /* Ensure .song-info children are targeted correctly in dark mode */
  .song-info .song-title { 
    color: #e0e0e0;
  }
  
  .song-info .song-singer { 
    color: #aaa;
  }

  .status-correct {
    background-color: #2c3e50; 
    color: #2ecc71; 
  }

  .status-incorrect {
    background-color: #522020;
    color: #e74c3c;
  }

  .status-skipped {
    background-color: #583c1c;
    color: #f39c12;
  }

  .status-not-answered {
    background-color: #37474f;
    color: #90a4ae;
  }
  
  .song-full-details {
    background-color: #3a3a3a; 
    box-shadow: 0 2px 8px rgba(0,0,0,0.15), inset 0 2px 4px rgba(0,0,0,0.2);
    border-top: 1px solid #444;
  }

  .song-full-details h4 {
    color: #8c9eff; 
  }

  .lyrics {
    background-color: #2d2d2d; 
    color: #ccc; 
    border: 1px solid #444;
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
