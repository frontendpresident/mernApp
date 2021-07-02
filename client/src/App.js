import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAutToken from './utils/setAutToken';
import { logoutUser, setCurrentUser } from './redux/reducers/authReducer';
import { clearCurrenProfile } from './redux/reducers/profileReducer';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './redux/store';
import Dashboard from './components/dashboard/Dashboard';

if (localStorage.jwtToken) {
  setAutToken(localStorage.jwtToken)

  const decode = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decode))

  const currentDate = Date.now() / 1000
  if (decode.exp < currentDate) {
    store.dispatch(logoutUser())
    store.dispatch(clearCurrenProfile())
    window.location.href = '/login'
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className="container">
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
          </div>
          <Footer />
        </div>
      </Router>\
    </Provider>
  );
}

export default App;
