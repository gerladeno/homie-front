import * as React from 'react';
import TokenContext from './utils/context';
import Navigate from './screens/Navigate';
import { GetToken } from './utils/authCheck';


export default function App() {
  const [currentToken, onChangeToken] = React.useState("")
  React.useEffect(()=>{
    getToken()
  })

  const getToken = async() =>{
    const t = await GetToken()
    console.log("Get token from store")
    onChangeToken(t)
  }
  console.log("App, currToken:", currentToken)
  return (
    <TokenContext.Provider value={{ currentToken, onChangeToken }}>
      <Navigate />
    </TokenContext.Provider>
  )
}