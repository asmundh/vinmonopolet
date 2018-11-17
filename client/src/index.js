import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContent from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/';

// Wraps app in Redux-store
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContent />
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
