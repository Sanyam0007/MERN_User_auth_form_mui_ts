
import { Provider } from 'react-redux';
import './App.css';
import Navbar from './Components/NavElements/Navbar';
import { Routing } from './Components/Route/Routing';

import { SnackbarProvider } from "notistack";
// import { useStore } from 'react-redux';
// import { userRegisterReducer } from './Reducers/UseReducers';

function App() {
  // const reducer  = userRegisterReducer
  // const store  = useStore()

  return (
    // <Provider store={store}>
    <SnackbarProvider>
       <div className="App" >
     <Routing/>
    </div>
    </SnackbarProvider>
    // </Provider>

   
  );
}

export default App;
