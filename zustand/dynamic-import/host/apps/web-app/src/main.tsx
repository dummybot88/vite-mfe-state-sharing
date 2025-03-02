import ReactDOM from 'react-dom/client'
import './scss/main.scss'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api/reactQueryClient.ts'
import { BrowserRouter } from 'react-router-dom'
import PageRoutes from './app/routes/PageRoutes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <PageRoutes />
    </QueryClientProvider>
  </BrowserRouter>
)
