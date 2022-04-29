<template>
  <div class="relative flex justify-center w-full h-screen">
    <div
      class="sm:w-[564px] sm:h-[570px] w-full absolute bottom-0 sm:top-24 bg-white rounded-lg flex flex-col p-3 sm:p-20 z-40"
    >
      <!-- Close Button -->
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
          <span
            class="cursor-pointer text-secondaryRed"
            @click="changeComponent('CreateAccount')"
            >Create Account</span
          >
        </span>
      </div>

      <!-- Form -->
      <form @submit.prevent="login">
        <!-- Email -->
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

        <!-- Password -->
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
          <div
            v-if="!loginStatus"
            class="absolute p-2 text-sm bg-red-100 border rounded-sm -bottom-14 border-secondaryRed text-secondaryRed"
          >
            {{ errors.message }}
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
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      show: false,
      email: "",
      password: "",
      errors: {
        email: false,
        pass: false,
        message: "",
      },
      loginStatus: true,
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
      setUser: "auth/setUser",
      changeStatus: "alert/changeStatus",
      changeMessage: "alert/changeMessage",
      changeColor: "alert/changeColor",
    }),
    emailValidate() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        return (this.errors.email = false);
      }
      return (this.errors.email = true);
    },
    login() {
      if (this.errors.email || this.errors.pass) {
        alert("periksa lagi pengisi");
      } else {
        const config = {
          method: "post",
          url: "https://restify-sahaware-boilerplate.herokuapp.com/api/auth/login",
          data: {
            email: this.email,
            password: this.password,
          },
        };

        axios(config)
          .then((response) => {
            this.changeStatus(true);
            this.changeMessage(response.data.message);
            this.changeColor("bg-blue-100  border-blue-300");
            setTimeout(() => {
              this.changeStatus(false);
            }, 4000);

            this.setUser(response.data.content[0].is_user);
            localStorage.setItem("token", response.data.content[0].token);
            this.changeShow(false);
            this.loginStatus = true;
          })
          .catch((error) => {
            this.loginStatus = false;
            this.errors.message = error.response.data.message;
          });
      }
    },
  },
};
</script>

<style></style>
