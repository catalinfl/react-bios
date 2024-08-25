import { useEffect, useState } from 'react'
import Menu from './top/Menu'
import UpperTitle from './top/UpperTitle'

export enum Buttons {
  Main = "Main",
  Advanced = "Advanced",
  Power = "Power",
  Boot = "Boot",
  Security = "Security",
  Exit = "Exit"
}

interface TopProps {
  buttonSelected: Buttons
  setButtonSelected: (button: Buttons) => void
}

const Top = ({ buttonSelected, setButtonSelected }: TopProps) => {


  const buttonOrder = [
    Buttons.Main,
    Buttons.Advanced,
    Buttons.Power,
    Buttons.Boot,
    Buttons.Security,
    Buttons.Exit
  ]

  const getNextButton = (currentButton: Buttons, direction: "left" | "right"): Buttons => {
    if (direction === "left") {
      const currentIndex = buttonOrder.indexOf(currentButton)
      const previousIndex = currentIndex - 1
      if (previousIndex === -1) {
        return buttonOrder[0]
      }
      return buttonOrder[previousIndex]
    } else {
        const currentIndex = buttonOrder.indexOf(currentButton)
        const nextIndex = currentIndex + 1
        if (nextIndex === buttonOrder.length) {
          return buttonOrder[buttonOrder.length - 1]
        }
        return buttonOrder[nextIndex]      
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      setButtonSelected(getNextButton(buttonSelected, "right"))
    } else if (event.key === "ArrowLeft") {
      setButtonSelected(getNextButton(buttonSelected, "left"))
    } else if (event.key === "Tab") {
      console.log("tab")
    } else if (event.key === "F2") {
      console.log("F2")
    } else if (event.key === "F10") {
      console.log("F10")
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [buttonSelected])

  


  return (
    <div className="bg-[#0000cc]">
      <UpperTitle />
      <Menu buttonSelected={buttonSelected}/>
    </div>
  )
}

export default Top