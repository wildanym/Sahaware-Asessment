<template>
  <div
    class="flex flex-col flex-wrap justify-center w-full gap-6 cursor-pointer md:flex-row"
  >
    <!-- Cards -->
    <div
      v-for="(item, index) of articles"
      :key="`${item} - ${index}`"
      class="w-[302px]"
    >
      <img
        :src="item.image"
        alt="thumbnail"
        class="w-[302px] h-[205px] my-4 md:mb-4"
      />
      <div class="flex w-full text-justify">
        <h2 class="mb-4 text-2xl font-medium">{{ item.title }}</h2>
      </div>
      <div class="text-justify">
        <p class="text-base">
          {{ item.short_description }}
        </p>
      </div>
    </div>
    <!-- End Cards -->
  </div>
</template>

<script>
export default {
  props: ["articles"],
};
</script>

<style></style>
