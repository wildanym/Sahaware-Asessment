<template>
  <div class="relative flex justify-center w-full h-screen">
    <div
      class="sm:w-[564px] sm:h-[570px] w-full absolute bottom-0 sm:top-24 bg-white rounded-lg flex flex-col p-3 sm:p-20 z-40"
    >
      <span
        class="absolute inline-block cursor-pointer top-5 right-5"
        @click="changeShow(false)"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 10.586L16.95 5.636L18.364 7.05L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.05L7.04999 5.636L12 10.586Z"
            fill="#263137"
          />
        </svg>
      </span>
      <div class="mb-6">
        <h2 class="md:my-2 text-xl sm:text-[34px] sm:leading-10 font-bold">
          Login
        </h2>
        <span class="block mt-8 sm:mt-0"
          >Don’t have an account?
          <a href="#" class="text-secondaryRed">Create Account</a>
        </span>
      </div>
      <form @submit.prevent="submitForm">
        <div class="my-6">
          <label
            class="block mb-2 text-base font-normal text-gray-700"
            for="email"
            >Email</label
          >
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            id="email"
            placeholder="Entry your email"
          />
        </div>
        <div class="relative my-6">
          <label
            class="block mb-2 text-base font-normal text-gray-700"
            for="password"
            >Password</label
          >
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            :type="show ? 'text' : 'password'"
            name="password"
            id="password"
            placeholder="Entry your password"
          />
          <div
            class="absolute bottom-[10px] cursor-pointer right-0 flex items-center pr-3 text-sm leading-5"
          >
            <img
              src="../assets/images/hidden.png"
              width="20"
              alt="hidden"
              @click="show = !show"
              :class="{ block: !show, hidden: show }"
            />
            <img
              src="../assets/images/unhide.png"
              width="20"
              alt="unhide"
              @click="show = !show"
              :class="{ hidden: !show, block: show }"
            />
          </div>
        </div>
        <input
          class="w-full mt-12 sm:w-auto btn bg-secondaryRed"
          type="submit"
          value="Log in"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    ...mapActions({
      changeShow: "dialog/changeShow",
    }),
  },
};
</script>

<style></style>
