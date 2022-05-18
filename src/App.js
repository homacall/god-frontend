import God from './ui.homacall.god/container/god'
import { ToastContainer } from 'react-toastify'

import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'react-toastify/dist/ReactToastify.css'

import './style/main.css'

function App() {
  return (
    <div className="App">
      <God />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        theme="colored"
        pauseOnHover
      />
    </div>
  )
}

export default App
