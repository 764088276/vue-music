<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="confirmShow" @click="hideConfirmCt">
      <div class="confirm-wrapper">
        <div class="confirm-text">
          {{text}}
        </div>
        <div class="confirm-btns">
          <div class="cancel" @click.stop="cancel">{{cancelBtn}}</div>
          <div class="sure" @click.stop="sure">{{sureBtn}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
  export default{
    props: {
      text: {
        type: String,
        default: ''
      },
      sureBtn: {
        type: String,
        default: '确定'
      },
      cancelBtn: {
        type: String,
        default: '取消'
      }
    },
    data(){
      return {
        confirmShow: false
      }
    },
    methods: {
      showConfirmCt(){
        this.confirmShow = true
      },
      hideConfirmCt(){
        this.confirmShow = false
      },
      cancel(){
        this.$emit('cancel');
        this.hideConfirmCt();
      },
      sure(){
        this.hideConfirmCt();
        this.$emit('sure')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable';

  .confirm {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    .confirm-wrapper {
      width: 80%;
      margin: auto;
      background: @color-highlight-background;
      border-radius: 10px;
      .confirm-text {
        padding: 20px;
        color: @color-dialog-background;
        font-size: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1)
      }
      .confirm-btns {
        width: 100%;
        line-height: 40px;
        > div {
          float: left;
          width: 50%;
          text-align: center;
          color: @color-theme-d;
          &:first-child {
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            box-sizing: border-box;
          }
        }
      }
    }
  }

  .confirm-fade-enter-active, .confirm-fade-leave-active{
    transition: all 0.2s;
    opacity:1;
  }

  .confirm-fade-enter, .confirm-fade-leave-to{
    opacity:0
  }
</style>
