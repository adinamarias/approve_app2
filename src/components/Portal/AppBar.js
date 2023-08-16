import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Tooltip from '@mui/material/Tooltip';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Stack from "@mui/material/Stack";
import { TextField } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const style3= {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'50vw',
  height:'80vh',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius:'30px',
  p: 4,
boxShadow: '0 9px 18px rgba(0, 0, 0, 0.9)',
opacity: 1
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const SearchAppBar = ({ searchTerm, setSearchTerm , emailLog}) => {
  const [openSnackSali, setOpenSnackSali] = React.useState(false);

  const handleClickSnackSali = () => {
    setOpenSnackSali(true);
  };

  const handleCloseSnackSali = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackSali(false);
  };

 const [severity, setSeverity] = useState('success'); // Valoarea implicită pentru succes
  const navigateApp = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [dateWithNoInitialValueS, setDateWithNoInitialValueS] =
    React.useState(null);
      const [dateWithNoInitialValueE, setDateWithNoInitialValueE] =
    React.useState(null);
const currentDate = dayjs().format('YYYY-MM-DD HH:mm');

 const [openProgr, setOpenProgr] = React.useState(false);

  const handleClickOpenProgr = () => {
    setOpenProgr(true);
  };

  const handleCloseProgr = () => {
    setOpenProgr(false);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/approve_app/php/search.php?search=${searchTerm}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    // Realizează o cerere către server pentru a obține sugestiile bazate pe valoarea introdusă
    fetch(`http://localhost:8080/approve_app/php/search.php?search=${value}`)
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    handleSearch();
  };

    const [openSala, setOpenSala] = React.useState(false);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [endDateEnabled, setEndDateEnabled] = useState(false);
    const [specializareSala, setSpecializareSala] = useState('');
    const [sali, setSali] = useState([]);
    const [IDsala, setIDsala] = useState('');
    const [denumSala, setDenumSala] = useState('');

    const handleOpenSala = () => setOpenSala(true);
    const handleCloseSala = () => setOpenSala(false);
 
 const handleDateTimeChangeStart = (newValue) => {
      setStartDate(dayjs(newValue).format('YYYY-MM-DD HH:mm'));
      setDateWithNoInitialValueS(newValue);
      console.log(startDate);
    }

const handleDateTimeChangeEnd = (newValue) => {
  const selectedStartDate = dayjs(startDate);
  const selectedEndDate = dayjs(newValue);

  if (
    selectedStartDate.isValid() &&
    selectedEndDate.isValid() &&
    selectedStartDate.isBefore(selectedEndDate)
  ) {
    setEndDate(selectedEndDate.format('YYYY-MM-DD HH:mm'));
    console.log(endDate)
    setDateWithNoInitialValueE(newValue);

    const intervalInHours = selectedEndDate.diff(selectedStartDate, 'hours');
    if (intervalInHours > 4) {
      alert('Intervalul trebuie să fie mai mic de 4 ore');
    }else {
        // Call the Sali function here
       
      }
  } 
};


 const Inchirere = () => {
    let params = new FormData()
    params.append('start', startDate);
    params.append('end', endDate);
    params.append('emailLog', emailLog);
    params.append('specializare', specializareSala);
    params.append('id_sala', IDsala);
    axios.post("http://localhost:8080/approve_app/php/add_inchiriere.php", params).then((response) => {
      if (response.data === 'success') {
        setSeverity('success');
        handleClickSnackSali();
      } else {
        setSeverity('error');
        handleClickSnackSali();
      }
      })
      .catch((error) => {
        console.log(error);

      });
 }
 const Sali = () => {
    let params = new FormData()
    params.append('start', startDate);
    params.append('end', endDate);
    axios.post("http://localhost:8080/approve_app/php/get_sali.php", params).then((response) => {
        setSali(response.data)
        console.log(sali.ID)
      })
      .catch((error) => {
        console.log(error);
      });
 }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#039be5' }}>
        <Toolbar>
        <Tooltip title="Pagina principala">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => navigateApp('/Licente')}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Istoric teme">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => navigateApp('/Istoric')}
            >
              <PersonSearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Adauga tema">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => navigateApp('/Tema')}
            >
              <PostAddIcon />
            </IconButton>
          </Tooltip>
           <Tooltip title="Alege o sală">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => handleOpenSala()}
            >
              <PinDropIcon />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          ></Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </Search>
        </Toolbar>
    </AppBar>
    <Modal
      open={openSala}
      onClose={handleCloseSala}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <Card sx={style3}>
        <CardContent >
          <Typography gutterBottom variant="h4" component="div" style={{fontFamily:'cursive'}}>
            Săli disponibile
            
          </Typography>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale="ro">
                <Stack
                  style={{
                    width: "18vw",
                    marginTop:'5vh',
                    marginLeft:'4vw'
                  }}
                >
                  <DateTimePicker
                    style={{ justifyContent: "center", display: "flex"}}
                    sx={{ width: 197 }}
                    inputFormat="YYYY-MM-DD HH:mm"
                    ampm={false}
                    label="De la"
                    value={dateWithNoInitialValueS}
                    onChange={handleDateTimeChangeStart}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
              <Button onClick={() => {
          Sali()
          }}>
                <SearchIcon style={{marginTop:'15vh', marginRight:'4vw'}}/>
              </Button>
               <LocalizationProvider dateAdapter={AdapterDayjs} locale="ro" >
                <Stack
                  style={{
                    width: "18vw",
                    marginTop:'5vh'
                  }}
                >
                  <DateTimePicker
                    style={{ justifyContent: "center", display: "flex" , padding:'5vh'}}
                    sx={{ width: 197 }}
                    inputFormat="YYYY-MM-DD HH:mm"
                    ampm={false}
                    label="Pâna La"
                    value={dateWithNoInitialValueE}
                    onChange={handleDateTimeChangeEnd}
                    renderInput={(params) => <TextField {...params} id="datetime"/>}
                  />
                  
                </Stack>
                
              </LocalizationProvider>
              
          </div>
          <div>

          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '5vh', height: '50vh', width: '47vw', justifyContent: 'space-between' }}>
  {sali.map((sala) => (
    <div style={{ width: '6vw', height: '2vh', marginBottom: '1vh' }}>
      <Button
        variant='outlined'
        style={{ backgroundColor: '#ffb300', color: 'black', fontFamily: 'Gill Sans' }}

        onClick={() => {handleClickOpenProgr()
        setIDsala(sala.ID)
        setDenumSala(sala.DENUMIRE_SALA)
        }}
      >
        
        {sala.DENUMIRE_SALA}
        <SchoolIcon style={{ }} />
      </Button>
    </div>
  ))}
