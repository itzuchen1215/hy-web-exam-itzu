<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, inject, type Ref } from 'vue'
import videojs from 'video.js'

const props = defineProps({
  videoSrc: String,
  videoType: {
    type: String,
    default: 'application/x-mpegURL'
  },
  videoActive: {
    type: Boolean,
    default: false
  },
  poster: String
})

const muted = inject<Ref<boolean>>('muted')

const videoPlayer = ref<HTMLVideoElement | null>(null)
const player = ref<typeof videojs.players | null>(null)

watch(
  () => props.videoActive,
  (v) => {
    if (player.value) {
      if (v) {
        player.value.play()
      } else {
        player.value.pause()
      }
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (videoPlayer.value) {
    player.value = videojs(videoPlayer.value, {
      loop: true,
      inactivityTimeout: 0,
      preload: 'auto',
      muted: true,
      children: {
        mediaLoader: true,
        controlBar: {
          seekBar: {
            loadProgressBar: true,
            mouseTimeDisplay: false,
            playProgressBar: true
          },
          progressControl: false,
          durationDisplay: true, // total time
          currentTimeDisplay: true, // current time
          playToggle: true,
          remainingTimeDisplay: true,
          volumePanel: false,
          fullscreenToggle: false,
          timeDivider: false,
          liveDisplay: false,
          seekToLive: false,
          customControlSpacer: false,
          pictureInPictureToggle: false
        }
      }
    })

    // TODO: 桌機版會有問題
    player.value.on('click', () => {
      if (player.value.paused()) {
        player.value.play()
      } else {
        player.value.pause()
      }
    })

    // autoplay the first video
    player.value.on('loadeddata', () => {
      if (props.videoActive) {
        player.value.play()
      }
    })

    if (muted) {
      watch(
        () => muted.value,
        (isMuted: boolean) => {
          player.value.muted(isMuted)
        },
        { immediate: true }
      )
    }
  }
})

onBeforeUnmount(() => {
  player.value.dispose()
})
</script>

<template>
  <video
    ref="videoPlayer"
    class="video-player"
    controls
    playsinline
    :poster="poster"
    :autoplay="videoActive"
  >
    <source :src="videoSrc" :type="videoType" />
  </video>
</template>

<style lang="scss">
@import 'video.js/dist/video-js.min.css';

.video-player {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  .vjs-tech {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.vjs-control {
  &-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &-text {
    display: none;
  }
}

.vjs-play {
  &-progress {
    transition: opacity 0.2s linear;
    height: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    opacity: 0.8;
  }
  &-control {
    transition: opacity 0.2s linear;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: transparent;
    border: none;
    z-index: 4;
    .vjs-icon-placeholder {
      width: 50px;
      height: 50px;
      &:before {
        content: '';
        background-image: url('data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGIiBoZWlnaHQ9Ijc3cHgiIHdpZHRoPSI3N3B4IiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxwYXRoIGQ9Ik01MDAuMjAzLDIzNi45MDdMMzAuODY5LDIuMjRjLTYuNjEzLTMuMjg1LTE0LjQ0My0yLjk0NC0yMC43MzYsMC45MzlDMy44NCw3LjA4MywwLDEzLjkzMSwwLDIxLjMzM3Y0NjkuMzMzIGMwLDcuNDAzLDMuODQsMTQuMjUxLDEwLjEzMywxOC4xNTVjMy40MTMsMi4xMTIsNy4yOTYsMy4xNzksMTEuMiwzLjE3OWMzLjI2NCwwLDYuNTI4LTAuNzQ3LDkuNTM2LTIuMjRsNDY5LjMzMy0yMzQuNjY3IEM1MDcuNDM1LDI3MS40NjcsNTEyLDI2NC4wODUsNTEyLDI1NlM1MDcuNDM1LDI0MC41MzMsNTAwLjIwMywyMzYuOTA3eiIvPgoKPC9zdmc+');
        background-repeat: no-repeat;
        background-size: 46px;
        background-position: center center;
        opacity: 0.5;
      }
    }
  }
}

.vjs-playing {
  .vjs-progress-holder {
    opacity: 0;
  }
  .vjs-play {
    &-progress {
      opacity: 0;
    }
    &-control {
      opacity: 0;
    }
  }
}

.vjs-progress-holder {
  z-index: 5;
  transition: opacity 0.2s linear;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  &:before {
    content: '';
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, transparent 100%);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 0;
    pointer-events: none;
  }
}

.vjs-scrubbing {
  .vjs-duration {
    display: block;
  }
  .vjs-current-time {
    display: block;
  }
  .vjs-play {
    &-progress {
      height: 12px;
    }
  }
}

.vjs-time-control {
  z-index: 6;
  display: none;
  width: 50px;
  text-align: center;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  font-size: 26px;
  font-weight: 600;
}

.vjs-duration {
  left: calc(50% + 45px);
  color: #ffffff70;
}
.vjs-current-time {
  left: calc(50% - 45px);
  &:after {
    font-size: 16px;
    content: '/';
    position: absolute;
    top: 50%;
    right: -23px;
    transform: translateY(-50%);
    font-weight: 200;
  }
}

.vjs-load-progress {
  display: none;
}
</style>
