import './App.css';
import Main from "./components/MainComponent"
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import { zipReducer } from "./redux/zipReducer"

const rootReducer = combineReducers({zipReducer})

const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
