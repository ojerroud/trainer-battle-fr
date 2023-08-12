import { Provider } from 'react-redux';
import TableGDG from './components/TableGDG/TableGDG';
import { store } from './store';
import './App.css';

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<TableGDG></TableGDG>
			</Provider>
		</div>
	);
}

export default App;
