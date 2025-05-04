import { useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

let navigate: NavigateFunction;

export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};

export const navigateTo = (path: string) => {
  if (navigate) {
    navigate(path);
  } else {
    console.error("Navigate function is not set");
  }
};

export const NavigateHelper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (navigate) setNavigate(navigate);
  }, [navigate]);

  return null; // Este componente no renderiza nada
};
