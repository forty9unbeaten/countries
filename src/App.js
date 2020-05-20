import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NavBar } from './components';
import { routes } from './pages';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <NavBar />
                <Switch>
                    {Object.entries(routes).map(([routeName, routeObject]) => (
                        <Route
                            key={routeName}
                            path={routeObject.path}
                            component={routeObject.component}
                            exact
                        />
                    ))}
                </Switch>
            </div>
        );
    }
}

export default App;
