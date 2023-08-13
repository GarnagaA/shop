import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import 'macro-css'
import App from './App'
import { HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
		< HashRouter basename={process.env.PUBLIC_URL}>
				<App />
		</HashRouter>
)

// basename={process.env.PUBLIC_URL}