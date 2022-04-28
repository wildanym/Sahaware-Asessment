<template>
  <div
    class="flex flex-col sm:max-w-[628px] items-start gap-6 px-4 mt-8 md:mb-32"
  >
    <h1 class="text-2xl font-medium sm:text-4xl">{{ content.title }}</h1>
    <p class="text-lg font-light">{{ content.short_description }}</p>
    <img :src="content.image" alt="thumbnail" class="sm:w-full" />
    <p>{{ content.description }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      content: {},
    };
  },
  methods: {
    getArticleById() {
      const data = {
        url: `https://restify-sahaware-boilerplate.herokuapp.com/api/article/${this.$route.params.id}`,
        method: "GET",
      };
      axios(data).then((response) => {
        this.content = response.data.content;
      });
    },
  },
  created() {
    this.getArticleById();
  },
};
</script>

<style></style>
