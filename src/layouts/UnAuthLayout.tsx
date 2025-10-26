import type React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const UnAuthLayout: React.FC = () => {

    useEffect(()=>{
        
    }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default UnAuthLayout;