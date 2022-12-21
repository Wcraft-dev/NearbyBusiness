import reactRefresh from "@vitejs/plugin-react-refresh";
import ViteRadar from "vite-plugin-radar";

export default {
  plugins: [
    reactRefresh(),
    ViteRadar({
      analytics: {
        id: process.env.ANALYTICS,
      },
    }),
  ],
};
