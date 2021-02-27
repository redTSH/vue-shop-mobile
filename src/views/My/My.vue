<template>
  <div class="warpper">
    <div class="header">
      <span class="header__icon iconfont">&#xe699;</span>
      <div class="person">
        <img
          class="person__img"
          src="http://www.dell-lee.com/imgs/vue3/user.png"
          alt="user"
        />
        <div class="person__info">
          <h3 class="person__info__name">热心市民李先生</h3>
          <p class="person__info__id">ID: 1069643013</p>
          <div class="person__info__class">
            <span class="person__info__class__icon iconfont">&#xe605;</span>16
          </div>
        </div>
        <div class="person__extra">
          <div class="person__extra__item">
            <span class="person__extra__item__title">红包</span>
            <span class="person__extra__item__num">218</span>
          </div>
          <div class="person__extra__item">
            <span class="person__extra__item__title">优惠券</span>
            <span class="person__extra__item__num">12张</span>
          </div>
          <div class="person__extra__item">
            <span class="person__extra__item__title">鲜豆</span>
            <span class="person__extra__item__num">88</span>
          </div>
          <div class="person__extra__item">
            <span class="person__extra__item__title">白条</span>
            <span class="person__extra__item__num">1000</span>
          </div>
        </div>
      </div>
    </div>
    <div class="func">
      <div class="func__wallet">
        <span class="func__wallet__icon iconfont">&#xe604;</span>我的钱包<span
          class="func__more iconfont"
          >&#xe603;</span
        >
      </div>
      <router-link to="/locationManage" class="func__posi">
        <span class="func__posi__icon iconfont">&#xe75f;</span>我的地址<span
          class="func__more iconfont"
          >&#xe603;</span
        >
      </router-link>
      <div class="func__service">
        <span class="func__service__icon iconfont">&#xe642;</span
        >客服与帮助<span class="func__more iconfont">&#xe603;</span>
      </div>
    </div>
    <Docker :active="'my'" />
  </div>
</template>

<script>
import Docker from '../../components/Docker/Docker'
export default {
  name: 'My',
  components: { Docker }
}
</script>

<style lang="scss" scoped>
.warpper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0.49rem;
  background-color: #f7f7f7;
}
.header {
  position: relative;
  width: 100%;
  height: 2.3rem;
  background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
  &::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    right: 0;
    bottom: 0;
    border-bottom: 50px solid #f7f7f7;
    border-left: 100px solid transparent;
  }
  &::after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    left: 0;
    bottom: 0;
    border-bottom: 50px solid #f7f7f7;
    border-right: 100px solid transparent;
  }
  &__icon {
    position: absolute;
    top: 0.4rem;
    right: 0.18rem;
    font-size: 0.22rem;
    color: #fff;
  }
}
.person {
  position: absolute;
  top: 0.89rem;
  left: 50%;
  transform: translateX(-50%);
  width: 3.39rem;
  height: 2.03rem;
  background-color: #fff;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  z-index: 99;
  &__img {
    position: absolute;
    top: -0.47rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0.94rem;
    height: 0.94rem;
    border-radius: 50%;
  }
  &__info {
    position: relative;
    height: 1.26rem;
    padding-top: 0.6rem;
    border-bottom: 0.01rem solid #f1f1f1;
    box-sizing: border-box;
    text-align: center;
    &__name {
      font-size: 0.24rem;
      line-height: 0.36rem;
      color: #262626;
    }
    &__id {
      font-size: 0.14rem;
      line-height: 0.17rem;
      color: #c1c0c9;
      margin-top: 0.02rem;
    }
    &__class {
      position: absolute;
      top: 0.7rem;
      right: 0.37rem;
      width: 0.7rem;
      padding-right: 0.07rem;
      box-sizing: border-box;
      height: 0.3rem;
      line-height: 0.3rem;
      color: #fff;
      font-size: 0.2rem;
      background-image: linear-gradient(180deg, #bee700 0%, #8aca00 100%);
      border-radius: 1rem;
      transform: scale(0.5);
      transform-origin: right top;
      &__icon {
        width: 0.2rem;
        height: 0.2rem;
        margin-right: 0.07rem;
        font-size: 0.2rem;
        color: #ffc700;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
      }
    }
  }
  &__extra {
    display: flex;
    padding-top: 0.12rem;
    &__item {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &__title {
        color: #c1c0c9;
        line-height: 0.17rem;
        margin-bottom: 0.03rem;
      }
      &__num {
        font-size: 0.2rem;
        line-height: 0.28rem;
        color: #262626;
      }
    }
  }
}
.func {
  height: 1.46rem;
  margin: 0.77rem 0.18rem 0 0.18rem;
  padding: 0 0.16rem;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  display: flex;
  flex-direction: column;
  &__wallet,
  &__posi,
  &__service {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: #262626;
    &__icon {
      width: 0.22rem;
      height: 0.22rem;
      text-align: center;
      line-height: 0.22rem;
      color: #fff;
      font-size: 0.12rem;
      border-radius: 0.08rem;
      margin-right: 0.12rem;
    }
  }
  &__wallet {
    &__icon {
      background: #ed4a47;
    }
  }
  &__posi {
    &__icon {
      background: #32c5ff;
    }
  }
  &__service {
    &__icon {
      background: #9013fe;
    }
  }
  &__more {
    position: absolute;
    display: inline-block;
    right: 0;
    font-size: 0.12rem;
    color: #c2c4ca;
    transform: rotate(180deg);
  }
}
</style>
