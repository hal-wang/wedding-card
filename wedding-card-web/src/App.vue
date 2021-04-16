<template>
  <div id="app" class="flex" :style="{ transform: `scale(${scale},${scale})`, margin: margin }">
    <audio class="back-music" :autoplay="true">
      <source :src="`./王妃.mp3`" />
    </audio>
    <div class="app-conatiner">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isWidthLarger() {
      const innerHeight = window.innerHeight
      const innerWidth = window.innerWidth
      const wantWidth = (innerHeight * 1080) / 1920
      return wantWidth < innerWidth
    },
    scale() {
      if (this.isWidthLarger) {
        return window.innerHeight / 1920
      } else {
        return window.innerWidth / 1080
      }
    },
    margin() {
      if (this.isWidthLarger) {
        const width = (innerHeight * 1080) / 1920
        const left = window.innerWidth / 2 - width / 2
        return `0 ${left}px`
      } else {
        const height = (innerWidth * 1920) / 1080
        const top = window.innerHeight / 2 - height / 2
        return `${top}px 0`
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  transform-origin: 0 0 0;

  .back-music {
    height: 0;
    width: 0;
  }

  .app-conatiner {
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
