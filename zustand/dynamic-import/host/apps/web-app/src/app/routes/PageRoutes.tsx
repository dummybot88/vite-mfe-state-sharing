import { Routes, Route } from 'react-router-dom'
import HostCounter from '../../components/webApp/HostCounter'
import HostCounterTwo from '../../components/webApp/HostCounterTwo'

export const WEB_APP_PATH = '/web/host/counter'

const PageRoutes = () => (
  <Routes>
    <Route path={WEB_APP_PATH} element={<HostCounter />} />
    <Route path="part2" element={<HostCounterTwo />} />
    <Route path="*" element={<HostCounter />} />
  </Routes>
)

export default PageRoutes
