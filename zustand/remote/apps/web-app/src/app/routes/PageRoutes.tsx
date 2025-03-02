import { Routes, Route } from 'react-router-dom'
import Counter from '../../components/webApp/Counter'

export const WEB_APP_PATH = '/web/counter'

const PageRoutes = () => (
  <Routes>
    <Route path={WEB_APP_PATH} element={<Counter />} />
    <Route path="*" element={<Counter />} />
  </Routes>
)

export default PageRoutes
