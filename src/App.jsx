
import { Routes, Route } from 'react-router';

import Home from './Pages/Home';
import Chat from './Pages/Chat';
import Nav from './Components/Nav';
import Body from './Components/Body';
import Page404 from './Pages/404';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import { DataProvider } from './Contexts/Data';
import { AuthProvider } from './Contexts/Auth';
import NewPost from './Pages/NewPost';


function App() {

  return (
    <AuthProvider>
      <DataProvider>
        <Body>
          <Nav />
          <Routes>

            <Route index element={<Home />} />
            <Route path='new-post' element={<NewPost />} />
            <Route path='chat' element={<Chat />} />
            <Route path='login' element={<Login />} />
            <Route path='logout' element={<Logout />} />
            <Route path='*' element={<Page404 />} />


          </Routes>
        </Body>
      </DataProvider>
    </AuthProvider>


  )
}

export default App
