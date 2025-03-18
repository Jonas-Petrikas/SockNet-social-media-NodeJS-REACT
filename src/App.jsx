
import { Routes, Route } from 'react-router';

import Home from './Pages/Home';
import Chat from './Pages/Chat';
import Nav from './Components/Nav';
import Body from './Components/Body';
import Page404 from './Pages/404';
import Login from './Pages/Login';
import { DataProvider } from './Contexts/Data';

function App() {

  return (
    <DataProvider>
      <Body>
        <Nav />
        <Routes>

          <Route index element={<Home />} />
          <Route path='chat' element={<Chat />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<Page404 />} />

          labas
        </Routes>
      </Body>
    </DataProvider>


  )
}

export default App
