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
import Footer  from './components/Footer/Footer';
import ActivateUser from './components/ActivateUser/ActivateUser';
import AdvSearcher from './components/AdvSearcher/AdvSearcher';
import Advertisement from './components/Advertisement/Advertisement';
import AddProperty from './components/PropertyPanel/AddProperty/AddProperty';
import ControlPanelCasero from './components/CrudProperty/ControlPanelCasero';
import UpdateProperty from './components/PropertyPanel/UpdateProperty/UpdateProperty';
import DataUser from './components/UserPanel/DataUser';
import PropertyRservPanel from './components/Reservs/PropertyRservPanel'
import InquilinoReservsPanel from './components/Reservs/InquilinoReservsPanel';
function App() { 
  const [user] = useUser()
  const [showModal, setShowModal] = useState(false)
  const [selectProperty,setSelectProperty] = useState()
  return (
    <div className="App">
      <header>
        <NavPrincipal setShowModal={setShowModal}/>
      </header>
      <aside>
      {user && <Aside /> }
      </aside>
      
      <main>
          {!user && showModal &&
              <Modal setShowModal={setShowModal}>
                  <Login setShowModal={setShowModal}/>
              </Modal>
          }
            <Switch>
                <Route path= {`${routes.r_advertisement}/:anuncio_uuid`} exact>
                  <Advertisement />
                </Route>
                
               
                
               
                <Route path={`${routes.r_ReservInquilinoByUUID}/:rol/:user_inquilino_uuid`} exact>
                  <InquilinoReservsPanel />
                </Route>
                <Route path={`${routes.r_ReservPanelByProperty}/:inmueble_uuid`} exact >
                  <PropertyRservPanel />
                </Route>
                <Route path={`${routes.r_PropertyNewProp}`} exact >
                  <AddProperty />
                </Route>
                <Route path={routes.r_register} exact>
                  <Register/>
                </Route>
                <Route path={`${routes.r_DataUser}:username`} exact>
                  <DataUser />
                </Route>
                
                <Route path={`${routes.r_ControlPanelCasero}/:username`} exact >
                  <ControlPanelCasero />
                </Route>
                <Route path={`${routes.r_updatePropertiesUser}/:inmueble_uuid`}  >
                  <UpdateProperty />
                </Route>
                
                <Route path= {`${routes.r_advertisement}/:anuncio_uuid`} exact>
                  <Advertisement />
                </Route>
                
                
               

               
                <Route path={routes.r_advSearcher} >
                    <AdvSearcher />
                </Route> 
               
                
                <Route path={routes.home}  exact >
                  <AdvSearcher />
                </Route>
                <Route path={routes.r_activationUser} exact>
                  <ActivateUser />
                </Route>
          </Switch>
      </main>
      <footer>
          <Footer />
      </footer>
    </div>
  );
}

export default App;
