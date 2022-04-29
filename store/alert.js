import axios from "axios";
export const state = () => ({
  status: false,
  message: "",
  color: "",
});

export const mutations = {
  setStatus: (state, payload) => {
    state.status = payload;
  },
  setMessage: (state, payload) => {
    state.message = payload;
  },
  setColor: (state, payload) => {
    state.color = payload;
  },
};

export const actions = {
  changeStatus: ({ commit }, payload) => {
    commit("setStatus", payload);
  },
  changeMessage: ({ commit }, payload) => {
    commit("setMessage", payload);
  },
  changeColor: ({ commit }, payload) => {
    commit("setColor", payload);
  },
};

export const getters = {
  status: (state) => state.status,
  message: (state) => state.message,
  color: (state) => state.color,
};
