<template>
  <div class="album-container">
    <div class="text flex justify-center">
      <span>— 相册 —</span>
    </div>

    <img v-for="(i, index) in 13" :key="index" :src="`./album/${index + 1}.jpg`" />

    <div class="text flex justify-center">
      <span>— 更多请到访 —</span>
    </div>
  </div>
</template>

<script>
export default {}
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
