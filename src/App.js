import { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import Map from './pages/Map';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ReceiveRequest from './pages/ReceiveRequest';
import SendRequest from './pages/SendRequest';
import { UserContext } from './user';

function App() {

  const [user, setUser] = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        <Routes>
          <Route path='/map' element={<Map/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/receive-request' element={<ReceiveRequest/>}></Route>
          <Route path='/send-request' element={<SendRequest/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
