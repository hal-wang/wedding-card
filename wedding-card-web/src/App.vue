<template>
  <div class="app-container" :style="{ transform: `scale(${scale},${scale})`, margin: margin }">
    <audio v-if="music" ref="audioRef" class="back-music" @canplay="onAudioCanPlay">
      <source :src="music" />
    </audio>
    <div class="router-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, AudioHTMLAttributes } from 'vue';
  import { get } from './utils/request';

  const audioRef = ref<AudioHTMLAttributes>();
  const music = ref('');

  const isWidthLarger = computed(() => {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    const wantWidth = (innerHeight * 1080) / 1920;
    return wantWidth < innerWidth;
  });

  const scale = computed(() => {
    if (isWidthLarger.value) {
      return window.innerHeight / 1920;
    } else {
      return window.innerWidth / 1080;
    }
  });

  const margin = computed(() => {
    if (isWidthLarger.value) {
      const width = (innerHeight * 1080) / 1920;
      const left = window.innerWidth / 2 - width / 2;
      return `0 ${left}px`;
    } else {
      const height = (innerWidth * 1920) / 1080;
      const top = window.innerHeight / 2 - height / 2;
      return `${top}px 0`;
    }
  });

  onMounted(async () => {
    await initMusic();
    await initIcon();
  });

  async function initMusic(): Promise<void> {
    const data = await get<{ url: string }>({
      url: 'res/music',
    });
    music.value = data?.url ?? '';
  }

  async function initIcon() {
    const data = await get<{ url: string }>({
      url: 'res/favicon',
    });

    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") || document.createElement('link');

    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = data?.url ?? '';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  async function onAudioCanPlay() {
    if (!audioRef.value) return;
    const audio = audioRef.value;
    try {
      await audio['play']();
    } catch {
      setTimeout(() => onAudioCanPlay(), 200);
    }
  }
</script>

<style lang="less">
  .app-container {
    position: relative;
    transform-origin: 0 0 0;
    width: 100%;
    height: 100%;

    .back-music {
      height: 0;
      width: 0;
    }

    .router-container {
      height: 1920px;
      width: 1080px;
    }
  }
  body {
    margin: 0;
    height: 0;
    width: 0;
  }
</style>
