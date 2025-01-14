import styles from './MoreFlights.module.scss'

type MoreFlightsProps = {
	setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}
export const MoreFlights: React.FC<MoreFlightsProps> = ({
	setCurrentIndex
}) => {
	return (
		<button
			className={styles.moreFlights}
			onClick={() => setCurrentIndex((prev) => prev + 10)}
		>
			Показать еще 10 билетов
		</button>
	)
}
