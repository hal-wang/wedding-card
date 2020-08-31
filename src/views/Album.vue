<template>
  <div class="album-container">
    <div class="text flex justify-center">
      <span>— 相册 —</span>
    </div>

    <img src="@/assets/album/1.jpg" />
    <img src="@/assets/album/2.jpg" />
    <img src="@/assets/album/3.jpg" />
    <img src="@/assets/album/4.jpg" />
    <img src="@/assets/album/5.jpg" />
    <img src="@/assets/album/6.jpg" />
    <img src="@/assets/album/7.jpg" />
    <img src="@/assets/album/8.jpg" />
    <img src="@/assets/album/9.jpg" />
    <img src="@/assets/album/10.jpg" />
    <img src="@/assets/album/11.jpg" />
    <img src="@/assets/album/12.jpg" />
    <img src="@/assets/album/13.jpg" />

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
