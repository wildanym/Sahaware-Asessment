<template>
  <div
    class="flex flex-col w-full md:max-w-[954px] min-h-screen gap-12 px-4 sm:items-center md:flex-row"
  >
    <!-- create new article -->
    <div class="mt-8 sm:w-3/5 sm:mt-0">
      <h1 class="mb-8 text-2xl font-medium">Create New Article</h1>
      <!-- title -->
      <label class="font-normal sm:text-base" for="title">Title</label>
      <input
        type="text"
        id="title"
        placeholder="Enter Your Article Title"
        class="w-full px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow appearance-none sm:mb-8 focus:outline-none focus:shadow-outline"
        v-model="article.title"
      />
      <!-- description -->
      <client-only>
        <VueEditor
          class="w-full h-[330px] sm:h-96"
          placeholder="Write Your Story"
          minlength="10"
          v-model="content"
          :editorToolbar="customToolbar"
        />
      </client-only>
    </div>

    <!-- publication detail -->
    <div class="mt-12 sm:w-2/5 sm:mt-0">
      <h1 class="mb-8 text-2xl font-medium">Publication Detail</h1>
      <!-- short description -->
      <label class="font-normal sm:text-base" for="title"
        >Short Description</label
      >
      <textarea
        id="title"
        placeholder="Enter your Article Short Description"
        class="mb-6 w-full min-h-[132px] px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none sm:mb-8 focus:outline-none focus:shadow-outline"
        minlength="10"
        v-model="article.shortDescription"
      />
      <!-- thumbnail -->
      <label for="thumbnail">Thumbnail</label>
      <input
        ref="thumbnail"
        type="file"
        name="thumbnail"
        id="thumbnail"
        class="block w-full mb-6 text-sm text-gray-500 border border-gray-300 rounded-md file:py-2 file:px-6 file:border-0"
      />
      <!-- category -->
      <label for="category" class="block">Category</label>
      <div class="relative">
        <select
          class="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-400 focus:outline-none focus:shadow-outline"
          name="category"
          id="category"
          v-model="article.selectedCategory"
        >
          <option value="" disabled selected>Select Category</option>
          <option
            v-for="(item, index) of article.category"
            :key="`${item.id}`"
            :value="item.title"
          >
            {{ item.title }}
          </option>
        </select>
        <!-- published -->
        <div class="flex items-center justify-between w-full mt-8 mb-12">
          <div>Published</div>
          <div>
            <label for="published" class="flex items-center cursor-pointer">
              <div class="relative">
                <input
                  id="published"
                  type="checkbox"
                  class="sr-only peer"
                  v-model="article.published"
                />
                <div
                  class="w-10 h-4 bg-gray-300 rounded-full shadow-inner peer-checked:bg-Blue2/40"
                ></div>
                <div
                  class="absolute w-6 h-6 transition bg-gray-400 rounded-full shadow peer-checked:bg-Blue1 peer-checked:translate-x-full dot -left-1 -top-1"
                ></div>
              </div>
            </label>
          </div>
        </div>
        <!-- button -->
        <button
          @click="publish"
          type="button"
          class="w-full bg-secondaryRed btn"
        >
          Publish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import { create } from "domain";
export default {
  name: "create",
  data() {
    return {
      article: {
        title: "",
        shortDescription: "",
        selectedCategory: "",
        published: false,
        category: [],
      },
      content: "<p></p>",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
      ],
    };
  },
  computed: {
    ...mapGetters({
      token: "auth/token",
    }),
  },
  methods: {
    ...mapActions({
      setToken: "auth/setToken",
      changeStatus: "alert/changeStatus",
      changeMessage: "alert/changeMessage",
      changeColor: "alert/changeColor",
    }),
    reset() {
      this.article.title = "";
      this.article.shortDescription = "";
      this.content = "<p></p>";
      this.article.selectedCategory = "";
      this.article.published = false;
      this.$refs.thumbnail.value = "";
    },
    getArticleCategory() {
      const data = {
        url: `https://restify-sahaware-boilerplate.herokuapp.com/api/article-category`,
        method: "GET",
      };
      axios(data)
        .then((response) => {
          this.article.category = response.data.content;
        })
        .catch((error) => console.log(error.response));
    },
    publish() {
      if (
        this.article.title.length > 5 &&
        this.article.shortDescription.length > 10 &&
        this.content.length > 0 &&
        this.article.selectedCategory &&
        this.article.published
      ) {
        const file = this.$refs.thumbnail.files[0];

        const formData = new FormData();
        formData.append("title", this.article.title);
        formData.append("short_description", this.article.shortDescription);
        formData.append("description", this.content);
        formData.append("category_id", this.article.selectedCategory);
        formData.append("is_visible", this.article.published);
        formData.append("image", file);

        const data = {
          url: `https://restify-sahaware-boilerplate.herokuapp.com/api/article/create`,
          method: "POST",
          data: formData,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        };
        axios(data)
          .then((response) => {
            this.changeStatus(true);
            this.changeMessage(response.data.message);
            this.changeColor("bg-blue-100  border-blue-300");
            setTimeout(() => {
              this.changeStatus(false);
            }, 4000);
            this.reset();
          })
          .catch(() => {
            this.changeStatus(true);
            this.changeMessage("failed to Create Article ");
            this.changeColor("bg-red-100  border-red-300");
            setTimeout(() => {
              this.changeStatus(false);
            }, 4000);
          });
      } else {
        if (
          this.article.shortDescription.length > 0 &&
          this.article.shortDescription.length < 10
        ) {
          this.changeMessage("Short description must be at least 10 char");
        } else if (
          this.article.title.length > 0 &&
          this.article.title.length < 5
        ) {
          this.changeMessage("title must be at least 5 char");
        } else {
          this.changeMessage("all data must be filled");
        }
        this.changeStatus(true);
        this.changeColor("bg-red-100  border-red-300");

        setTimeout(() => {
          this.changeStatus(false);
        }, 4000);
      }
    },
  },
  created() {
    this.getArticleCategory();
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.setToken(localStorage.getItem("token"));
    }
  },
};
</script>

<style></style>
