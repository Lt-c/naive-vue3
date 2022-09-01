import { sStorage } from '@/utils/cache'

export const tags = sStorage.get('tags')
export const activeTag = sStorage.get('avtiveTag')

export const WITHOUT_TAG_PATHS = ['/404', '/login']
