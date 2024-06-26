import React from 'react'
import ReactDOM from 'react-dom/client'
import store from "./store/index.js";
import { Provider } from "react-redux";

import App from "./components/app/App.jsx";
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
)
