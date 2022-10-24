<script setup lang="ts">
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import SearchPage from "@/components/SearchPage.vue";
</script>

<style lang="scss">
// @import "~@/styles/variables";
@import "vuetify/styles/main.sass";

#app {
  // font-family: $family-primary;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: $primary;
}
</style>

<template>
  <main id="app">
    <div class="hero is-primary is-medium">
      <Hero msg="Welcome to Your Coveo Vue.js Search Page" />
    </div>
    <Suspense>
      <SearchPage />
    </Suspense>
  </main>
</template>