</div>

        </CardContent>       
      </Card>
    </Modal>
    <Dialog
    open={openProgr}
    onClose={handleCloseProgr}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
         Ești sigur că vrei să rezervi sala <span style={{color:'#01579b'}}>{denumSala}</span> 
      </DialogTitle>
      <DialogTitle id="alert-dialog-title">
        de la : <span style={{color:'red'}}>{startDate}</span> 
      </DialogTitle>
      <DialogTitle id="alert-dialog-title">
        până la : <span style={{color:'red'}}>{endDate}</span>?
       
      </DialogTitle>
      <DialogTitle>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Specializare</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
             
            >
              <FormControlLabel value="LICENTA" control={<Radio />} label="Licenta"  
              onChange={(event) => {setSpecializareSala(event.target.value)
              }
              } />
              <FormControlLabel value="MASTER" control={<Radio />} label="Master"  onChange={(event) => {setSpecializareSala(event.target.value)
              }
              }/>

            </RadioGroup>
          </FormControl>
      </DialogTitle>
      <DialogActions>
          <Button onClick={handleCloseProgr} style={{color:'red'}} >NU</Button>
          <Button onClick={() => {handleCloseProgr()
          Inchirere()
          }}
           style={{color:'green'}} 
           autoFocus>
              DA
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackSali} autoHideDuration={6000} onClose={handleCloseSnackSali}>
        <Alert onClose={handleCloseSnackSali} severity={severity} sx={{ width: '100%' }}>
          {severity === 'success' ? 'Rezervarea a fost efectuata cu succes!' : 'Ceva nu a functionat.Mai incearca o data!'}
        </Alert>
      </Snackbar>
    </Box>
    
  );
};

export default SearchAppBar;
