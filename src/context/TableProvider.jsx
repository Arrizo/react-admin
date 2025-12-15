import { useContext, createContext } from 'react'
const TableContext = createContext()
export const TableProvider = (config) => {
    return (<TableContext.Provider value={{ ...config }} >
        {config.children}
    </TableContext.Provider>)

}
export const useTable = () => useContext(TableContext)