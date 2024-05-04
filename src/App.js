import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme/darktheme";
import Navbar from "./page/Navbar/Navbar";
import Home from "./page/Home/Home";
import Auth from "./page/Auth/Auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTask } from "./ReduxToolkit/TaskSlice";
import { getUserProfile } from "./ReduxToolkit/AuthSlice";
import store from "./ReduxToolkit/Store";


function App() {
  const user= true;
  const dispatch = useDispatch();
  const {task,auth}= useSelector(store=>store);

  useEffect(()=>{
    dispatch(fetchTask({}));
    dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")));
  },[auth.jwt]);

  return (
    <ThemeProvider theme={darkTheme}>

      {auth.user? <div>
        <Navbar/> 
        <Home/> 
      </div>:<Auth/>}
      
      
     
    </ThemeProvider>
  );
}

export default App;
