<!--
 * @Author: bujunjie
 * @Date: 2021-12-29 14:59:00
 * @LastEditors: bujunjie
 * @LastEditTime: 2021-12-29 15:25:58
 * @Description:
-->
<template>
  <div class="title-wrap">
    <div class="title-bar"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TitleWrap',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.title-wrap {
  height: 55px;
  line-height: 55px;
  background-color: rgb(248, 248, 248);
  display: flex;
  align-items: center;
  .title-bar {
    height: 55px;
    width: 6px;
    background-color: rgb(44, 128, 255);
    margin-right: 15px;
  }
}
</style>
