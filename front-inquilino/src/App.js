import { useState } from 'react';
import './App.css';
import Aside from './components/Aside/Aside';
import NavPrincipal from './components/NavPrincipal/NavPrincipal';
import Modal from './components/Modal/Modal';
import Login from './components/Login/Login';
import { Route, Switch } from 'react-router-dom';
import Register from './components/Register/Register'
import { routes } from './routes';
import { useUser } from './context/UserContext';

function App() { 
  const [user] = useUser()
  const [showModal, setShowModal] = useState(false)
   
  return (
    <div className="App">
      <header>
        <NavPrincipal setShowModal={setShowModal}/>
      </header>
      <aside>
        <Aside />
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
