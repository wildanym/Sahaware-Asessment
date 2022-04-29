<template>
  <div
    v-if="status"
    :class="'fixed z-50 px-6 py-3 border rounded-md top-24 ' + [color]"
  >
    {{ message }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Alert",
  computed: {
    ...mapGetters({
      message: "alert/message",
      status: "alert/status",
      color: "alert/color",
    }),
  },
};
</script>

<style></style>
