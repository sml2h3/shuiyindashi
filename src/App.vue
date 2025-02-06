<template>
  <div id="app" class="dark-theme">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
// 定义全局变量
:root {
  --primary-black: #1a1a1a;
  --secondary-black: #242424;
  --accent-red: #ff0000;
  --text-white: #ffffff;
  --text-gray: #999999;
  --border-dark: #333333;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: var(--primary-black);
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-white);
  height: 100vh;
  background-color: var(--primary-black);
}

// 重写Element UI的一些基础样式
.el-button--primary {
  background-color: var(--text-white);
  border-color: var(--text-white);
  color: var(--primary-black);
  
  &:hover, &:focus {
    background-color: var(--text-gray);
    border-color: var(--text-gray);
    color: var(--primary-black);
  }
}

.el-card {
  background-color: var(--secondary-black);
  border: none;
  color: var(--text-white);
  
  .el-card__body {
    background-color: var(--secondary-black);
  }
}
</style> 