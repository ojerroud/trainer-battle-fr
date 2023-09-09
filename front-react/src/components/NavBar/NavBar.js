import React from 'react';
import './NavBar.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavBar() {
	const navMenu = [
		{ path: '/', name: 'accueil' },
		{ path: '/tableau-points', name: 'Tableau points' },
		{ path: '/tableau-recompenses', name: 'Tableau récompenses' },
	];

	return (
		<Navbar className="navbar" bg="dark" data-bs-theme="dark">
			<Container>
				<Nav className="me-auto">
					{navMenu.map((item) => (
						<Link to={item.path} key={item.path} className="nav-link">
							{item.name}
						</Link>
					))}
				</Nav>
			</Container>
		</Navbar>
	);
}

export default NavBar;
