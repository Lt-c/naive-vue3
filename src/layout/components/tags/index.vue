<script setup>
import ContextMenu from './ContextMenu.vue'
import ScrollX from '@/components/common/ScrollX.vue'
import { useTagsStore } from '@/store/modules/tags'
import { useRoute, useRouter } from 'vue-router'
import { watch, reactive, nextTick } from 'vue'

const route = useRoute()
const router = useRouter()
const tagsStore = useTagsStore()

const menuOptions = reactive({
  show: false,
  x: 0,
  y: 0,
  curPath: '',
})

/* watch路由，自动生成tags */
watch(
  () => route.path,
  () => {
    const { name, path } = route
    const title = route.meta?.title
    tagsStore.addTag({ name, path, title })
  },
  { immediate: true }
)
/* 单击tag跳转 */
const handleTagClick = (path) => {
  tagsStore.setActiveTag(path)
  router.push(path)
}

const setMenuOptions = (x, y, curPath) => {
  Object.assign(menuOptions, { x, y, curPath })
}

//* 右键单击时间 */
const handleContextMenu = async (e, path) => {
  const { clientX, clientY } = e
  menuOptions.show = false
  setMenuOptions(clientX, clientY, path)
  await nextTick()
  menuOptions.show = true
}
</script>

<template>
  <ScrollX>
    <n-tag
      v-for="tag in tagsStore.tags"
      :key="tag.path"
      class="px-15 mx-5 rounded-4 cursor-pointer hover:color-primary"
      :type="tagsStore.activeTag === tag.path ? 'primary' : 'default'"
      :closable="tagsStore.tags.length > 1"
      @close.stop="tagsStore.removeTag(tag.path)"
      @click="handleTagClick(tag.path)"
      @contextmenu.prevent="handleContextMenu($event, tag.path)"
    >
      {{ tag.title }}
    </n-tag>
    <ContextMenu
      v-if="menuOptions.show"
      v-model:show="menuOptions.show"
      :x="menuOptions.x"
      :y="menuOptions.y"
      :path="menuOptions.curPath"
    />
  </ScrollX>
</template>

<style>
.n-tag__close {
  box-sizing: content-box;
  border-radius: 50%;
  font-size: 12px;
  padding: 2px;
  transform: scale(0.9);
  transform: translateX(5px);
  transition: all 0.3s;
}
</style>
