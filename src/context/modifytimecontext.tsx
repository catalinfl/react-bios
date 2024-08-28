import { createContext, Dispatch, useState } from "react";

export interface ModifyTimeContextType {
    modifiedTime: string | false,
    setModifiedTime: (modifiedTime: string | false) => void
    modifiedDate: string | false,
    setModifiedDate: (modifiedDate: string | false) => void
}

const ModifyTimeContext = createContext<ModifyTimeContextType>({
    modifiedTime: false,
    setModifiedTime: () => {},
    modifiedDate: false,
    setModifiedDate: () => {}
})


const ModifyTimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [modifiedTime, setModifiedTime] = useState<string | false>(false)
    const [modifiedDate, setModifiedDate] = useState<string | false>(false)

    return (
        <ModifyTimeContext.Provider value={{ modifiedTime, setModifiedTime, modifiedDate, setModifiedDate }} >
            {children}
        </ModifyTimeContext.Provider>
    )
}

 
export { ModifyTimeContext, ModifyTimeProvider }


export default ModifyTimeContext
