<template>
  <div class="album-container">
    <div class="text flex justify-center">
      <span>— 相册 —</span>
    </div>

    <div v-if="imgs && imgs.length">
      <img v-for="img in imgs" :key="img" :src="img" />
    </div>

    <div class="text flex justify-center" style="padding-bottom: 40px">
      <span>— 更多请到访 —</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { get } from '/@/utils/request';

  const imgs = ref<string[]>([]);

  onMounted(async () => {
    const data = await get<string[]>({
      url: 'res/album',
    });
    imgs.value = data ?? [];
  });
</script>

<style lang="less" scoped>
  .album-container {
    height: 1880px;
    width: 1040px;

    img {
      width: 1040px;
      object-fit: contain;
      margin-bottom: 20px;
    }

    .text {
      font-size: 60px;
      letter-spacing: 30px;
      font-weight: 300;
      margin: 20px 0 40px 0;
    }
  }
</style>
