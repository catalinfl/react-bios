import Controls from './body/Controls'
import Left from './body/Left'
import { Buttons } from './Top'

interface BodyComponent {
  buttonSelected: Buttons
}

const Body = ({ buttonSelected }: BodyComponent) => {
  return (
    <div className="flex flex-row p-3 h-[50%] md:h-[82.5%] lg:h-[85%] xl:h-[91%] 2xl:h-[91.2%] bg-[#b3b3b3]"> 
      <Left buttonSelected={buttonSelected}/>
      <Controls />
    </div>
    
  )
}

export default Body