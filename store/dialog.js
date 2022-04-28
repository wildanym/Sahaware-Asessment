export const state = () => ({
  show: false,
  component: "",
});

export const mutations = {
  setShow: (state, value) => {
    state.show = value;
  },
  setComponent: (state, value) => {
    state.component = value;
  },
};

export const actions = {
  changeShow({ commit }, value) {
    commit("setShow", value);
  },
  changeComponent({ commit }, value) {
    commit("setComponent", value);
  },
};

export const getters = {
  show: (state) => state.show,
  component: (state) => state.component,
};
