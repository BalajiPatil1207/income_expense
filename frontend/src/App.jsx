import './App.css'
import{BrowserRouter} from "react-router-dom";
import DefaultRoute from './components/routes/DefaultRoute';
import { Toaster } from "react-hot-toast";
function App() {

  return (
    <BrowserRouter>
    <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#161d31',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            fontSize: '14px',
            fontWeight: 'bold'
          },
        }}
      />
      <DefaultRoute/>
    </BrowserRouter>
  )
}

export default App
