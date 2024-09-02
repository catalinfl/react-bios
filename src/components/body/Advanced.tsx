import LeftComponent from "../multiple/LeftComponent"

export type LeftComponentKeys<T, K> = { [P in keyof T]: P extends keyof K ? K[P] : never }

export interface ComponentPropsToBePassed<T, K, V> {
  fields: T;
  values: LeftComponentKeys<T, K>;
  varriants: LeftComponentKeys<T, V>
}

type AdvancedOptions = {
    domoption: "Use DOM";
    dom2: "Restart DOM";
}

type AdvancedKeyTypeMap = {
    domoption: string;
    dom2: boolean;
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

  
  const r: LeftComponentKeys<AdvancedOptions, AdvancedVarriants> = {
    domoption: ["Use DOM", "Restart DOM", "Test DOM"],
    dom2: null
  }
  
  const t: LeftComponentKeys<AdvancedOptions, AdvancedKeyTypeMap> = {
    domoption: r.domoption[0],
    dom2: true
  }

  return (
    <LeftComponent <AdvancedProps> data={{ fields: v, values: t, varriants: r }} />
  )
}

export default Advanced