import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../../store/filters/filters.slice'
import { AppDispatch, RootState } from '../../store/store'
import styles from './Filters.module.scss'

export const Filters: React.FC = () => {
	const selectedFilter = useSelector(
		(state: RootState) => state.filters.selectedFilter
	)
	const dispatch: AppDispatch = useDispatch()

	const handleFilterChange = (filter: 'cheap' | 'fast' | 'optimal') => {
		dispatch(setFilter(filter))
	}

	return (
		<>
			<div className={styles.container}>
				<button
					className={cn(`${styles.first}`, {
						[styles.active]: selectedFilter === 'cheap'
					})}
					onClick={() => handleFilterChange('cheap')}
				>
					Самый дешевый
				</button>
				<button
					className={cn({ [styles.active]: selectedFilter === 'fast' })}
					onClick={() => handleFilterChange('fast')}
				>
					Самый быстрый
				</button>
				<button
					className={cn(`${styles.last}`, {
						[styles.active]: selectedFilter === 'optimal'
					})}
					onClick={() => handleFilterChange('optimal')}
				>
					Оптимальный
				</button>
			</div>
		</>
	)
}
