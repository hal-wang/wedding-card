<template>
  <div id="app">
    <audio class="back-music" :autoplay="true">
      <source :src="`./王妃.mp3`" />
    </audio>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  position: relative;
  .back-music {
    height: 0;
    width: 0;
  }
}
body {
  margin: 0;
}
</style>
