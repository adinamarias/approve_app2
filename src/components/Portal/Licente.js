import React ,{ useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import SearchAppBar from './AppBar';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import prof from '../../media/profview10.JPG';
import LinearProgress from '@mui/material/LinearProgress';
import dayjs from "dayjs";
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    bgcolor: 'background.paper',
    borderRadius: 10,
    boxShadow: 24,
    height:'70vh'
  };
const style3= {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#ffb74d',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius:'30px',
  p: 4,
  width:'27vw', 
  height:'20vh', 
  marginLeft:'82vw', 
  display:'flex', 
  justifyContent:'center',
boxShadow: '0 9px 18px rgba(0, 0, 0, 0.9)',
opacity: 0.95,

marginTop:'35vh'

};
  
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Licente(props) {

    const currentDate = dayjs().format('YYYY-MM-DD HH:mm');
    const navigateLice = useNavigate();
    const { emailLog, intalnire } = props;
    const [coordinatedFiles, setCoordinatedFiles] = useState([]);
    const [openCom, setOpenCom] = React.useState(false);
    const handleOpenCom = () => setOpenCom(true);
    const handleCloseCom = () => setOpenCom(false);
    const[nota, setNota]= React.useState('');
    const[comm, setComm]= React.useState('');
    const[salaStud, setSalaStud]= React.useState([]);
    const[student, setStudent] = React.useState('');
    const[progress, setProgress] = React.useState(0);
    const [calculateSumTrigger, setCalculateSumTrigger] = useState(false);
    const [successFeed, setSuccessFeed] = useState(false);
    const [openFSnack, setOpenFsnack] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [appDecl, setAppOrDecl] = useState('');
    const [dialogMessage, setDialogMessage] = useState('');
    const [openAppOrDecl, setOpenAppOrDecl] = React.useState(false);

  const handleClickOpenAppOrDecl = () => {
    setOpenAppOrDecl(true);
  };

  const handleCloseAppOrDecl = () => {
    setOpenAppOrDecl(false);
  };


  const handleClickApprove = () => {
    setAppOrDecl('APPROVE');
    setNota(10)
    setComm('APPROVE')
    setDialogMessage("Esti sigur ca vrei sa treci lucrarea in APPROVE?");

  };

  const handleClickDecline = () => {
    setAppOrDecl('DECLINE');
    setNota(5)
    setComm('DECLINE')
    setDialogMessage("Esti sigur ca vrei sa treci lucrarea in DECLINE?");
  };

  const handleClickF = () => {
    setOpenFsnack(true);
  };

  useEffect(() => {
    if (salaStud !== null) {
      const timer = setTimeout(() => {
        setSalaStud(null);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [salaStud]);


  const Intalnire = () => {
     let params = new FormData()
    params.append('emailLog', emailLog);
  
  axios.post("http://localhost:8080/approve_app/php/get_sala_prof.php", params).then((response) => {
      setSalaStud(response.data)
      console.log(response.data)
})
  };

  const handleCloseF = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenFsnack(false);
  };


useEffect(() => {
  const fetchCoordinatedFiles = async () => {
    try {
      const formData = new FormData();
      formData.append('coordinatorEmail', emailLog);
      const response = await fetch('http://localhost:8080/approve_app/php/get_files.php', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const filteredFiles = data.filter(file => file.EMAIL.includes(searchTerm));
        setCoordinatedFiles(filteredFiles);
        setCalculateSumTrigger(true); 
        Intalnire()
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };
  if(emailLog)
    fetchCoordinatedFiles();
}, [emailLog, searchTerm]);




 const Feed = () => {
    let params = new FormData()
    params.append('comm', comm);
    params.append('emailLog', emailLog);
    params.append('nota', nota);
    params.append('data', currentDate);
    params.append('student', student);
    axios.post("http://localhost:8080/approve_app/php/add_feedback.php", params).then((response) => {
        console.log(response.data);
        if (response.data === "success") {
          setSuccessFeed(true);
        } else {
          setSuccessFeed(false);
        }
        setOpenFsnack(true);
      })
      .catch((error) => {
        console.log(error);
        setSuccessFeed(false);
        setOpenFsnack(true);
      });
 }


 const AppOrDecl = () => {
    let params = new FormData()
    params.append('appDecl', appDecl);
    params.append('emailLog', emailLog);
    params.append('nota', progress);
    params.append('data', currentDate);
    params.append('student', student);
    axios.post("http://localhost:8080/approve_app/php/add_statusFinal.php", params).then((response) => {
        console.log(response.data);
      if (response.data === "success") {
          setSuccessFeed(true);
          Feed();
        } else {
          setSuccessFeed(false);
        }
        setOpenFsnack(true);
      })
      .catch((error) => {
        console.log(error);
        setSuccessFeed(false);
        setOpenFsnack(true);
      });
 }

const getColor = (file) => {
  const progress = file.SUMA;
  if (progress >= 60) {
          return 'green'; 
        } 
        else {
          return 'red'
        }
};


const calculateSum = async () => {
  const fetchSumForStudent = async (email) => {
    try {
      let params = new FormData();
      params.append('email', email);

      const response = await axios.post('http://localhost:8080/approve_app/php/calculate_sum.php', params);
      const sum = parseInt(response.data);

      return sum;
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  const updatedFiles = await Promise.all(
    coordinatedFiles.map(async (file) => {
      const sum = await fetchSumForStudent(file.EMAIL);
      setProgress(sum);
      console.log(sum);
      return { ...file, SUMA: sum };
    })
  );

  setCoordinatedFiles(updatedFiles);
};
useEffect(() => {
  if (calculateSumTrigger) {
    calculateSum();
    setCalculateSumTrigger(false);
  }
}, [coordinatedFiles, calculateSumTrigger]);


  return (
    <div style={{width:'98.9vw', height:'80vw',  backgroundImage: `url(${prof})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} >
        <SearchAppBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} emailLog={emailLog} />
        <div style={{ flexDirection:'row', display:'flex', marginLeft:'1vw',backdropFilter: 'blur(5px)' , flexWrap: 'wrap'}}>
            {coordinatedFiles.map(file => (
                   file.NOTA === null &&(
                <Card sx={{ maxWidth:300, maxHeight:330, marginLeft:'2vw', marginTop:'5vh',boxShadow: '0 9px 18px rgba(0, 0, 0, 0.9)' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <embed src={`http://localhost:8080/approve_app/php/uploads/${file.NUME}`} width="100%" height="90%" type="application/pdf" />
                    </div>
                    <CardContent >
                        <Typography gutterBottom variant="h8" component="div">
                            {file.SPECIALIZARE}- {file.DENUMIRE_TEMA}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="div" style={{fontFamily: "Bodoni MT"}}>
                            STUDENT: <span style={{ color: 'blue' }}> {file.EMAIL}</span> 
                        </Typography>
                        <div style={{width:'5vw', height:'2vh', marginLeft:'5vw', flexDirection:'row', display:'flex'}}>
                            <a href={`http://localhost:8080/approve_app/php/uploads/${file.NUME}`} target="_blank" rel="noopener noreferrer" >
                                <Button>
                                    VIZUALIZARE
                                </Button>
                            </a>
                        </div>
                        <div style={{flexDirection:'row',  display:'flex', justifyContent:'space-between', marginTop:'4vh'}}>
                            <Tooltip title="Approve" >
                                <Button
                                id='approve'
                                disabled={file.SUMA < 59}
                                 onClick={()=>{handleClickApprove()
                                 handleClickOpenAppOrDecl()
                                setStudent(file.EMAIL)
                                }}
                                >
                                    <TaskAltIcon style={{color:'green'}}/>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Comentariu">
                                <Button
                                onClick={()=>{handleOpenCom()
                                setStudent(file.EMAIL)
                                }}
                                >
                                    <ChatBubbleOutlineIcon/>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Decline">
                                <Button 
                                id='decline'
                                 onClick={()=>{handleClickDecline()
                                 handleClickOpenAppOrDecl()
                                setStudent(file.EMAIL)
                                }}
                                 
                                >
                                    <HighlightOffIcon style={{color:'red'}}/>
                                </Button>
                            </Tooltip>
                            
                       </div>
                       <Box sx={{ width: '100%', marginTop:'3vh' }}>
                       <Tooltip title={`Progres: ${file.SUMA}`} placement="top">
                        <LinearProgress
                          variant="determinate"
                          value={file.SUMA}
                          sx={{
                            width: '100%',
                            marginTop: '3vh',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: getColor(file),
                            },
                          }}
                        />
                      </Tooltip>

                        </Box>
                    </CardContent>       
                </Card>
               )
            ))}
        </div>
        <Modal
            className={openCom ? "modal-container modal-reveal" : "modal-container"}
            open={openCom}
            onClose={handleCloseCom}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                timeout: 500,
                },
            }}
        >
            <Fade in={openCom}>
            <Box sx={style}>
                    <TextField
                        multiline
                        rows={18.3}
                        fullWidth
                        style={{borderRadius:35}}
                        InputProps={{
                            disableUnderline: true,
                            style: {
                              backdropFilter: 'blur(9px)',
                              backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            },
                          }}
                        onChange={(e)=>setComm(e.target.value)}
                    />
                    <Button 
                    style={{variant:'contained', backgroundColor:'green', color:'black', marginTop:'1.5vh', marginRight:'2vw'}}
                      onClick={()=>{
                            Feed()
                        }
                        }
                    >
                        Trimite</Button>
                    <TextField
                      id="filled-number"
                      label="Nota"
                      type="number"
                      size='small'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      style={{width:'5vw', marginTop:'0.5vh'}}
                      onChange={(e)=>{setNota(e.target.value)
                      }}
                      />
                </Box>
            </Fade>
        </Modal>
       {salaStud !== null ? (
  <div style={style3}>
    {salaStud.map((sal) => {
      const startDate = (sal.START_DATE); 
      if (currentDate < startDate) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
            <Typography className="button" style={{ color: 'red', fontWeight: 'bold', fontFamily: 'Courier', fontSize: '3vh', marginLeft: '2vh' }}>
              REMINDER!!!!
            </Typography>
            <Typography style={{ bottom: '11vh', color: '#01579b', fontWeight: 'bold', fontFamily: 'Courier', fontSize: '2.5vh' }}>
              ATI PROGRAMAT O INTALNIRE NOUA
            </Typography>
            <Typography style={{ bottom: '7vh', color: 'black', fontWeight: 'bold' }}>SALA: {sal.DENUMIRE_SALA}</Typography>
            <Typography style={{ bottom: '4vh', color: 'black', fontWeight: 'bold' }}>DATA SI ORA: {sal.START_DATE}</Typography>
            <Typography style={{ bottom: '1vh', color: 'black', fontWeight: 'bold' }}>SPECIALIZARE: {sal.SPECIALIZARE}</Typography>
          </div>
        );
      } else {
        return <Typography style={{marginTop:'8vh', fontSize:'2.5vh', color:'black', fontFamily:'Courier'}}>Programati o intalnire noua</Typography>;
      }
    })}
  </div>
) : ''}

         <Snackbar open={openFSnack} autoHideDuration={4000} onClose={handleCloseF}>
        {successFeed ? (
          <Alert onClose={handleCloseF} severity="success" sx={{ width: "100%" }}>
            Acțiunea a fost realizată cu succes!
          </Alert>
        ) : (
          <Alert severity="error" onClose={handleCloseF}>Ceva nu a funcționat. Încearcă din nou!</Alert>
        )}
      </Snackbar>
      <Dialog
        open={openAppOrDecl}
        onClose={handleCloseAppOrDecl}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogMessage}
        </DialogTitle>
        <DialogActions>
          <Button style={{color:'red'}}onClick={handleCloseAppOrDecl}>NU</Button>
          <Button style={{color:'green'}}
           onClick={()=>{handleCloseAppOrDecl()
                              AppOrDecl()
                              
                                }}
          autoFocus>
            DA
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Licente;
