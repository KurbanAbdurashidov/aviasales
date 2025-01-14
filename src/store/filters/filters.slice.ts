import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FilterState = {
	selectedFilter: 'cheap' | 'fast' | 'optimal'
}

const initialState: FilterState = {
	selectedFilter: 'cheap'
}

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setFilter: (
			state,
			action: PayloadAction<FilterState['selectedFilter']>
		) => {
			state.selectedFilter = action.payload
		}
	}
})

export const { setFilter } = filtersSlice.actions
export default filtersSlice.reducer
