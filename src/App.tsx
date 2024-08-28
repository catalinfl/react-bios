import { useState } from "react"
import Top, { Buttons } from "./components/Top"
import Body from "./components/Body"
import Footer from "./components/Footer"
import { ModifyProvider } from "./context/ismodifyingcontext"
import { ModifyTimeProvider } from "./context/modifytimecontext"
import { InfoContextProvider } from "./context/infocontext"



function App() {

  const [buttonSelected, setButtonSelected] = useState<Buttons>(Buttons.Main)
   

  return (
    <div className="div overflow-hidden bg-[#0000cc] ">
      <ModifyProvider>
        <ModifyTimeProvider>
          <InfoContextProvider>
            <Top buttonSelected={buttonSelected} setButtonSelected={setButtonSelected} />
            <Body buttonSelected={buttonSelected} />
            <Footer />
          </InfoContextProvider>
        </ModifyTimeProvider>
      </ModifyProvider>
    </div>
  )
}

export default App
