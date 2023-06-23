import './App.css';
import AuthLayout from './components/layout/AuthLayout';
import Login from './components/pages/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Resister from './components/pages/Resister';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from '@mui/material';
import { blue } from '@mui/material/colors';

function App() {

  const theme = createTheme({
    palette: { primary: blue },
  });



  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Resister />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
