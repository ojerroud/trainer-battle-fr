import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TableRewardGDG from './components/TableRewardGDG/TableRewardGDG';
import TablePointsGDG from './components/TablePointGDG/TablePointGDG';
import { store } from './store/store';
import NavBar from './components/NavBar/NavBar';
import './App.css';

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<NavBar />
					<Routes>
						<Route path="/tableau-points" element={<TablePointsGDG />} />
						<Route path="/tableau-recompenses" element={<TableRewardGDG />} />
					</Routes>
				</Router>
			</Provider>
		</div>
	);
}

export default App;
