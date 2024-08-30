import LeftComponent from "../multiple/LeftComponent"

type AdvancedOptions = {
    domoption: "Use DOM";
    dom2: "Restart DOM";
}

type AdvancedKeyTypeMap = {
    domoption: number;
    dom2: boolean;
}

export type LeftComponentKeys<T, K> = { [P in keyof T]: P extends keyof K ? K[P] : never }


export interface ComponentPropsToBePassed<T, K, V> {
  fields: T;
  values: LeftComponentKeys<T, K>;
  varriants: LeftComponentKeys<T, V>
}

type AdvancedVarriants = {
  domoption: string[],
  dom2: null
}




type AdvancedProps = ComponentPropsToBePassed<AdvancedOptions, AdvancedKeyTypeMap, AdvancedVarriants>



const Advanced = () => {

  const v: AdvancedOptions = {
    domoption: "Use DOM",
    dom2: "Restart DOM"
  }

  const t: LeftComponentKeys<AdvancedOptions, AdvancedKeyTypeMap> = {
    domoption: 3,
    dom2: true
  }

  const r: LeftComponentKeys<AdvancedOptions, AdvancedVarriants> = {
      domoption: ["Use DOM", "Restart DOM"],
      dom2: null
  }


  return (
    <LeftComponent <AdvancedProps> data={{ fields: v, values: t, varriants: r }} componentType="advanced" />
  )
}

export default Advanced