import "i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import ckb from "./locales/ckb.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "ckb";
    resources: {
      en: typeof en;
      ar: typeof ar;
      ckb: typeof ckb;
    };
  }
}
