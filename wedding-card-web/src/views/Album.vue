<template>
  <div class="album-container">
    <div class="text flex justify-center">
      <span>— 相册 —</span>
    </div>

    <div v-if="imgs && imgs.length">
      <img v-for="img in imgs" :key="img" :src="img" />
    </div>

    <div class="text flex justify-center">
      <span>— 更多请到访 —</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import request from "../utils/request";
Options({});
export default class extends Vue {
  imgs = [] as string[];

  async mounted(): Promise<void> {
    await this.initAlbum();
  }

  async initAlbum(): Promise<void> {
    const res = await request.get("res/album");
    this.imgs = res.data;
  }
}
</script>

<style lang="scss" scoped>
.album-container {
  height: 1880px;
  width: 1040px;
  margin: 20px;

  img {
    width: 1040px;
    object-fit: contain;
    margin-bottom: 20px;
  }

  .text {
    font-size: 60px;
    letter-spacing: 30px;
    font-weight: 300;
    margin: 30px 0 50px 0;
  }
}
</style>
