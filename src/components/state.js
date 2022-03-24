import { ref, computed } from 'vue'

export const collapsed = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const SIDEBAR_WIDTH = 180
export const SIDEBAR_WIDTH_COLLAPSED = 38
export const SIDEBAR_WIDTH2 = 200
export const SIDEBAR_WIDTH_COLLAPSED2 = 58
export const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
)
export const sidebarWidth2 = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED2 : SIDEBAR_WIDTH2}px`
)
