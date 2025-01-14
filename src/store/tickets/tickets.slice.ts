import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Ticket = {
	price: number
	carrier: string
	segments: [
		{
			origin: string
			destination: string
			date: string
			stops: string[]
			duration: number
		},
		{
			origin: string
			destination: string
			date: string
			stops: string[]
			duration: number
		}
	]
}

type TicketsState = {
	tickets: Ticket[]
	loading: boolean
	error: string | null
}

const initialState: TicketsState = {
	tickets: [],
	loading: false,
	error: null
}

const ticketsSlice = createSlice({
	name: 'tickets',
	initialState,
	reducers: {
		fetchTicketsStart(state) {
			state.loading = true
			state.error = null
		},
		fetchTicketsSuccess(state, action: PayloadAction<Ticket[]>) {
			state.loading = false
			state.tickets = action.payload
		},
		fetchTicketsError(state, action: PayloadAction<string>) {
			state.loading = false
			state.error = action.payload
		}
	}
})

export const { fetchTicketsStart, fetchTicketsSuccess, fetchTicketsError } =
	ticketsSlice.actions
export default ticketsSlice.reducer
