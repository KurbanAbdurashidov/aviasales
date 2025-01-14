import { useState } from 'react'
import { Filters } from '../Filters/Filters'
import { FlightCards } from '../FlightCard/FlightCards'
import { MoreFlights } from '../MoreFlights/MoreFlights'
import { Transfers } from '../Transfers/Transfers'
import styles from './Home.module.scss'

export const Home: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(10)

	return (
		<>
			<div className={styles.container}>
				<header className={styles.header}>
					<img src='/public/page/logo.svg' alt='Aviasales' />
				</header>
				<section className={styles.content}>
					<Transfers />
					<div className={styles.flights}>
						<Filters />
						<FlightCards currentIndex={currentIndex} />
						<MoreFlights setCurrentIndex={setCurrentIndex} />
					</div>
				</section>
			</div>
		</>
	)
}
