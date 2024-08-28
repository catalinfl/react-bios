import { createContext, useState } from "react";

type InfoContextType = {
    info: string,
    setInfo: (info: string) => void
}


const InfoContext = createContext<InfoContextType>({
    info: "",
    setInfo: () => {}
});

const InfoContextProvider: React.FC<{ children: React.ReactNode }> = ( { children} ) => {
    
    const [info, setInfo] = useState("")
    
    return (
        <InfoContext.Provider value={{ info, setInfo }}>
            {children}
        </InfoContext.Provider>
    )
}


export { InfoContext, InfoContextProvider }

export default InfoContext