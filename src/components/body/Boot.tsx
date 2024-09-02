import LeftComponent from "../multiple/LeftComponent";

type BootOptions = {
  foo: "Foo";
  bar: "Bar";
}

type BootKeyTypeMap = {
  foo: string;
  bar: boolean;
}

type BootVarriants = {
  foo: string[],
  bar: null
}

type BootProps = {
  fields: BootOptions;
  values: BootKeyTypeMap;
  varriants: BootVarriants
}

const Boot = () => {


  const f: BootOptions = {
    foo: "Foo",
    bar: "Bar"
  }

  const v: BootKeyTypeMap = {
    foo: "Foo",
    bar: true
  }

  const varriants: BootVarriants = {
    foo: ["Foo", "Bar", "Test"],
    bar: null
  }

  return (
    <LeftComponent <BootProps> data={{ fields: f, values: v, varriants }} />
  )
}

export default Boot