import { useState } from 'react';
import './App.css';
import Aside from './components/Aside/Aside';
import Footer from './components/Footer/Footer';
import NavPrincipal from './components/NavPrincipal/NavPrincipal';
import Modal from './components/Modal/Modal';
import Login from './components/Login/Login';
import { Route, Switch } from 'react-router-dom';
import Register from './components/Register/Register'
import { routes } from './routes';
import { useUser } from './context/UserContext';
import MiniUserMenu from './components/MiniUserMenu/MiniUserMenu';

function App() { 
  const [user, setUser] = useUser()
  const [showModal, setShowModal] = useState(false)
  console.log("el modal")
  console.log(showModal)
 
  return (
    <div className="App">
      <header>
        <NavPrincipal setShowModal={setShowModal}/>
      </header>
      <aside>

      </aside>
      
      <main>
          
          {!user && showModal &&
              <Modal setShowModal={setShowModal}>
                  <Login setShowModal={setShowModal}/>
              </Modal>
          }
          <Switch>
                <Route path={routes.r_register} exact>
                <Register/>
                </Route>
                
                
          </Switch>
          
      </main>
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
