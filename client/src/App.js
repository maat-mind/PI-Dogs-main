import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import CreateDog from './components/CreateDog/CreateDog'
import DetailDog from './components/DetailDog/DetailDog.jsx'
import Home from './components/Home/Home.jsx'
import LandingPage from './components/LandingPage/LandingPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route
            exact
            path='/'
            component={LandingPage}
          />
          <Route
            exact
            path='/home'
            component={Home}
          />
          <Route
            exact
            path='/create'
            component={CreateDog}
          />
          <Route
            exact
            path='/home/:id'
            component={DetailDog}
          />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
