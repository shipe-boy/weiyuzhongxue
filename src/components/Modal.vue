<!--  -->
<template>
  <div class="modal" v-if="isShowModal">
    <div class="msg">正在拼命加载中...</div>
  </div>
</template>

<script>
export default {
  props: {
    isShowModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  }
}

</script>
<style scoped>
.modal{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .2);
}
.msg{
  position: absolute;
  top: 10%;
  left: 40%;
  bottom: 0;
  right: 0;
  width: 200px;
  height: 30px;
  color: #000;
  text-align: center;
  line-height: 30px;
  background-color: #eee;
  border-radius: 20px;
}
</style>