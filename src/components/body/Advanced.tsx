import LeftComponent from "../multiple/LeftComponent"

export type AdvancedOptions = {
    domoption: "Use DOM";
    dom2: "Restart DOM";
}




export type AdvancedKeys = [ keyof AdvancedOptions ]




const Advanced = () => {

  const t: AdvancedKeys = ["domoption", "dom2"]

  return (
    <LeftComponent <AdvancedOptions> data={{ domoption: "Use DOM", dom2: "Restart DOM" }} componentType="advanced" />
  )
}

export default Advanced