import React, { createContext, useContext } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { AuthContext } from "./AuthContext";
import * as SecureStore from "expo-secure-store";

const AxiosContext = createContext();
const { Provider } = AxiosContext;
const baseURL = "https://www.tryandreview.com";
// const baseURL = 'https://preprod.tryandreview.com';
const iterableMobileAPIKey = "5947d784fa984ac1bb1fd5c7bff4b0af";
//const iterableMobileAPIKey = 'b9b6f02374a84662b4ee198d2add65bc' //Sandbox Iterable API

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

const AxiosProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: `${baseURL}/api`,
  });

  const saasAxios = axios.create({
    baseURL: `${baseURL}/api`,
  });
  console.log("${baseURL}/api", `${baseURL}/api`);
  const publicAxios = axios.create({
    baseURL: `${baseURL}/api`,
  });

  const googleAxios = axios.create({
  });

  const facebookAxios = axios.create({
    baseURL: "https://graph.facebook.com/v16.0",
  });

  const iterableAxios = axios.create({
    baseURL: "https://api.iterable.com/api",
  });

  {
    console.log("authContext.getAccessToken()", authContext.getAccessToken());
  }

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  saasAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer a2ab3ffd2247b6ddb8d376156140b2be`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  refreshAccessToken = () => {
    return publicAxios.post("/app/token/refresh", {
      refresh_token: authContext.getRefreshToken(),
    });
  };

  // temporary work around
  reLogin = () => {
    return publicAxios.post("/app/login", authContext.getUserCreds());
  };

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const config = error.config;
      if (error.response?.status === 401 && !config._retry) {
        console.log("token expired detected", error?.response);
        config._retry = true;

        try {
          const refresh_response = await publicAxios.post(
            "/app/token/refresh",
            { refresh_token: authContext.getRefreshToken() }
          );
          console.log("refresh_response", refresh_response);
          if (refresh_response.status == 200) {
            const data = refresh_response.data;
            // console.log('data here', data)
            // console.log(authContext.authState?.pushToken)
            authContext.setAuthState({
              accessToken: data.token,
              userData: null,
              refreshToken: data.refresh_token,
              authenticated: null,
              pushToken: authContext.authState?.pushToken,
              // username: authContext.getUserCreds()?.username,
              // password: authContext.getUserCreds()?.password
            });

            save(
              "tnr_client_token",
              JSON.stringify({
                accessToken: data.token,
                refreshToken: data.refresh_token,
                // username: authContext.getUserCreds()?.username,
                // password: authContext.getUserCreds()?.password
              })
            );

            config.headers = {
              ...config.headers,
              authorization: `Bearer ${data.token}`,
            };

            return authAxios(config);
          } else {
            // Alert.alert('Session Expired!', 'Please login again.');
            // authContext.logout()
          }
        } catch (error) {
          console.log("errorcatch---------------------------->", error);
          // console.log('error response refresh token', error.response)
          // Alert.alert('Session Expired!', 'Please login again.');
          authContext.logout();
        }
      }

      return Promise.reject(error);
    }
  );

  publicAxios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  googleAxios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  facebookAxios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  iterableAxios.defaults.headers.common["Api-Key"] = iterableMobileAPIKey;
  iterableAxios?.interceptors?.request?.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const baseAPI = () => {
    return `${baseURL}/api`;
  };

  const webUrl = () => {
    return "https://www.tryandreview.com";
  };

  return (
    <Provider
      value={{
        webUrl,
        baseAPI,
        authAxios,
        publicAxios,
        googleAxios,
        facebookAxios,
        iterableAxios,
        iterableMobileAPIKey,
        saasAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
