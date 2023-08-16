import React ,{ useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Licente from './Licente';
import IncarcareLicente from './IncarcareLicente';
import axios from 'axios';


function Portal(props) {
  const[statut, setStatut] =  React.useState('');
  const {emailLog}= props;
  
  

  
  useEffect(() => {
    let params = new FormData()
    params.append('emailLog', emailLog);
    axios.post("http://localhost:8080/approve_app/php/get_statut.php", params).then((response) => {
      setStatut(response.data[0])
      console.log(statut)
  })
  },[]);


  return (
    <div  >
      {statut === "profesor"?
      <Licente emailLog={emailLog}/> :
      <IncarcareLicente emailLog={emailLog} />
      }
          
    </div>
  );
}

export default Portal;
