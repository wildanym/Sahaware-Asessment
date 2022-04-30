<template>
  <div
    class="flex flex-col flex-wrap items-center w-full gap-6 cursor-pointer sm:items-start sm:justify-center sm:flex-row"
  >
    <!-- Cards -->

    <div
      v-for="(item, index) of articles"
      :key="`${item} - ${index}`"
      class="sm:w-[302px] max-w-[328px] w-full"
    >
      <nuxt-link :to="'/article/' + item.id">
        <div class="my-4 place-self-center sm:mb-4">
          <img
            :src="item.image"
            alt="thumbnail"
            class="w-full object-cover object-center h-[205px]"
          />
        </div>
        <div class="flex w-full text-justify">
          <h2 class="mb-4 text-2xl font-medium">{{ item.title }}</h2>
        </div>
        <div class="flex w-full text-justify">
          <p class="text-base">
            {{ item.short_description }}
          </p>
        </div>
      </nuxt-link>
    </div>
    <!-- End Cards -->
  </div>
</template>

<script>
export default {
  name: "CardsComponent",
  props: ["articles"],
};
</script>

<style></style>
