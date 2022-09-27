// import { AppContext, AppContextProvider } from '../context/AppContext'
import { useContext, useEffect } from 'react'
import { getCurrentUser, setAuthHeader } from '../api/auth'
import AppContextProvider, { AppContext } from '../context/AppContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (

    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>


  )

}

export default MyApp
