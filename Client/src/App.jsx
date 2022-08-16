import { Navbar, Footer, Login} from './components'
import logo from '../images/logo.png';

const App = () => {
  return (
    <div className="min-h-screen gradient-bg-home">
      <div className="gradient-bg-welcome"> 
        <Navbar/>
      </div >
      <div className='login'>
        <Login/>
      </div>
      <Footer/>
    </div>
  )
}

export default App;
