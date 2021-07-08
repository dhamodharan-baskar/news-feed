import Home from './containers/Home.js'
import store from './redux/store';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
        <div>
          <Home />
        </div>
    </Provider>
  );
}

export default App;
