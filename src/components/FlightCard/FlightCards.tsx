import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	formatDuration,
	formatFlightTime,
	formatTransferString
} from '../../helpers/helpers'
import { AppDispatch, RootState } from '../../store/store'
import { Ticket } from '../../store/tickets/tickets.slice'
import { fetchTickets } from '../../store/tickets/tickets.thunk'
import { MoreFlights } from '../MoreFlights/MoreFlights'
import styles from './FlightCards.module.scss'

type FlightCardsProps = {
	currentIndex: number
	setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}

export const FlightCards: React.FC<FlightCardsProps> = ({
	currentIndex,
	setCurrentIndex
}) => {
	const dispatch: AppDispatch = useDispatch()
	const { tickets, loading, error } = useSelector(
		(state: RootState) => state.tickets
	)
	const filters = useSelector((state: RootState) => state.transfers)
	const sortFilters = useSelector(
		(state: RootState) => state.filters.selectedFilter
	)

	const [localLoading, setLocalLoading] = useState(false)

	const filteredTickets = tickets.filter((ticket: Ticket) => {
		const stopsA =
			ticket.segments[0].stops.length + ticket.segments[1].stops.length

		if (filters.all) return true
		if (filters.noTransfers && stopsA === 0) return true
		if (filters.oneTransfer && stopsA === 1) return true
		if (filters.twoTransfers && stopsA === 2) return true
		if (filters.threeTransfers && stopsA === 3) return true

		return false
	})

	const sortedTickets = [...filteredTickets].sort((a, b) => {
		switch (sortFilters) {
			case 'cheap': {
				return a.price - b.price
			}
			case 'fast': {
				const durationA = a.segments[0].duration - a.segments[1].duration
				const durationB = b.segments[0].duration - b.segments[1].duration
				return durationA - durationB
			}
			case 'optimal': {
				const avgA =
					a.price / (a.segments[0].duration + a.segments[1].duration)
				const avgB =
					b.price / (b.segments[0].duration + b.segments[1].duration)
				return avgA - avgB
			}
			default: {
				return 0
			}
		}
	})

	useEffect(() => {
		dispatch(fetchTickets())
	}, [dispatch, currentIndex])

	useEffect(() => {
		if (!loading) {
			setLocalLoading(true)
			const timeout = setTimeout(() => setLocalLoading(false), 300)
			return () => clearTimeout(timeout)
		}
	}, [loading, filters, sortFilters])

	const displayTickets = sortedTickets.slice(0, currentIndex)

	if (loading || localLoading) {
		return (
			<div className={styles.loading}>
				<h1>Загрузка...</h1>
			</div>
		)
	}
	if (error) {
		return (
			<div className={styles.error}>
				<h1>Ошибка: {error}</h1>
			</div>
		)
	}

	return (
		<div className={styles.flightCards}>
			{displayTickets.length === 0 ? (
				<div className={styles.notFound}>
					<h1>Рейсов, подходящих под заданные фильтры, не найдено</h1>
				</div>
			) : (
				displayTickets.map((ticket, index) => (
					<div
						key={`${ticket.segments[0].origin}-${ticket.segments[0].destination}-${ticket.segments[0].date}-${index}`}
						className={styles.card}
					>
						<span className={styles.price}>{ticket.price} P</span>
						<img
							src={`https://pics.avs.io/110/36/${ticket.carrier}.png`}
							alt={`${ticket.carrier}`}
							className={styles.logo}
						/>
						<div className={styles.infoThere}>
							<p className={styles.top}>
								{`${ticket.segments[0].origin} - ${ticket.segments[0].destination}`}
							</p>
							<p className={styles.bottom}>
								{formatFlightTime(
									ticket.segments[0].date,
									ticket.segments[0].duration
								)}
							</p>
						</div>
						<div className={styles.timeThere}>
							<p className={styles.top}>В пути</p>
							<p className={styles.bottom}>
								{formatDuration(ticket.segments[0].duration)}
							</p>
						</div>
						<div className={styles.transfersThere}>
							<p className={styles.top}>
								{ticket.segments[0].stops.length
									? `${ticket.segments[0].stops.length} ${formatTransferString(ticket.segments[0].stops.length)}`
									: 'Без пересадок'}
							</p>
							<p className={styles.bottom}>
								{ticket.segments[0].stops.join(', ')}
							</p>
						</div>
						<div className={styles.infoBack}>
							<p className={styles.top}>
								{`${ticket.segments[1].origin} - ${ticket.segments[1].destination}`}
							</p>
							<p className={styles.bottom}>
								{formatFlightTime(
									ticket.segments[1].date,
									ticket.segments[1].duration
								)}
							</p>
						</div>
						<div className={styles.timeBack}>
							<p className={styles.top}>В пути</p>
							<p className={styles.bottom}>
								{formatDuration(ticket.segments[1].duration)}
							</p>
						</div>
						<div className={styles.transfersBack}>
							<p className={styles.top}>
								{ticket.segments[1].stops.length
									? `${ticket.segments[1].stops.length} ${formatTransferString(ticket.segments[1].stops.length)}`
									: 'Без пересадок'}
							</p>
							<p className={styles.bottom}>
								{ticket.segments[1].stops.join(', ')}
							</p>
						</div>
					</div>
				))
			)}
			{displayTickets.length !== 0 && (
				<MoreFlights setCurrentIndex={setCurrentIndex} />
			)}
		</div>
	)
}
