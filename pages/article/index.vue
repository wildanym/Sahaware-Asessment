<template>
  <div class="flex justify-center w-full min-h-screen p-4 sm:px-20 sm:py-16">
    <CardComponent :articles="articles" class="flex-wrap" />
  </div>
</template>

<script>
import axios from "axios";
import CardComponent from "../../components/CardComponent.vue";
export default {
  name: "IndexPage",
  data() {
    return {
      size: 9,
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
  created() {
    this.getArticle();
  },
  components: { CardComponent },
};
</script>

<style></style>
