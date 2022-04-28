<template>
  <div
    v-if="showStatus"
    class="absolute top-0 bottom-0 left-0 right-0 z-30 flex justify-center sm:-bottom-24 bg-black/40"
  >
    <component :is="currentComponent" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Login: () => import("./LoginModal.vue"),
  },
  computed: {
    ...mapGetters({
      showStatus: "dialog/show",
      currentComponent: "dialog/component",
    }),
  },
  methods: {
    ...mapActions({
      changeShow: "dialog/changeShow",
    }),
  },
};
</script>

<style></style>
