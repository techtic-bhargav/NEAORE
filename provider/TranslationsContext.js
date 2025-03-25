import React, { createContext, useContext, useState } from "react";
import { I18n } from "i18n-js";
import en from "../locales/en";
import id from "../locales/id";
import vn from "../locales/vn";
import th from "../locales/th";
import hk from "../locales/hk";
import au from "../locales/au";
import ind from "../locales/in";
import ph from "../locales/ph";
import my from "../locales/my";
import nz from "../locales/nz";
import hken from "../locales/hk-en";
import myen from "../locales/my-en";
import br from "../locales/br";
import za from "../locales/za";
import uk from "../locales/uk";
import aeen from "../locales/ae-en";
import saen from "../locales/sa-en";
import sp from "../locales/sp";
import de from "../locales/de";

const translations = {
  en: en,
  id: id,
  vn: vn,
  th: th,
  hk: hk,
  au: au,
  in: ind,
  ph: ph,
  my: my,
  nz: nz,
  hken: hken,
  myen: myen,
  br: br,
  za: za,
  uk: uk,
  aeen: aeen,
  saen: saen,
  es: sp,
  de: de,
};
const i18n = new I18n(translations);
i18n.locale = "en";
i18n.enableFallback = true;

const TranslationsContext = createContext();
const { Provider } = TranslationsContext;

const TranslationsProvider = ({ children }) => {
  const [locale, setLocale] = useState(i18n.locale);

  const changeLocale = (newLocale) => {
    i18n.locale = newLocale;
    setLocale(newLocale);
  };

  const getLocale = () => {
    return locale;
  };

  return (
    <Provider
      value={{
        i18n,
        locale,
        getLocale,
        changeLocale,
      }}
    >
      {children}
    </Provider>
  );
};

export { TranslationsContext, TranslationsProvider };
