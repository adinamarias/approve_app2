import { Typography } from '@mui/material';
import React ,{ useState, useEffect, useRef, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import fmi from '../../media/fmi.jpeg'
import '../LogIn/style.css'
import { Button } from '@mui/base';
import './buton.css';
import './butonnota.css';
import './welcome.css';
import './box.scss';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import dayjs from "dayjs";
import SchoolIcon from '@mui/icons-material/School';
import LinearProgress from '@mui/material/LinearProgress';
import CircleIcon from '@mui/icons-material/Circle';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'60vw',
  height:'80vh',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius:'30px',
  p: 4,
boxShadow: '0 9px 18px rgba(0, 0, 0, 0.9)',
opacity: 0.9
};
const style2= {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'40vw',
  height:'50vh',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius:'30px',
  p: 4,
boxShadow: '0 9px 18px rgba(0, 0, 0, 0.9)',
opacity: 0.9
};
const style3= {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#ffa726',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius:'30px',
  p: 4,
  width:'30vw', 
  height:'10vh', 
  marginLeft:'70vw', 
  display:'flex', 
  justifyContent:'center',
boxShadow: '0 9px 18px rgba(0, 0, 0, 0.9)',
opacity: 0.95,
bottom:'40vh',
marginLeft:'80vw'
};
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function IncarcareLicente(props) {
   const currentDate = dayjs().format('YYYY-MM-DD HH:mm');
    const [showBack, setShowBack] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const fileInputRef = useRef(null);
    const [licenta, setLicenta] = useState([]);
    const {emailLog} = props;
    const [ intalnire,setIntalnire] = React.useState([]);
    const[specia, setSpecia] =  React.useState('');
    const [incadrare, setIncadrare] = useState([]);
    const [openTema, setOpenTema] = React.useState(false);
    const [openNote, setOpenNote] = React.useState(false);
    const [denu, setDenu] = React.useState('');
    const [ not,setNot] = React.useState([]);
    const [ predata,setPredata] = React.useState('');
    const [ statF,setStatF] = React.useState('');
    const handleOpenNote = () => setOpenNote(true);
    const handleCloseNote = () => setOpenNote(false);
    const handleOpenTema = () => setOpenTema(true);
    const handleCloseTema = () => setOpenTema(false);
    const [openValid, setOpenValid] = React.useState(false);
    const [error, setError] = useState(false);

    const handleClickValid = () => {
      setOpenValid(true);
    };

    const handleCloseValid = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpenValid(false);
    };


