import { Provider } from 'react-redux';
// import TableRewardGDG from './components/TableRewardGDG/TableRewardGDG';
import TablePointsGDG from './components/TablePointGDG/TablePointGDG';
import { store } from './store/store';
import './App.css';
// import Test from './components/Test/Test';

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<TablePointsGDG />
				{/* <Test /> */}
				{/* <TableRewardGDG /> */}
				{/* <TableGDG /> */}
			</Provider>
		</div>
	);
}

export default App;
