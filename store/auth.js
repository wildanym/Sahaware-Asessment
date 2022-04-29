import axios from "axios";
export const state = () => ({
  token: "",
  user: "",
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
  setToken: ({ commit }, payload) => {
    commit("setToken", payload);
  },
  setUser: ({ commit }, payload) => {
    commit("setUser", payload);
  },
};

export const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
};
