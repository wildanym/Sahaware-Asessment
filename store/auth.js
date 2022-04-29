import axios from "axios";
export const state = () => ({
  token: "",
  user: true,
});

export const mutations = {
  setToken: (state, payload) => {
    state.token = payload;
  },
  setUser: (state, payload) => {
    state.user = payload;
  },
};

export const actions = {
  setToken: ({ commit, dispatch }, payload) => {
    commit("setToken", payload);

    dispatch("checkToken", payload);
  },

  checkToken: ({ commit }, payload) => {
    const config = {
      method: "post",
      url: "https://restify-sahaware-boilerplate.herokuapp.com/api/auth/login",
      data: {
        email: payload.email,
        password: payload.password,
      },
    };

    axios(config)
      .then((response) => {
        // commit("setUser", response.data);
        console.log(response);
      })
      .catch(() => {
        // commit("setUser", {});
        // commit("setToken", "");
      });
  },

  setUser: ({ commit }, payload) => {
    commit("setUser", payload);
  },
};

export const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
};
