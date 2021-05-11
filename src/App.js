import logo from './logo.svg';
import './App.css';
import './style.css';

import {Home} from './Home';
import {Client} from './Client';
import {Navigation} from './Navigation';
import {Container} from 'react-bootstrap';

import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>    
    <Container fluid>
    <Navigation/>
    <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/client" component={Client} />
      </Switch>
    </Container>
    </BrowserRouter>
  );
}

export default App;
