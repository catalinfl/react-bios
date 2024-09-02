import { ComponentPropsToBePassed } from './Advanced'
import LeftComponent from '../multiple/LeftComponent'

type PowerOptions = {
  poweroption: "Use Power";
  power2: "Restart Power";
}

type PowerKeyTypeMap = {
  poweroption: number;
  power2: boolean;
}

type PowerVarriants = {
  poweroption: null,
  power2: null
}


type PowerProps = ComponentPropsToBePassed<PowerOptions, PowerKeyTypeMap, PowerVarriants>



const Power = () => {

  const f: PowerOptions = {
    poweroption: "Use Power",
    power2: "Restart Power"
  }

  const v: PowerKeyTypeMap = {
    poweroption: 2,
    power2: true
  }

  const varriants: PowerVarriants = {
    poweroption: null,
    power2: null
  }



  return (
    <LeftComponent <PowerProps> data={{ fields: f, values: v, varriants }} />
  )
}

export default Power