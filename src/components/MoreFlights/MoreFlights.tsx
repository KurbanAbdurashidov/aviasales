import cn from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import styles from './MoreFlights.module.scss'

type MoreFlightsProps = {
	setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}
export const MoreFlights: React.FC<MoreFlightsProps> = ({
	setCurrentIndex
}) => {
	const { loading, error } = useSelector((state: RootState) => state.tickets)
	return (
		<>
			<button
				className={cn(styles.moreFlights, {
					[styles.hidden]: loading || error
				})}
				onClick={() => setCurrentIndex((prev) => prev + 10)}
			>
				Показать еще 10 билетов
			</button>
		</>
	)
}
