import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Stopwatch from './src/Components/Stopwatch';
import {persistor, store} from './src/reducers/Reducer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Stopwatch />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
