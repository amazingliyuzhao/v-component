<template>
  <div id="app">
    <keep-alive include="home">
      <router-view />
    </keep-alive>
  </div>
</template>
<script lang="ts">
  import { Mutation } from 'vuex-class';
  import { Component, Vue } from 'vue-property-decorator';
  // @ts-ignore

  @Component({})
  export default class APP extends Vue {
    @Mutation
    setIsLowAn!: (is: boolean) => void;
  }
</script>

<style lang="scss">
  body::-webkit-scrollbar {
    display: none;
  }
  html {
    // /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
    -ms-overflow-style: none;
    // /*火狐下隐藏滚动条*/
    // overflow: -moz-scrollbars-none;
  }
  #app {
    width: 100vw;
    color: #000;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
