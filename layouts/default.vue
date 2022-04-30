<template>
  <div
    class="relative max-w-[1440px] flex flex-col items-center pb-24 font-roboto md:pb-0"
  >
    <TheNavbar />
    <Nuxt />
    <Alert />
    <ModalDialog />
    <TheFooter />
  </div>
</template>

<script>
import Alert from "~/components/Alert.vue";
export default { components: { Alert } };
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
