import { defaultMutations } from 'vuex-easy-access'
import easyAccessConf from '@config/vuexEasyAccess'
import web3Wallet from '@config/web3Wallet'

function initialState () {
  return {
    address: null,
    isMainnet: null,
    wallet: web3Wallet
  }
}

async function isMainNetwork (_wallet) {
  if (!_wallet) return
  const networkID = await _wallet.eth.net.getId()
  return networkID === 1
}

export default {
  namespaced: true,
  state: initialState(),
  mutations:
  {
    resetStateData (state) {
      const newState = initialState()
      Object.assign(state, newState)
    },
    ...defaultMutations(initialState(), easyAccessConf)
  },
  actions:
  {
    async getAddress ({state, getters, rootState, rootGetters, commit, dispatch}, {id} = {}) {
      const accounts = await web3Wallet.eth.getAccounts()
      dispatch('set/address', accounts[0])
      dispatch('set/isMainnet', await isMainNetwork(web3Wallet))
    }
  },
  getters:
  {
  }
}