import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import SweetDetails from './pages/SweetDetails';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/sweets/:id" component={SweetDetails} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;