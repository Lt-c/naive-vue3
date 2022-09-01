<script setup>
// import { debounce } from '@/utils'
</script>

<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  background-color: #fff;
  overflow: hidden;
  position: relative;

  .content {
    padding: 0 10px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    transition: transform 0.5s;
  }
}
</style>
