<template>
  <div class="homeWrap">home</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
  name: "home",
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.homeWrap {
  width: 100%;
  background-repeat: no-repeat;
  background-position: 0px 100px;
  background-color: #ffd3eb;
  overflow-x: hidden;
  padding-top: 100px;
  transition: all 0.3s;
}
</style>
