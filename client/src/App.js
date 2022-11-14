import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
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
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
