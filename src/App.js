import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import "./App.css";

import Home from './components/home/Home'
import ErrorPage from './components/home/ErrorPage'
import Hamsters from './components/hamsters/Hamsters'
import Battles from './components/battles/Battles'


function App() {
  return (
	<Router>
		<nav>
			<Link to="/"> Home </Link>
			<Link to="/Hamsters"> Hamsters </Link>
			<Link to="/Battles"> Battles </Link>
		</nav>
		<Routes>
			<Route path="/" element={<Home />}/>
			<Route path="/Hamsters" element={<Hamsters />}/>
			<Route path="/Battles" element={<Battles />}/>
			<Route path="/*" element={<ErrorPage />}/>
		</Routes>
		<div>
			by Nicholas Rumack
		</div>
	</Router>
  );
}

export default App;
