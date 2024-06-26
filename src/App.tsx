import './App.css'
import Home from './Pages/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

 const queryClient = new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient} >
     <Home />
     <ToastContainer />
    </QueryClientProvider>
    </>
  )
}

export default App
