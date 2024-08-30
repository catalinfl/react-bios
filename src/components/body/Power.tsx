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


type PowerProps = ComponentPropsToBePassed<PowerOptions, PowerKeyTypeMap>

const Power = () => {

  const f: PowerOptions = {
    poweroption: "Use Power",
    power2: "Restart Power"
  }

  const v: PowerKeyTypeMap = {
    poweroption: 2,
    power2: true
  }



  return (
    <LeftComponent <PowerProps> data={{ fields: f, values: v }} componentType='power' />
  )
}

export default Power