import React from 'react'

type LimitContext = {}

const Context = React.createContext<LimitContext>({})

export const LimitProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>
}

export const useLimitContext = () => React.useContext(Context) as LimitContext
