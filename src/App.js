import React ,{ useState, useEffect } from 'react';
import Autentificare from './components/LogIn/Autentificare'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portal from './components/Portal/Portal';
import Licente from './components/Portal/Licente';
import axios from 'axios';
import Tema from './components/Tema/Tema';
import Istoric from './components/Istoric/Istoric';

function App() {
  const [emailLog, setEmailLog]= React.useState('');
  const[name, setName] = React.useState('');

  useEffect((e) => {
    let params = new FormData()
    params.append('emailLog', emailLog);
    axios.post("http://localhost:8080/approve_app/php/get_name.php", params).then((response) => {
      setName(response.data[0])
      console.log(response.data)
  })
  });



  return (
    <div >
          <Routes>
            <Route path="/" element={<Autentificare emailLog={emailLog} setEmailLog={setEmailLog}/>}/>
            <Route path="/Portal" element={<Portal name={name} emailLog={emailLog} />}/>
            <Route path="/Licente" element={<Licente  emailLog={emailLog}/>}/>
            <Route path="/Istoric" element={<Istoric emailLog={emailLog} />}/>
            <Route path="/Tema" element={<Tema name={name} emailLog={emailLog} />}/>
          </Routes>
    </div>
  );
}

export default App;
