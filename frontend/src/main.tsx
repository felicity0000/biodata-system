import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './AppRoutes.tsx'
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import './global.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <AppRoutes />
    </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
