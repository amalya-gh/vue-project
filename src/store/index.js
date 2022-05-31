import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    typesState: [],
    targetingTypeList: [],
    isAddClicked: false,
    addedData: [],
    showConfirmationPopup: false,
    cantSelectStatus: false
  },
  getters: {
    getAddedData(state) {
      return state.addedData
    },
    getTypesList(state) {
      return state.typesState
    }
  },
  mutations: {
    setTypes(state, val) {
      state.typesState = val
    },
    setListOfTargetingTypes(state, val) {
      state.targetingTypeList = val
    },
    setAddClicked(state, val) {
      if (localStorage.getItem('savedData')) {
        state.isAddClicked = true
      } else {
        state.isAddClicked = val
      }
    },
    setAddedDataList(state, val) {
      state.addedData.push(val);
      localStorage.setItem('savedData', JSON.stringify(state.addedData))
    },
    setConfirmationPopupStatus(state, val) {
      state.showConfirmationPopup = val
    },
    setCantSelectPopupStatus(state, val) {
      state.cantSelectStatus = val
    }
  },
  actions: {
    getTypesAction({commit}) {
      fetch("http://private-anon-caa763019f-adcashdsp.apiary-mock.com/types")
        .then(response => response.json())
        .then(data => {
          commit('setTypes', data)
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    },
    getListOfTargetingTypes({commit}, type) {
      var typeVal = '';
      switch (type) {
        case 'Device':
          // eslint-disable-next-line no-unused-vars
          typeVal = 'devices';
          break;
        case 'Country':
          // eslint-disable-next-line no-unused-vars
          typeVal = 'countries';
          break;
        case 'Category':
          // eslint-disable-next-line no-unused-vars
          typeVal = 'categories';
          break;
      }
      fetch("http://private-anon-caa763019f-adcashdsp.apiary-mock.com/" + typeVal)
        .then(response => response.json())
        .then(data => {
          commit('setListOfTargetingTypes', data)
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    },
    addNewTargetingRules({commit}, rules) {
      console.log(commit, 'mut be used later')
      fetch("http://private-anon-caa763019f-adcashdsp.apiary-mock.com/rules", {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rules)
      })
        .then((response) => {
          console.log(response)
        });
    },
    deleteTargetingRules({commit}, rules) {
      fetch("http://private-anon-caa763019f-adcashdsp.apiary-mock.com/rules", {
        method: "delete",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rules)
      })
        .then((response) => {
          if (response.status === 200) {
            commit('setConfirmationPopupStatus', false)
          }
        });
    }
  },
  modules: {}
})
