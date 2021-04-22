<template>
  <div
    id="app"
    class="flex"
    :style="{ transform: `scale(${scale},${scale})`, margin: margin }"
  >
    <audio v-if="music" class="back-music" :autoplay="true">
      <source :src="music" />
    </audio>
    <div class="app-conatiner">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import request from "./utils/request";

@Options({})
export default class extends Vue {
  music = "";

  get isWidthLarger(): boolean {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    const wantWidth = (innerHeight * 1080) / 1920;
    return wantWidth < innerWidth;
  }
  get scale(): number {
    if (this.isWidthLarger) {
      return window.innerHeight / 1920;
    } else {
      return window.innerWidth / 1080;
    }
  }

  get margin(): string {
    if (this.isWidthLarger) {
      const width = (innerHeight * 1080) / 1920;
      const left = window.innerWidth / 2 - width / 2;
      return `0 ${left}px`;
    } else {
      const height = (innerWidth * 1920) / 1080;
      const top = window.innerHeight / 2 - height / 2;
      return `${top}px 0`;
    }
  }

  async mounted(): Promise<void> {
    await this.initMusic();
    await this.initIcon();
  }

  async initMusic(): Promise<void> {
    const res = await request("res/music");
    this.music = res.data.url;
  }

  async initIcon(): Promise<void> {
    const res = await request("res/favicon");
    const link =
      <HTMLLinkElement>document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = res.data.url;
    document.getElementsByTagName("head")[0].appendChild(link);
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
