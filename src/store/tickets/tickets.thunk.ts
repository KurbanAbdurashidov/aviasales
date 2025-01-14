import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
	fetchTicketsError,
	fetchTicketsStart,
	fetchTicketsSuccess,
	Ticket
} from './tickets.slice'

export const fetchTickets = createAsyncThunk(
	'tickets/fetchTickets',
	async (_, { dispatch }) => {
		try {
			dispatch(fetchTicketsStart())

			const searchIdResponse = await axios.get<{ searchId: string }>(
				'https://aviasales-test-api.kata.academy/search'
			)
			const { searchId } = searchIdResponse.data

			const ticketsResponse = await axios.get<{
				tickets: Ticket[]
				stop: boolean
			}>(
				`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
			)

			dispatch(fetchTicketsSuccess(ticketsResponse.data.tickets))
		} catch (error: unknown) {
			if (error instanceof Error) {
				dispatch(fetchTicketsError(error.message))
			} else {
				dispatch(fetchTicketsError('Неизвестная ошибка'))
			}
		}
	}
)
