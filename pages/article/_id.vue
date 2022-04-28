<template>
  <div class="max-w-[628px] flex flex-col items-start gap-6 px-4 mt-8 md:mb-32">
    <h1 class="text-4xl font-medium">{{ content.title }}</h1>
    <span
      ><p>{{ content.short_description }}</p></span
    >
    <img :src="content.image" alt="thumbnail" class="w-full" />
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
        console.log(this.content);
      });
    },
  },
  created() {
    this.getArticleById();
  },
};
</script>

<style></style>
