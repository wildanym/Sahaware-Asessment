<template>
  <div class="w-full min-h-screen sm:p-20">
    <header
      class="h-[36.5rem] w-full bg-[url('/hero.jpg')] bg-cover bg-center"
    ></header>
    <!-- Articles wrapper -->
    <section class="flex flex-col items-center w-full gap-8 px-4 mt-8 md:mt-20">
      <h1 class="text-4xl font-bold sm:text-5xl md:mb-12">Article</h1>
      <CardComponent :articles="articles" class="flex-col md:flex-row" />
    </section>
    <!-- End Articles Wrapper -->
  </div>
</template>

<script>
import axios from "axios";
import CardComponent from "../components/CardComponent.vue";
export default {
  name: "IndexPage",
  data() {
    return {
      size: 3,
      articles: [],
    };
  },
  methods: {
    getArticle() {
      const data = {
        url: `https://restify-sahaware-boilerplate.herokuapp.com/api/article?search=&size=${this.size}&page=1`,
        method: "GET",
      };
      axios(data)
        .then((response) => {
          this.articles = response.data.content;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getArticle();
  },
  components: { CardComponent },
};
</script>

<style></style>
