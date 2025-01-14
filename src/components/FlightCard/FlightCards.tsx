import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { Ticket } from '../../store/tickets/tickets.slice'
import { fetchTickets } from '../../store/tickets/tickets.thunk'
import styles from './FlightCards.module.scss'

type FlightCardsProps = {
	currentIndex: number
}

export const FlightCards: React.FC<FlightCardsProps> = ({ currentIndex }) => {
	const dispatch: AppDispatch = useDispatch()
	const { tickets, loading, error } = useSelector(
		(state: RootState) => state.tickets
	)
	const filters = useSelector((state: RootState) => state.transfers)
	const sortFilters = useSelector(
		(state: RootState) => state.filters.selectedFilter
	)

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

	const displayTickets = sortedTickets.slice(0, currentIndex)

	if (loading) {
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

	const formatDuration = (time: number): string => {
		const hours = Math.floor(time / 60)
		const minutes = time % 60
		return `${hours}ч ${minutes}м`
	}

	const formatFlightTime = (date: string, duration: number): string => {
		const departure = new Date(date)
		const arrival = new Date(departure.getTime() + duration * 60 * 1000)

		const formatTime = (time: Date): string =>
			time.toLocaleTimeString('ru-RU', {
				hour: '2-digit',
				minute: '2-digit'
			})

		return `${formatTime(departure)} - ${formatTime(arrival)}`
	}

	const formatTransferString = (quentity: number): string => {
		if (quentity === 1) return 'пересадка'
		if (quentity === 2 || quentity === 3 || quentity === 4) return 'пересадки'
		return 'пересадок'
	}

	return (
		<>
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
		</>
	)
}
