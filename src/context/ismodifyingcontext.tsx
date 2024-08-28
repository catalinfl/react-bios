import { createContext, useState } from "react";

interface ModifyContextType {
    isModifying: boolean,
    setIsModifying: (isModifying: boolean) => void
}

const ModifyContext = createContext<ModifyContextType>({
    isModifying: false,
    setIsModifying: () => {}
})

const ModifyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isModifying, setIsModifying] = useState(false)

    return (
        <ModifyContext.Provider value={{ isModifying, setIsModifying }}>
            {children}
        </ModifyContext.Provider>
    )
}


export { ModifyContext, ModifyProvider }

export default ModifyContext