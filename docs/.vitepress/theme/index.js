import DefaultTheme from "vitepress/theme";
import "./custom.css";

export default {
  extends: DefaultTheme,
  async enhanceApp() {
    !import.meta.env.SSR && import("../../components.ts");
  },
};