const fetchData = () => {
  let params = new FormData();
  params.append('emailLog', emailLog);
  params.append('specia', specia);
  params.append('predata', predata);
  axios.post("http://localhost:8080/approve_app/php/get_incarcare_licenta.php", params)
    .then((response) => {
      if (response.data.licenta) {
        setLicenta(response.data.licenta);
      }
      if (response.data.specializare) {
        setSpecia(response.data.specializare[0]);
         Intalnire(response.data.specializare[0])
        
      }
      if (response.data.tema) {
        setIncadrare(response.data.tema);
      }
      if (response.data.nota) {
        setNot(response.data.nota);
      }
      if (response.data.suplimentar) {
        setPredata(response.data.suplimentar);
      }
      if (response.data.status_final) {
        setStatF(response.data.status_final);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

   const Intalnire = (sp) => {
     let params = new FormData()
    params.append('specia', sp);
  
  axios.post("http://localhost:8080/approve_app/php/get_sala_studenti.php", params).then((response) => {
      setIntalnire(response.data)

})
  };


 useEffect(() => {
      fetchData()
    },[specia]);



    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          console.log(file);
          const formData = new FormData();
          formData.append('file', file);
          formData.append('emailLog', emailLog);
          formData.append('denumire', denu);
          formData.append('date', currentDate);
          formData.append('specia', specia);
          axios.post(`http://localhost:8080/approve_app/php/upload.php`, formData)
            .then(response => {
              console.log(response.data);
              setOpenValid(true);
              fetchData()
            })
            .catch(error => {
              console.log(error);
              setError(true);
            });
        }
      };


    useEffect(() => {
      setTimeout(() => {
        setShowBack(true);
      }, 700);
    }, []);

    useEffect(() => {
        if (showBack) {
          let opacity = 0.9;
          const interval = setInterval(() => {
            opacity += 0.09;
            if (opacity >= 1) {
              opacity = 1;
              clearInterval(interval);
            }
            document.getElementById("background-img").style.opacity = opacity;
          }, 100);
        }
      }, [showBack]);

      useEffect(()=>{



      })
      const getColorStudent = (not) => {
        const progress =not.SUM;
        if (progress >= 60) {
          return 'green'; 
        } 
        else {
          return 'red'
        }
      };
    
      return (
        
        <div
          style={{
            width: "100vw",
            height: "57vw",
            backgroundImage: `url(${fmi})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
            opacity: "0.9",
            transition: "opacity 1s ease-in-out",
          }}
          id="background-img"
        >
        <input
            type="file"
            accept="application/pdf, video/*, image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileUpload}
            />
        <div id='container'>
            Make 
            <div id='flip'>
            <div><div>License</div></div>
            <div><div>uvt</div></div>
            <div><div>Everything</div></div>
            </div>
            AweSoMe!
        </div>
        
        {not.map((not)=>(
        <div>
          <Button
          style={{marginLeft:'87vw',justifyContent:'cenetr' }}
          className="button-87"
          onClick={handleOpenNote}
          >
            NOTE
            <SchoolIcon style={{color:'#ff5722'}}/>
          </Button>
          <Modal
            open={openNote}
            onClose={handleCloseNote}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Card sx={style2}>
            {statF == 'null' ? (
              <div>
              
              <div style={{display:'flex', flexDirection:'row'}}>
                <div style={{  display:'flex', justifyContent:'center', width:'20vw', height:'5vh'}}> 
                  <Typography style={{fontFamily:'Roboto', fontWeight:'bold', width:'20vw', color:'black'}}><span style={{ color: 'black' , fontWeight:'bold'}}>DENUMIRE TEMA </span>: {not.DENUMIRE_TEMA} </Typography>  
                   
                </div>
                <div style={{  display:'flex', justifyContent:'center', width:'15vw', height:'5vh', marginLeft:'2vw'}}>
                  <Typography style={{ fontFamily:'Roboto', fontWeight:'bold', width:'20vw',  color:'black'}}> {not.NOTA == null ? 'NOTA = NEATRIBUITA' : 'NOTA: ' + not.NOTA}</Typography> 
                </div>
              </div>
              <div style={{ height:'9vh', overflow:'auto', marginTop:'2vh'}}>
                <Typography style={{fontFamily:'Roboto', fontWeight:'bold', color:'black', height:'5vh'}}>FEEDBACK: {not.FEEDBACK}</Typography>
              </div>
               
               <Box sx={{ width: '100%', marginTop:'8vh' }}>
                  <Tooltip title={`Progres: ${not.SUM}`} placement="top">
                    <LinearProgress
                      variant="determinate"
                      value={not.SUM}
                      sx={{
                        width: '100%',
                        marginTop: '3vh',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: getColorStudent(not),
                            },
                          }}
                      />
                  </Tooltip>
              <Typography style={{ fontFamily:'Roboto', fontWeight:'bold', width:'40vw',  color:'#ff8f00', marginTop:'5vh'}}>!Bara de progres indică punctajul acumulat la cele 10 teme de până acum.</Typography>
              <Typography style={{ fontFamily:'Roboto', fontWeight:'bold', width:'40vw',  color:'red'}}>!Pentru ca lucrarea să fie trecută la Approve, suma notelor trebuie să fie mai mare</Typography>
              <Typography style={{ fontFamily:'Roboto', fontWeight:'bold', width:'40vw',  color:'red'}}>sau egală cu 60 </Typography>
              
              </Box>
              <Typography style={{ marginTop:'3vh',fontFamily:'Roboto', fontWeight:'bold', width:'40vw' }}>  
              <span style={{ color: 'green' , fontWeight:'bold'}}><CircleIcon style={{}}/> = APPROVE</span> 
               <span>&nbsp;</span>
                <span>&nbsp;</span>
                 <span>&nbsp;</span>
                  <span>&nbsp;</span>
                   <span>&nbsp;</span>
                    <span>&nbsp;</span>
                     <span>&nbsp;</span>
              <span style={{ color: 'red' , fontWeight:'bold'}}> <CircleIcon/> = DECLINE</span> 
              </Typography>
              </div>    
              )
              :
              (
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <Typography style={{ bottom: '48vh', fontFamily: 'Roboto', fontWeight: 'bold', width: '40vw', color: 'black', fontSize:'3vh'}}>
                    Lucrarea ta a fost asignată la statusul de:<span style={{ color: statF == 'APPROVE' ? 'green' : 'red' }}>{statF}</span>
                  </Typography>
                  <Typography style={{ bottom: '38vh', fontFamily: 'Roboto', fontWeight: 'bold', width: '40vw', color: 'black',fontSize:'2.5vh', marginTop:'3vh'}}>
                    NOTA FINALA: <span style={{ color: statF == 'APPROVE' ? 'green' : 'red' }}>{not.SUM/10}</span>
                  </Typography>
                  <Typography style={{ bottom: '30vh', fontFamily: 'Roboto', fontWeight: 'bold', width: '40vw', color: 'red',fontSize:'2.5vh', marginTop:'3vh'}}>
                    !!!Pentru eventualele intrebari, sau daca exista alte neclaritati
                  </Typography>
                  <Typography style={{ bottom: '25vh', fontFamily: 'Roboto', fontWeight: 'bold', width: '40vw', color: 'red',fontSize:'2.5vh', marginTop:'3vh'}}>
                    discutati cu profesorul coordonator.
                  </Typography>
                    <Typography style={{ bottom: '15vh', fontFamily: 'Roboto', fontWeight: 'bold', width: '40vw', color: 'green',fontSize:'2.5vh', marginTop:'3vh'}}>
                      LINIA DE PROGRES:
                  </Typography>
                  <Tooltip title={`Progres: ${not.SUM}`} placement="top">
                    <LinearProgress
                      variant="determinate"
                      value={not.SUM}
                      sx={{
                        width: '100%',
                        marginTop: '10vh',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getColorStudent(not),
                        },
                      }}
                    />
                  </Tooltip>
                  <Typography style={{ bottom: '3vh', fontFamily: 'Roboto', fontWeight: 'bold', width: '40vw', marginTop:'3vh' }}>
                    <span style={{ color: 'green', fontWeight: 'bold' }}>
                      <CircleIcon style={{}} /> = APPROVE
                    </span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                      <CircleIcon /> = DECLINE
                    </span>
                  </Typography>
                </div>
              )} 
            </Card>
          </Modal>
          
        </div>
        ))}
        {incadrare.map((inca) => (
  <div style={{ padding: 250 }}>
    {incadrare == 'null' ? (
      <Button
        style={{ color: '#ffa733', fontWeight: 'bold', fontSize: '1.6vw' }}
        className="button-86"
        disabled
      >
        Nu există temă
      </Button>
    ) : statF == 'null' ? (
      <Button
        style={{
          color: '#ffa733',
          fontWeight: 'bold',
          fontSize: '1.6vw',
        }}
        className="button-86"
        disabled={predata !== 'null' || inca.DAYS_LEFT > 0}
        onClick={() => {
          handleOpenTema();
          setDenu(inca.DENUMIRE_TEMA);
        }}
      >
        {inca.DENUMIRE_TEMA}
        {predata !== 'null' || inca.DAYS_LEFT > 0 ? (
          <CheckCircleOutlineIcon style={{ color: 'green' }} />
        ) : (
          <HighlightOffIcon style={{ color: 'red' }} />
        )}
      </Button>
    ) : (
      <Button
        style={
          statF === 'APPROVE'
            ? {
                color: 'green',
                fontWeight: 'bold',
                fontSize: '1.6vw',
                marginRight: '50vw',
                backgroundColor: 'black',
                boxShadow: 24,
                borderRadius: '30px',
              }
            : {
                color: 'red',
                fontWeight: 'bold',
                fontSize: '1.6vw',
                marginRight: '50vw',
                backgroundColor: 'black',
                boxShadow: 24,
                borderRadius: '30px',
              }
        }
        variant="outlined"
        disabled
      >
        STATUS={statF}
      </Button>
    )}

    <Modal
      open={openTema}
      onClose={handleCloseTema}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
              
               <Card sx={style}>
                   
                    <CardContent >
                        <Typography gutterBottom variant="h6" component="div">
                            {inca.DENUMIRE_TEMA}
                        </Typography>
                        <Typography variant="h7" color="black" component="div" style={{fontFamily: "Bodoni MT", marginTop:'10vh',width:'60vw', height:'20vh', display:'flex', justifyContent:'flexStart',overflow:'auto'}}>
                            <span style={{ color: 'blue' }}>DESCRIERE TEMA: </span>  {inca.DESCRIERE_TEMA}
                        </Typography>
                        <Typography variant="h7" color="black" component="div" style={{fontFamily: "Bodoni MT", marginTop:'10vh',width:'60vw', height:'20vh', display:'flex', justifyContent:'flexStart'}}>
                            <span style={{ color: 'blue' }}>DEADLINE: </span> <span style={{ color: 'RED' , fontWeight:'bold'}}>  {inca.DEADLINE}</span> 
                             <span>&nbsp;</span> {/* Adaugă un element span gol */}
                              <span>&nbsp;</span> {/* Adaugă un element span gol */}
                               <span>&nbsp;</span> {/* Adaugă un element span gol */}
                                <span>&nbsp;</span> {/* Adaugă un element span gol */}
                                 <span>&nbsp;</span> {/* Adaugă un element span gol */}
                                  <span>&nbsp;</span> {/* Adaugă un element span gol */}
                                   <span>&nbsp;</span> {/* Adaugă un element span gol */}
                                    <span>&nbsp;</span> {/* Adaugă un element span gol */}
                                     <span>&nbsp;</span> {/* Adaugă un element span gol */} <span>&nbsp;</span> {/* Adaugă un element span gol */}
                            <span style={{ color: 'blue' }}>DATA POSTARII: </span> <span style={{ color: 'BLACK' , fontWeight:'bold'}}>  {inca.DATE_ADDED}</span> 
                        </Typography>
                        
                         <Button
                          style={{color:'green', fontWeight:'bold', fontSize:'1.6vw', marginLeft:'24vw'}} 
                          className="button-86"
                          disabled={uploaded }
                          onClick={() => fileInputRef.current.click()}>
                            Încarcă
                            <UploadFileIcon/>
                        </Button> 
                        
                    </CardContent>       
                </Card>
            </Modal>
        </div>
        ))}
        {intalnire !== null ? (
  <div style={style3}>
    {intalnire.map((inta) => {
      if (inta.START_DATE < currentDate) {
        return <Typography style={{color:'black', marginTop:'3vh'}}>
        Nu exista momentan nicio intalnire
        </Typography>; // Exclude întâlnirile cu START_DATE mai mic decât currentDate
      }
      return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection:'column' }}>
          <Typography className='button' style={{ bottom: '7vh' }}>
            INTALNIRE NOUA!
          </Typography>
          <Typography style={{ bottom: '4vh', color: 'black', fontWeight: 'bold' }}>
            SALA: {inta.DENUMIRE_SALA}
          </Typography>
          <Typography style={{ bottom: '1vh', color: 'black', fontWeight: 'bold' }}>
            DATA SI ORA: {inta.START_DATE}
          </Typography>
        </div>
      );
    })}
  </div>
) : ''}
       
        <div className='profile'>
        {licenta.map((lice)=>(
            <div style={{position:'absolute', justifyContent:'center', display:'flex', width:'20vw',height:'2vh', margin:'auto'}}>
                <Typography style={{position:'absolute', bottom:'9vh',  fontFamily:'Roboto', fontWeight:'bold', width:'19vw'}}>Coordonator: {lice.COORDONATOR}</Typography>  
                <Typography style={{position:'absolute', bottom:'1vh', fontFamily:'Roboto', fontWeight:'bold', width:'20vw'}}>Nume Lucrare: {lice.NUME_LICENTA}</Typography> 
            </div>
        ))}  
         
        </div>
    
            <Snackbar open={openValid} autoHideDuration={6000} onClose={handleCloseValid}>
                          <Alert onClose={handleCloseValid} severity="success" sx={{ width: '100%' }}>
                            Ai încărcat cu succes!
                          </Alert>
                         
                      </Snackbar>
        </div>
      );
    }

export default IncarcareLicente;
