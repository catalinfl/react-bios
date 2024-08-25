

type MenuProps = {
    buttonSelected: string
}


const Menu = ({buttonSelected}: MenuProps) => {

    const buttons = ["Main", "Advanced", "Power", "Boot", "Security", "Exit"]


  return (
    <div className="flex ml-12 flex-row gap-12 text-[#b3b3b3] text-2xl">
        {buttons.map((button, index) => (
            <div key={index}
                className={`${buttonSelected === button ? "bg-[#b3b3b3] text-[#0000cc]" : ""} px-[1px]`}>
                    {button}
            </div>
        ))}
    </div>
  )
}

export default Menu