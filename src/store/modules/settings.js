import { defaultMutations } from 'vuex-easy-access'
import copyObj from '../../helpers/copyObj'
import defaults from '../../config/currencyDefaults'

function initialState () {
  return {
    walletAddress: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    gas: 42000,
    currency: 'jpy',
    config: {
      // only set these if you want to overwrite defaults.
    },
    modal: {state: false}
  }
}

export default {
  moduleNameSpace: 'settings',
  docsStateProp: '',
  firestorePath: 'users/{userId}/data/settings',
  firestoreRefType: 'doc',
  vuexUserPath: 'user/user',
  patch: {
    fillables: ['walletAddress', 'gas', 'currency', 'config']
  },

  state: initialState(),
  mutations:
  {
    resetStateData (state) {
      let newState = initialState()
      Object.assign(state, newState)
    },
    replaceSettings (state, payload) {
      // console.log('payload → ', payload)
      Object.keys(payload).forEach(key => {
        this._vm.$set(state, key, payload[key])
      })
    },
  },
  actions:
  {
    toggleModal ({state, getters, rootState, rootGetters, commit, dispatch},
    toggleState) {
      toggleState = (toggleState === undefined) ? !state.modal.state : toggleState
      commit('SET_MODAL.STATE', toggleState)
    },
  },
  getters:
  {
    currencyLabel: (state, getters) => {
      return getters.availableCurrencies[state.currency].label
    },
    currencyConfig: (state, getters, rootState, rootGetters) => {
      return Object.assign(
        {},
        defaults[state.currency],
        state.config
      )
    },
    availableCurrencies: (state, getters, rootState, rootGetters) => {
      return Object.keys(defaults)
        .reduce((carry, key) => {
          const info = {
            label: `${defaults[key].prefix} ${key.toUpperCase()}`,
            value: key
          }
          carry[key] = info
          return carry
        }, {})
    },
  }
}
