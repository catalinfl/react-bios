import { useState } from "react"
import Top, { Buttons } from "./components/Top"
import Body from "./components/Body"
import Footer from "./components/Footer"



function App() {

  const [buttonSelected, setButtonSelected] = useState<Buttons>(Buttons.Main)

  return (
    <div className="div overflow-hidden bg-[#0000cc] ">
      <Top buttonSelected={buttonSelected} setButtonSelected={setButtonSelected}/>
      <Body buttonSelected={buttonSelected}/>
      <Footer />
    </div>
  )
}

export default App
