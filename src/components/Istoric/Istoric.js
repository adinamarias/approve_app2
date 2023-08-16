import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import prof from '../../media/profview10.JPG';
import dayjs from "dayjs";
import SearchAppBar from '../Portal/AppBar';




function Istoric(props) {
  const currentDate = dayjs().format('YYYY-MM-DD HH:mm');
  const navigateIsto = useNavigate();
  const { emailLog } = props;
  const [coordinatedFilesIS, setCoordinatedFilesIS] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  

  useEffect(() => {
    const fetchCoordinatedFilesIS = async () => {
      try {
        const formData = new FormData();
        formData.append('coordinatorEmail', emailLog);
        formData.append('searchTerm', searchTerm);
        const response = await fetch('http://localhost:8080/approve_app/php/get_files.php', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setCoordinatedFilesIS(data);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Request failed:', error);
      }
    };

    fetchCoordinatedFilesIS();
  }, [emailLog, searchTerm]);

  const filteredFiles = coordinatedFilesIS.filter(file => file.EMAIL.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{ width: '98.9vw', height: '60vw', backgroundImage: `url(${prof})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} >
      <SearchAppBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Adăugat searchTerm și setSearchTerm */}
      <div style={{ flexDirection: 'row', display: 'flex', marginLeft: '1vw', backdropFilter: 'blur(5px)',  flexWrap: 'wrap' }}>
        {filteredFiles.map(file => (
          <Card sx={{ maxWidth: 300, maxHeight: 330, marginLeft: '2vw', marginTop: '5vh', boxShadow: '0 9px 18px rgba(0, 0, 0, 0.9)' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <embed src={`http://localhost:8080/approve_app/php/uploads/${file.NUME}`} width="100%" height="90%" type="application/pdf" />
            </div>
            <CardContent >
              <Typography gutterBottom variant="h8" component="div">
                {file.SPECIALIZARE}- {file.DENUMIRE_TEMA}- {file.NOTA !== null ? <span style={{color:'red'}}>NOTATA</span> : <span style={{color:'red'}}>DE NOTAT</span> }
              </Typography>
              <Typography variant="body2" color="text.secondary" component="div" style={{ fontFamily: "Bodoni MT" }}>
                STUDENT: <span style={{ color: 'blue' }}> {file.EMAIL}</span>
              </Typography>
              <div style={{ width: '5vw', height: '2vh', marginLeft: '5.5vw', flexDirection: 'row', display: 'flex' }}>
                <a href={`http://localhost:8080/approve_app/php/uploads/${file.NUME}`} target="_blank" rel="noopener noreferrer" >
                  <Button>
                    VIZUALIZARE
                  </Button>
                </a>
                
              </div>
              {file.FEEDBACK == 'APPROVE' || file.FEEDBACK == 'DECLINE' ? (
                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', marginTop: '4vh' }}>
                  <Typography variant="body" color="text.secondary" component="div" style={{ fontFamily: "Bodoni MT" }}>
                    NOTA: <span style={{ color: 'red' }}>{file.NOTA}</span>
                  </Typography>
                  <Typography variant="body" color="text.secondary" component="div" style={{ fontFamily: "Bodoni MT", fontSize:'2.5vh' }}>
                    <span style={{ color: 'green' }}>STATUS:</span><span style={{ color: 'red' }}>{file.FEEDBACK}</span>
                  </Typography>
                </div>
              ) : (
                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', marginTop: '4vh' }}>
                  <Typography variant="body" color="text.secondary" component="div" style={{ fontFamily: "Bodoni MT" }}>
                    NOTA: <span style={{ color: 'red' }}>{file.NOTA}</span>
                  </Typography>

                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    
    </div>
  );
}

export default Istoric;
