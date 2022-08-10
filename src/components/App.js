import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import Create from './layouts/Create';

import HomePage from "./layouts/HomePage"
import { register_org } from '../actions';

import User from './layouts/User'

function App() {
	// register_org("iiitb", "gmail");
	return (
		<>
			<Router>
				<Switch>
					<Route exact path="/"
						component={HomePage}/>

					<Route exact path="/user"
						component={User} />
                    <Route exact path="/org"
						component={User} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
