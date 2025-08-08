import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useInputStore = defineStore('inputstore', {
  state: () => ({
    inputData: {},
  }),
  getters: {
    getInputData: (state) => state.inputData,
  },
  actions: {
    setInputData(inputdata) {
      this.inputData = inputdata
    },
    resetInputData() {
      this.inputData = {}
    },
  },
})
