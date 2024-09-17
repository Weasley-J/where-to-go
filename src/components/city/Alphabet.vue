<script setup>
const props = defineProps({
  alphabetList: {
    type: Array,
    default: () => {
      const result = []
      for (let i = 65; i <= 90; i++) {
        result.push(String.fromCharCode(i))
      }
      return result
    }
  }
})

function clickAlphabet(alphabet) {
  alert(`You clicked: ${alphabet}`)
}
</script>

<template>
  <div class="container">
    <div class="list">
      <ul v-for="(alphabet, index) in alphabetList" :key="index">
        <li class="item" @click="clickAlphabet(alphabet)">{{ alphabet }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container
  position: relative;
  width: 100%;

  .list
    float: right;
    margin-top 1.45rem
    padding-right .8rem

    .item
      line-height 0.88rem
      font-size 0.88rem
      text-align center
      margin-top .18rem;
      padding .08rem
      color #000000
      border 1px solid #00bcd4
      border-radius 50%
</style>
