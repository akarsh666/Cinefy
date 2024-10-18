import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.configs.js";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";
import routes from "./routes/routes.jsx";
import PageWrapper from "./components/common/PageWrapper.jsx";
import "react-toastify/dist/ReactToastify.css";

const App=()=>{
  const { themeMode }= useSelector((state)=>state.themeMode)

  return (
    <ThemeProvider theme={themeConfigs.custom({mode:themeMode})}>
      
      <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      theme={themeMode}
      />
      <CssBaseline />

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
      {routes.map((route,index)=>(
        route.index ? (
          <Route
          index
          key={index}
          element={route.state ? (
            <PageWrapper state={route.state}>{route.element}</PageWrapper>
          ):route.element}
          />
        ):(
          <Route
          path={route.path}
          key={index}
          element={route.state ? (
            <PageWrapper state={route.state}>{route.element}</PageWrapper>
          ):route.element}
          />
        )
      ))}
      </Route>
      </Routes>
      </BrowserRouter>

    </ThemeProvider>
  );
};

export default App
