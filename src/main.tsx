import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './assets/styles/global.scss'
import { Home } from './components/Home/Home.tsx'
import './index.scss'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<Home />
		</Provider>
	</StrictMode>
)
