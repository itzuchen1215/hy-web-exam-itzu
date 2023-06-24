<script setup lang="ts">
import { ref, type PropType, computed } from 'vue'
import { useWindowSize } from '@vant/use'
import type { IVideoListResponse } from '@/types/api'
import VideoPlayer from '@/components/VideoPlayer.vue'
import type { SwipeInstance } from 'vant'

const props = defineProps({
  tabActive: {
    type: Boolean,
    default: false
  },
  videoList: {
    type: Array as PropType<IVideoListResponse[]>,
    default: () => []
  }
})

const { height } = useWindowSize()
const videoSwiper = ref<SwipeInstance | null>(null)

const activeSwipeIndex = ref<number>(0)
const isDragStart = ref<boolean>(false)

const swipeItemHeight = computed(() => {
  return height.value - 40
})

function handleSwipeChange(index: number) {
  activeSwipeIndex.value = index
}

function handleDragStart() {
  isDragStart.value = true
}

function handleDragEnd() {
  isDragStart.value = false
}

function isItemActive(index: number) {
  return props.tabActive && index === activeSwipeIndex.value
}
</script>

<template>
  <van-swipe
    v-if="videoList.length > 0"
    ref="videoSwiper"
    vertical
    :show-indicators="false"
    :height="swipeItemHeight"
    :duration="400"
    @drag-start="handleDragStart"
    @drag-end="handleDragEnd"
    @change="handleSwipeChange"
  >
    <van-swipe-item v-for="(item, index) in videoList" :key="index">
      <img
        class="video-cover"
        v-show="isItemActive(index) && isDragStart"
        :src="item.cover"
        :alt="item.title"
      />
      <VideoPlayer
        :video-src="item['play_url']"
        :video-active="isItemActive(index)"
        :poster="item.cover"
      />
    </van-swipe-item>
  </van-swipe>
</template>

<style lang="scss" scoped>
.video-cover {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
}
</style>
