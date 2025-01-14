import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TransferFilter = {
	all: boolean
	noTransfers: boolean
	oneTransfer: boolean
	twoTransfers: boolean
	threeTransfers: boolean
}

const initialState: TransferFilter = {
	all: false,
	noTransfers: false,
	oneTransfer: false,
	twoTransfers: false,
	threeTransfers: false
}

const transferSlice = createSlice({
	name: 'transfers',
	initialState,
	reducers: {
		toggleFilter: (state, action: PayloadAction<keyof TransferFilter>) => {
			const filterKey = action.payload

			if (filterKey === 'all') {
				const newState = !state.all
				state.all = newState
				state.noTransfers = newState
				state.oneTransfer = newState
				state.twoTransfers = newState
				state.threeTransfers = newState
			} else {
				state[filterKey] = !state[filterKey]
				state.all =
					state.noTransfers &&
					state.oneTransfer &&
					state.twoTransfers &&
					state.threeTransfers
			}
		}
	}
})

export const { toggleFilter } = transferSlice.actions
export default transferSlice.reducer
