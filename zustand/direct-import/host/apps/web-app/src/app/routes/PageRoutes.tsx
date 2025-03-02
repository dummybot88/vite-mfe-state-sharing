import { Routes, Route } from "react-router-dom";
import HostCounter from "../../components/webApp/HostCounter";

export const WEB_APP_PATH = "/web/host";

const PageRoutes = () => (
  <Routes>
    <Route path={WEB_APP_PATH} element={<HostCounter />} />
    <Route path="*" element={<HostCounter />} />
  </Routes>
);

export default PageRoutes;
