<template>
  <div class="album-container">
    <div class="text flex justify-center">
      <span>— 相册 —</span>
    </div>

    <img
      v-for="(i, index) in 13"
      :key="index"
      :src="`./album/${index + 1}.jpg`"
    />

    <div class="text flex justify-center">
      <span>— 更多请到访 —</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.album-container {
  margin: 2vw;

  img {
    width: 96vw;
    object-fit: contain;
    margin-bottom: 2vw;
  }

  .text {
    font-size: 6vw;
    letter-spacing: 2vw;
    font-weight: 300;
    margin: 2vw 0 4vw 0;
  }
}
</style>
