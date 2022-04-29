<template>
  <div class="relative flex justify-center w-full h-screen">
    <div
      class="sm:w-[564px] sm:h-[700px] w-full absolute bottom-0 sm:top-24 bg-white rounded-lg flex flex-col p-3 sm:px-20 sm:py-14 z-40"
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
          Create Account
        </h2>
        <span class="block mt-8 sm:mt-0"
          >Have an account?
          <span
            class="cursor-pointer text-secondaryRed"
            @click="changeComponent('Login')"
            >Login</span
          >
        </span>
      </div>

      <form @submit.prevent="submitForm">
        <div class="relative my-6">
          <label
            class="block mb-2 text-base font-normal text-gray-700"
            for="email"
            >Fullname</label
          >
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Entry your fullname"
            v-model="name"
            required
          />
        </div>
        <div class="relative my-6">
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
            v-model="email"
            required
            @change="emailValidate"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-secondaryRed">
            You have entered an invalid email address
          </p>
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
            minlength="8"
            id="password"
            placeholder="Entry your password"
            v-model="password"
            required
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
        <div class="relative my-6">
          <label
            class="block mb-2 text-base font-normal text-gray-700"
            for="email"
            >Phone Number</label
          >
          <input
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="phone"
            name="phone"
            id="phone"
            placeholder="Entry your phone number"
            v-model="phone"
            required
            @change="phoneValidate"
          />
          <p
            v-if="errors.phone"
            class="absolute mt-1 text-sm -bottom-6 text-secondaryRed"
          >
            You have entered an invalid phone number
          </p>
        </div>
        <div
          v-if="!createStatus"
          class="absolute p-2 text-sm bg-red-100 border rounded-sm bottom-10 border-secondaryRed text-secondaryRed"
        >
          {{ errors.message }}
        </div>
        <input
          class="w-full font-normal mt-7 sm:text-xl sm:w-auto btn bg-secondaryRed"
          type="submit"
          value="Create Account"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      show: false,
      name: "",
      email: "",
      password: "",
      phone: "",
      errors: {
        email: false,
        pass: false,
        phone: false,
        message: "",
      },
      createStatus: true,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      changeShow: "dialog/changeShow",
      changeComponent: "dialog/changeComponent",
    }),
    emailValidate() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        return (this.errors.email = false);
      }
      return (this.errors.email = true);
    },
    phoneValidate() {
      if (/^08[0-9]*$/.test(this.phone)) {
        return (this.errors.phone = false);
      }
      return (this.errors.phone = true);
    },
    submitForm() {
      const config = {
        method: "post",
        url: "https://restify-sahaware-boilerplate.herokuapp.com/api/auth/register",
        data: {
          name: this.name,
          email: this.email,
          password: this.password,
          phone: this.phone,
        },
      };

      axios(config)
        .then((response) => {
          // commit("setUser", response.data);
          console.log("sukses");
          console.log(response.status);
        })
        .catch((error) => {
          // this.createStatus = false;
          // this.errors.message = error.response.data.message;
          console.error(error);
          // commit("setUser", {});
          // commit("setToken", "");
        });
    },
  },
};
</script>

<style></style>
