	import {createStore} from 'vuex'

export const store = createStore({
	state() {
		return {
			history: [],
		}
	},
	getters: {
		getHistory: (state) => state.history,
		getPartyByID: (state) => (id) => {
			if(id > state.history.length || id < 0) return null
			return state.history[id]
		}
	},
	mutations: {
		addParty: (state, party) => {
			state.history.push(party)
		}
	}
})
