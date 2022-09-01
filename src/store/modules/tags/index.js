import { sStorage } from '@/utils/cache'
import { defineStore } from 'pinia'
import { tags, activeTag, WITHOUT_TAG_PATHS } from './helers'
import { router } from '@/router'

/* tags */
export const useTagsStore = defineStore('tag', {
  state() {
    return {
      tags: tags || [],
      activeTag: activeTag || '',
    }
  },
  actions: {
    /* 点击事件，设定目前活动的路由 */
    setActiveTag(path) {
      this.activeTag = path
      sStorage.set('activeTag', path)
    },
    setTags(tags) {
      this.tags = tags
      sStorage.set('tags', tags)
    },
    /* 点击新的按钮，触发添加tag */
    addTag(tag = {}) {
      this.setActiveTag(tag.path)
      if (WITHOUT_TAG_PATHS.includes(tag.path) || this.tags.some((item) => item.path === tag.path)) return
      this.setTags([...this.tags, tag])
    },
    /* 移除一个tag */
    removeTag(path) {
      if (path === this.activeTag) {
        const activeIndex = this.tags.findIndex((item) => item.path === path)
        if (activeIndex > 0) {
          router.push(this.tags[activeIndex - 1].path)
        } else {
          router.push(this.tags[activeIndex + 1].path)
        }
      }
      this.setTags(this.tags.filter((tag) => tag.path !== path))
    },
    /* 移除其他的tags */
    removeOther(curPath = this.activeTag) {
      this.setTags(this.tags.filter((tag) => tag.path === curPath))
      if (curPath !== this.activeTag) {
        router.push(this.tags[this.tags.length - 1].path)
      }
    },
    removeLeft(curPath) {
      const curIndex = this.tags.findIndex((item) => item.path === curPath)
      const filterTags = this.tags.filter((item, index) => index >= curIndex)
      this.setTags(filterTags)
      if (!filterTags.find((item) => item.path === this.activeTag)) {
        // 跳转到数组末尾那个tags
        router.push(filterTags[filterTags.length - 1].path)
      }
    },
    removeRight(curPath) {
      const curIndex = this.tags.findIndex((item) => item.path === curPath)
      const filterTags = this.tags.filter((item, index) => index <= curIndex)
      if (!filterTags.find((item) => item.path === this.activeTag)) {
        router.push(filterTags[filterTags.length - 1].path)
      }
    },
  },
})
