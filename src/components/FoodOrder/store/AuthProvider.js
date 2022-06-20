import { useReducer } from "react";
import AuthContext from "./auth-context";

/*
const defaultAuthState = {
  isLoggedIn: false,
};
*/
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      //sin el uso de useEffect, el chequeo de esta flag sería infinito
      //la funcion es ejecutada DESPUES que el componente ha sido re-evaluado
      const storeUserLoggedInInfo = localStorage.getItem('isLoggedIn');
      if (storeUserLoggedInInfo === '1') {
        setIsLoggedIn(true);
      }
    }, []);
  
    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };
  
    const loginHandler = () => {
      localStorage.setItem('isLoggedIn', '1');
      setIsLoggedIn(true);
    };
  
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          onLogout: logoutHandler,
          onLogin: loginHandler,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  };
  
export default AuthProvider;
