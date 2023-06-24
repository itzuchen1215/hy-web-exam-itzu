<script setup lang="ts">
import { ref, provide } from 'vue'
import axios from 'axios'
import type { IVideoListResponse } from '@/types/api'
import { ListType } from '@/types/enum'
import VideoSwiper from '@/components/VideoSwiper.vue'

const activeName = ref<ListType>(ListType.ForYou)
const followingList = ref<IVideoListResponse[]>([])
const forYouList = ref<IVideoListResponse[]>([])

axios({
  method: 'get',
  url: '/api/following_list'
}).then((res) => {
  followingList.value = res.data.items
})

axios({
  method: 'get',
  url: '/api/for_you_list'
}).then((res) => {
  forYouList.value = res.data.items
})

const muted = ref<boolean>(true)

function handleClickMuteButton() {
  muted.value = !muted.value
}

provide('muted', muted)
</script>

<template>
  <van-config-provider theme="dark">
    <van-button plain @click="handleClickMuteButton" class="muted-control-btn" type="default">
      {{ muted ? 'Unmute!' : 'Mute!' }}
    </van-button>
    <van-tabs
      v-model:active="activeName"
      title-active-color="#FFF"
      title-inactive-color="#FFFFFF70"
      background="transparent"
      :swipeable="false"
    >
      <van-tab title="Following" :name="ListType.Following">
        <VideoSwiper :video-list="followingList" :tabActive="activeName === ListType.Following" />
      </van-tab>
      <van-tab title="For You" :name="ListType.ForYou">
        <VideoSwiper :video-list="forYouList" :tabActive="activeName === ListType.ForYou" />
      </van-tab>
    </van-tabs>
    <!-- fake tabbar -->
    <van-tabbar>
      <van-tabbar-item icon="wap-home">Home</van-tabbar-item>
      <van-tabbar-item icon="friends-o">Friends</van-tabbar-item>
      <van-tabbar-item icon="orders-o">Inbox</van-tabbar-item>
      <van-tabbar-item icon="user-o">Profile</van-tabbar-item>
    </van-tabbar>
  </van-config-provider>
</template>

<style lang="scss">
:root {
  --van-tab-font-size: 16px;
  --van-tabs-line-height: 40px;
  --van-tabs-bottom-bar-width: 20px;
  --van-tabs-bottom-bar-color: #fff;
  --van-tabbar-height: 40px;
  --van-tabbar-item-icon-size: 16px;
  --van-tabbar-item-font-size: 11px;
}

.van-config-provider {
  width: 100%;
  max-width: inherit;
}

.muted-control-btn {
  position: fixed;
  left: 20px;
  top: 60px;
  z-index: 5;
}

.van-tabs {
  width: 100%;
  height: calc(100% - var(--van-tabbar-height));
  overflow: hidden;

  &__nav {
    width: 50%;
    margin: auto;
    overflow: hidden;
  }

  &__wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    padding-top: 12px;
  }

  &__content {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // bottom: var(--van-tabbar-height);
    height: calc(100% - var(--van-tabbar-height));
    &:before {
      content: '';
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 30%;
      z-index: 1;
      pointer-events: none;
    }
  }
}

.van-tab {
  &__text {
    font-weight: 600;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
}
</style>
