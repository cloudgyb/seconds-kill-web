<template>
  <div>
    <common-header />
    <router-view />
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
