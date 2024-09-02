import LeftComponent from '../multiple/LeftComponent';

type ExitOptions = {
  foo: "Foo";
  bar: "Bar";
}

type ExitKeyTypeMap = {
  foo: string;
  bar: boolean;
}

type ExitVarriants = {
  foo: string[],
  bar: null
}

type ExitProps = {
  fields: ExitOptions;
  values: ExitKeyTypeMap;
  varriants: ExitVarriants
}

const Exit = () => {


  const f: ExitOptions = {
    foo: "Foo",
    bar: "Bar"
  }

  const v: ExitKeyTypeMap = {
    foo: "Foo",
    bar: true
  }

  const varriants: ExitVarriants = {
    foo: ["Foo", "Bar", "Test"],
    bar: null
  }

  return (
    <LeftComponent <ExitProps> data={{ fields: f, values: v, varriants }} />
  )
}

export default Exit