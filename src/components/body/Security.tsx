import LeftComponent from '../multiple/LeftComponent';

type SecurityOptions = {
  foo: "Foo";
  bar: "Bar";
}

type SecurityKeyTypeMap = {
  foo: string;
  bar: boolean;
}

type SecurityVarriants = {
  foo: string[],
  bar: null
}

type SecurityProps = {
  fields: SecurityOptions;
  values: SecurityKeyTypeMap;
  varriants: SecurityVarriants
}

const Security = () => {


  const f: SecurityOptions = {
    foo: "Foo",
    bar: "Bar"
  }

  const v: SecurityKeyTypeMap = {
    foo: "Foo",
    bar: true
  }

  const varriants: SecurityVarriants = {
    foo: ["Foo", "Bar", "Test"],
    bar: null
  }

  return (
    <LeftComponent <SecurityProps> data={{ fields: f, values: v, varriants }} />
  )
}


export default Security