import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css"; 
import "primeicons/primeicons.css";   
import './style/main.css'
import God from "./ui.homacall.god/container/god";
import MainLayout from "./ui.homacall.god/layout/mainLayout";


function App() {
  
  return (
    <div className="App">
      {/* <MainLayout></MainLayout> */}
      <God/>
    </div>
  );
}

export default App;
