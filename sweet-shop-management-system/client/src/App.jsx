import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SweetDetails from './pages/SweetDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AddSweet from './pages/AddSweet.jsx';
import EditSweet from './pages/EditSweet.jsx';
import Users from './pages/Users.jsx';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <PrivateRoute path="/sweets/:id/edit" component={EditSweet} adminOnly />
          <Route path="/sweets/:id" component={SweetDetails} />
          <PrivateRoute path="/add-sweet" component={AddSweet} adminOnly />
          <PrivateRoute path="/users" component={Users} adminOnly />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
