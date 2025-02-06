import './App.css'
import ErrorBoundary from './components/ErrorBoundary'
import Shipment from './pages/Shipment'

function App() {

  return (
    <ErrorBoundary>
      <Shipment />
    </ErrorBoundary>
  )
}

export default App
