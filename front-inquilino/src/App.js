import { useState } from 'react';
import './App.css';
import NavPrincipal from './components/NavPrincipal';
import Login from './components/Login';
import Modal from './components/Modal';


function App() {
  const [user, setUser] = useState()
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="App">
      <NavPrincipal setShowModal={setShowModal}/>
      {showModal &&
                <Modal setShowModal={setShowModal}>
                    <Login />
                </Modal>
      }
    </div>
  );
}

export default App;
