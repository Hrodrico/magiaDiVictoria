import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'App.css';

// Components
import HeaderFloating from 'components/Header/Header';
import NavBar from 'components/NavBar/NavBar'; 
import ItemDetailContainer from 'components/ItemDetailContainer/ItemDetailContainer';
import Footer from 'components/Footer/Footer';

//Views[MENU]
import HomeView from 'views/HomeView';
import CategoryView from 'views/CategoryView';
import ErrorView from 'views/ErrorView';
import CartView from 'views/CartView';

//Img
import logo from './assets/images/logos/magia_di_victoria.png';
// import logo from '@/images/logos/magia_di_victoria.png';

//Context
import CartProvider from 'context/CartContext';
// import CartProvider from './context/CartContext';



class App extends Component {
	render() {
		return (
			<div className="App">
				<CartProvider>
					<Router>
						<div className="App-header">
							<HeaderFloating imgBusiness={ logo } />
							<NavBar/> 
						</div>
						<div className="App-body">
							<Routes>
								<Route exact path='/' element={<HomeView />} ></Route>
								<Route exact path='/category/:categoryId' element={<CategoryView />} ></Route>
								<Route exact path='/item/:id' element={<ItemDetailContainer />} ></Route>
								<Route exact path='/cart' element={<CartView />} ></Route>
								<Route path="*" element={<ErrorView />} />
								{/* <ItemDetailContainer uid="11007" /> */}
							</Routes>
						</div>
						<div className="App-footer">
							<Footer />
						</div>
					</Router>
				</CartProvider>
			</div>
		);
	}
}

export default App;
