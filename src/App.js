import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Navbar from './components/Navbar';
import Signup from './pages/signup/Signup';
import './App.css';
import { useAuth } from './hooks/useAuth';

function App() {
  const { authIsReady, user } = useAuth();

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path="/login">
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/">
              {user ? <Home /> : <Redirect to="/login" />}
            </Route>
            <Route path="/signup">
              {user ? <Redirect to="/" /> : <Signup />}
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
