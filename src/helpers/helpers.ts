export const formatDuration = (time: number): string => {
	const hours = Math.floor(time / 60)
	const minutes = time % 60
	return `${hours}ч ${minutes}м`
}

export const formatFlightTime = (date: string, duration: number): string => {
	const departure = new Date(date)
	const arrival = new Date(departure.getTime() + duration * 60 * 1000)

	const formatTime = (time: Date): string =>
		time.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit'
		})

	return `${formatTime(departure)} - ${formatTime(arrival)}`
}

export const formatTransferString = (quentity: number): string => {
	if (quentity === 1) return 'пересадка'
	if (quentity === 2 || quentity === 3 || quentity === 4) return 'пересадки'
	return 'пересадок'
}
