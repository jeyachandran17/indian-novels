import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Home } from './Home'
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import { PageNotFound } from './PageNotFound';
import { BookList } from './BookList';
import { AddBook } from './AddBook';
import { EditBook } from './EditBook';

function App() {
  const navigate = useNavigate();

  const [show, setshow] = useState(true);

  const darkTheme = createTheme({
  palette: {
    mode: show ? 'dark' : 'light',
  },
  });

  const bgstyle = {
    borderRadius: "0px",
    minHeight:"100vh",
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={4} sx={bgstyle} >
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={()=>navigate("/")} >Home</Button>
              <Button color="inherit" onClick={()=>navigate("/books")} >Books</Button>
              <Button color="inherit" onClick={()=>navigate("/books/add")} >Add Book</Button>
              <Button sx={{marginLeft:"auto"}} color="inherit" onClick={() => setshow(!show)} >{show ? <BrightnessHighIcon/> : <Brightness4Icon/> }{ show ? 'Light Mode' : 'Drak Mode'}</Button>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/add" element={<AddBook />} />
            <Route path="/books/edit/:id" element={<EditBook />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Paper>
     </ThemeProvider>
  )
}

export default App
