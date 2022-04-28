<template>
  <div class="relative flex flex-col items-center pb-24 font-roboto md:pb-0">
    <TheNavbar />
    <Nuxt />
    <!-- <LoginModal /> -->
    <TheFooter />
  </div>
</template>

<script>
export default {};
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 200ms;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
