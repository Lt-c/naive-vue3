<script setup>
import MenuCollaose from './components/MenuCollapse.vue'
import BreadCrumb from './components/BreadCrumb.vue' /* 面包屑 */
</script>

<template>
  <div flex items-center>
    <MenuCollaose ml-8 />
    <BreadCrumb ml-10 />
    <div>left</div>
  </div>
  <div ml-auto flex items-center>
    <div>right</div>
  </div>
</template>
