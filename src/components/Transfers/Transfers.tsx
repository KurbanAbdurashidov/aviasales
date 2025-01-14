import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { toggleFilter } from '../../store/transfers/transfers.slice'
import styles from './Transfers.module.scss'

export const Transfers: React.FC = () => {
	const filters = useSelector((state: RootState) => state.transfers)
	const dispatch: AppDispatch = useDispatch()

	const handleCheckboxChange = (filterKey: keyof typeof filters) => {
		dispatch(toggleFilter(filterKey))
	}

	return (
		<>
			<div className={styles.container}>
				<h3 className={styles.title}>Количество пересадок</h3>
				<div className={styles.checkbox}>
					<input
						type='checkbox'
						name='all'
						id='all'
						checked={filters.all}
						onChange={() => handleCheckboxChange('all')}
					/>
					<label htmlFor='all'>Все</label>
				</div>
				<div className={styles.checkbox}>
					<input
						type='checkbox'
						name='noTransfers'
						id='noTransfers'
						checked={filters.noTransfers}
						onChange={() => handleCheckboxChange('noTransfers')}
					/>
					<label htmlFor='noTransfers'>Без пересадок</label>
				</div>
				<div className={styles.checkbox}>
					<input
						type='checkbox'
						name='oneTransfer'
						id='oneTransfer'
						checked={filters.oneTransfer}
						onChange={() => handleCheckboxChange('oneTransfer')}
					/>
					<label htmlFor='oneTransfer'>1 пересадка</label>
				</div>
				<div className={styles.checkbox}>
					<input
						type='checkbox'
						name='twoTransfers'
						id='twoTransfers'
						checked={filters.twoTransfers}
						onChange={() => handleCheckboxChange('twoTransfers')}
					/>
					<label htmlFor='twoTransfers'>2 пересадки</label>
				</div>
				<div className={styles.checkbox}>
					<input
						type='checkbox'
						name='threeTransfers'
						id='threeTransfers'
						checked={filters.threeTransfers}
						onChange={() => handleCheckboxChange('threeTransfers')}
					/>
					<label htmlFor='threeTransfers'>3 пересадки</label>
				</div>
			</div>
		</>
	)
}
