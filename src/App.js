import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import Home from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import Gallery from './pages/Gallery'
import Battles from './pages/Battles'


function App() {
  return (
	<Router>
		<Nav>
			<Nav.Item>
				<Nav.Link href="/">Home</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href="/Gallery">Gallery</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link href="/Battles">Battles</Nav.Link>
			</Nav.Item>
		<Routes>
			<Route path="/" element={<Home />}/>
			<Route path="/Gallery" element={ <Gallery />} />
			<Route path="/Battles" element={<Battles />}/>
			<Route path="/*" element={<ErrorPage />}/>
		</Routes>
		</Nav>

		<div>
			by Nicholas Rumack
		</div>
	</Router>
  );
}

export default App;
