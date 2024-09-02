
const Controls = () => {
  return (
    <div className="flex-1 px-3 flex gap-2 text-3xl flex-row items-end text-[#0000cc] border-[#0000cc] border-[4px]">
        <div className="mb-12 ml-2 flex flex-row">
          <div className="flex flex-col items-center font-semibold justify-center">
              <p> &larr;&rarr; </p>
              <p> &uarr;&darr; </p>
              <p> ENTER </p>
              <p> ESC</p>
          </div>
          <div className="flex flex-col ml-5 font-semibold">
              <p>Select Screen</p>
              <p>Change Field / Change Value</p>
              <p>Enter Field / Save field</p>
              <p>Escape field</p>
          </div>
        </div>
    </div>
  )
}

export default Controls