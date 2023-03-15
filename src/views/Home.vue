<template>
  <div class="homeWrap">home</div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
    name: 'home',
  })
  export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
  .homeWrap {
    width: 100%;
    padding-top: 100px;
    overflow-x: hidden;
    background-color: #ffd3eb;
    background-repeat: no-repeat;
    background-position: 0px 100px;
    transition: all 0.3s;
  }
</style>
