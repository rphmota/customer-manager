// Router.tsx
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AppContextProvider } from './modules/global/context/root'
import { PrivadoLayout } from './modules/global/layout/'
import { LoginPage } from './modules/login/login-page.tsx'

const Home = lazy(() => import('./modules/customer/pages/customers/home.tsx'))

export function Router() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginPage />
              </Suspense>
            }
          />

          <Route element={<PrivadoLayout />}>
            <Route
              path="/home"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/customer"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  )
}
