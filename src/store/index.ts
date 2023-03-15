import Vue from 'vue';
import Vuex from 'vuex';
import type { IndexResData } from '@/server';
// @ts-ignore

Vue.use(Vuex);

export interface IState {
  indexData: IndexResData | null;
}
export default new Vuex.Store<IState>({
  state: {
    indexData: null,
  },
  actions: {
    async getIndexData() {
      console.log(1);
    },
  },
  getters: {},
  mutations: {},
});
