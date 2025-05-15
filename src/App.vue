<template>
  <div class="app-container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 添加全局導航守衛，確保即使路由相同也會重新渲染組件
router.beforeEach((to, from, next) => {
  // 如果路由相同，強制重新渲染
  if (to.path === from.path) {
    to.meta.forceRefresh = true
  }
  next()
})
</script>

<style>
.app-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  .app-container {
    background-color: #333;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
}
</style>
