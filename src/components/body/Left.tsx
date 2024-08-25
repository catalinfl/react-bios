import React from 'react'
import { Buttons } from '../Top'
import Main from './Main'
import Advanced from './Advanced'
import Power from './Power'
import Boot from './Boot'
import Security from './Security'
import Exit from './Exit'

const Left = ({ buttonSelected }: { buttonSelected: Buttons} ) => {
  return (
    <div className="flex flex-[3] px-3 border-y-[4px] border-l-4 border-[#0000cc]">
      <ComponentForButton buttonSelected={buttonSelected} />       
    </div>
  )
}

const ComponentForButton = ({ buttonSelected }: { buttonSelected: Buttons }) => {
  switch (buttonSelected) {
    case "Main":
      return <Main />
    case "Advanced":
      return <Advanced />
    case "Power":
      return <Power />
    case "Boot":
      return <Boot />
    case "Security":
      return <Security />
    case "Exit":
      return <Exit />
  }
}

export default Left