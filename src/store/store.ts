import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './filters/filters.slice'
import ticketsReducer from './tickets/tickets.slice'
import transfersReducer from './transfers/transfers.slice'

export const store = configureStore({
	reducer: {
		filters: filtersReducer,
		transfers: transfersReducer,
		tickets: ticketsReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
