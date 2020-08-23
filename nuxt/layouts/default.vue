<template>
  <div>
    <Header />

    <div class="l-main">
      <nuxt />
    </div>

    <Footer />

  </div>
</template>

<script lang="ts">
  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'

  export default {
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/var';
</style>
