import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import SweetDetails from './pages/SweetDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AddSweet from './pages/AddSweet';
import EditSweet from './pages/EditSweet';
import Users from './pages/Users';
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
