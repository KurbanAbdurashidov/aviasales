import { useState } from 'react'
import { Filters } from '../Filters/Filters'
import { FlightCards } from '../FlightCard/FlightCards'
import { Transfers } from '../Transfers/Transfers'
import styles from './Home.module.scss'

export const Home: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(10)

	return (
		<>
			<div className={styles.container}>
				<header className={styles.header}>
					<img src='img/logo.svg' alt='Aviasales' />
				</header>
				<section className={styles.content}>
					<Transfers />
					<div className={styles.flights}>
						<Filters />
						<FlightCards
							currentIndex={currentIndex}
							setCurrentIndex={setCurrentIndex}
						/>
					</div>
				</section>
			</div>
		</>
	)
}
