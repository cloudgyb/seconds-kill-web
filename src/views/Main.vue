<template>
  <div>
    <common-header />
    <router-view class="main" />
  </div>
</template>

<script>
import CommonHeader from './CommonHeader.vue'
export default {
  name: 'Main',
  components: { CommonHeader }
}
</script>

<style lang="scss" scoped></style>
