import './App.css'
import{BrowserRouter} from "react-router-dom"
import DefaultRoute from './components/routes/DefaultRoute'
function App() {

  return (
    <BrowserRouter>
      <DefaultRoute/>
    </BrowserRouter>
  )
}

export default App
