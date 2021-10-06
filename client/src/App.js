import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Ditail from './components/Detail';
import Error404 from './components/Error404';
import BreedCreate from './components/BreedCreate';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/home' component={Home} />
          <Route path='/detail' component={Ditail}/>
          <Route path='/create' component={BreedCreate}/>
          <Route path='*' component={Error404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
