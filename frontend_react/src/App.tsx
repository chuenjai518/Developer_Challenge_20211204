import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { MainPage } from './pages/MainPage'

import './App.css'

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <MainPage />
    </ChakraProvider>
  )
}

export default App
