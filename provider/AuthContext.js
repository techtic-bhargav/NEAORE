//AuthContext.js
import React, { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const dispatchAction = useDispatch();
  const [appUpdate, setAppUpdate] = useState(false);
  const [authState, setAuthState] = useState({
    accessToken: null,
    userData: null,
    refreshToken: null,
    authenticated: null,
    username: null,
    password: null,
    pushToken: null,
  });

  const logout = async () => {
    // await SecureStore.deleteItemAsync('token')
    await SecureStore.deleteItemAsync("tnr_client_token");
    await SecureStore.deleteItemAsync("tnr_client_root");

    setAuthState({
      accessToken: null,
      userData: null,
      refreshToken: null,
      authenticated: false,
      username: null,
      password: null,
      pushToken: null,
    });

    dispatchAction({ type: "RESET_AUTH_INITIAL_STATE" });
    dispatchAction({ type: "RESET_LANG_STATE" });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const getRefreshToken = () => {
    return authState.refreshToken;
  };

  const getUser = () => {
    return authState.userData;
  };

  const getUserCreds = () => {
    return {
      username: authState.username,
      password: authState.password,
    };
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        getRefreshToken,
        getUser,
        setAuthState,
        logout,
        getUserCreds,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
