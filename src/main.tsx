import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { store, persistor } from './app/store'
import { ThemeContextProvider } from './theme/ThemeContextProvider'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeContextProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <App />
          </LocalizationProvider>
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
