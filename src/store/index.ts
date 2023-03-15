/* eslint-disable import/no-cycle */
import Vue from "vue";
import Vuex from "vuex";
import IndexReq, { IndexResData } from "@/server";
// @ts-ignore
import { eventHub, EventNames } from "@/plugins/help";

Vue.use(Vuex);

export interface IState {
  indexData: IndexResData | null;
}
export default new Vuex.Store<IState>({
  state: {
    indexData: null,
  },
  actions: {
    async getIndexData({ state, commit }) {
      console.log(1);
    },
  },
  getters: {},
  mutations: {},
});
