import './App.css';
import Main from "./components/MainComponent"
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import { saveZipReducer } from "./redux/saveZipReducer"

const rootReducer = combineReducers({saveZipReducer})

const store = createStore(rootReducer)

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
