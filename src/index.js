import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App';
import rootReducer from './storage/reducers/rootReducer';

const store = createStore(rootReducer);

const Index = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

export default Index;