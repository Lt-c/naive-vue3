<script setup>
import { useTagsStore } from '@/store/modules/tags'
import { useAppStore } from '@/store/modules/app'
import { renderIcon } from '@/utils/icon'
import { computed } from 'vue'

const tagsStore = useTagsStore()
const appStore = useAppStore()
// 父传子
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  path: {
    type: String,
    default: '',
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['update:show'])


/* 选项*/
const options = computed(() => [
  {
    label: '重新加载',
    key: 'reload',
    disabled: props.path !== tagsStore.activeTag,
    icon: renderIcon('mdi:reload', { size: 14 }),
  },
  {
    label: '关闭',
    key: 'close',
    disabled: tagsStore.tags.length <= 1,
    icon: renderIcon('mdi:reload', { size: 14 }),
  },
  {
    label: '关闭其他',
    key: 'close-other',
    disabled: tagsStore.tags.length <= 1,
    icon: renderIcon('mdi:reload', { size: 14 }),
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    disabled: tagsStore.tags.length <= 1 || props.path === tagsStore.tags[0].path,
    icon: renderIcon('mdi:reload', { size: 14 }),
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    disabled: tagsStore.tags.length <= 1 || props.path === tagsStore.tags[tagsStore.tags.length - 1].path,
    icon: renderIcon('mdi:reload', { size: 14 }),
  },
])
/* 可选行为项 */
const actionMap = new Map([
  [
    'reload',
    () => {
      appStore.reloadPage
    },
  ],
  [
    'close',
    () => {
      tagsStore.removeTag(props.path)
    },
  ],
  [
    'close-other',
    () => {
      tagsStore.removeOther(props.path)
    },
  ],
  [
    'close-left',
    () => {
      tagsStore.removeLeft(props.path)
    },
  ],
  [
    'close-right',
    () => {
      tagsStore.removeRight(props.path)
    },
  ],
])

const clickOutSide = () => {
  emit('update:show', false)
}
const handleSelect = (key) => {
  const acitonFn = actionMap.get(key)
  acitonFn && acitonFn()
  clickOutSide()
}
</script>

<template>
  <n-dropdown
    :show="show"
    :options="options"
    :x="x"
    :y="y"
    placement="bottom-start"
    @clickoutside="clickOutSide"
    @select="handleSelect"
  >
  </n-dropdown>
</template>

<style lang="scss"></style>
