import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useInputStore = defineStore('inputstore', {
  state: () => ({
    inputData: {},
    isEditingSomething: false,
  }),
  getters: {
    getInputData: (state) => state.inputData,
  },
  actions: {
    setInputData(inputdata) {
      this.inputData = inputdata
    },
    setIsEditingSomething(val) {
      this.isEditingSomething = val
    },
    resetInputData() {
      this.inputData = {}
    },
  },
})
