import { useContext, useEffect, useState } from "react";
import { ComponentPropsToBePassed, LeftComponentKeys } from "../body/Advanced";
import ModifyContext from "../../context/ismodifyingcontext"

type ComponentTypes = "advanced" | "power" | "boot" | "security" | "exit"


export interface LeftComponentProps<T extends ComponentPropsToBePassed<any, any, any>> {
    data: T;
    componentType: ComponentTypes;
}


const LeftComponent = <T extends ComponentPropsToBePassed<any, any, any>>({ data, componentType }: LeftComponentProps<T>) => {

    const optionsToSelect = Object.values(data.fields) as string[]
    optionsToSelect.unshift("0")

    const [option, setOption] = useState<number>(0)
    const { isModifying, setIsModifying } = useContext(ModifyContext)
    const [dataValues, setDataValues] = useState<LeftComponentKeys<any, any>>(data.values)
    const [tempValue, setTempValue] = useState<any>(null)



    
    const handleChangeOption = (e: KeyboardEvent) => {
        
        const key = Object.keys(data.fields)[option - 1]
        const value = dataValues[key]
        const variants = data.varriants[key]
        
        if (e.key === "ArrowDown" && option < optionsToSelect.length - 1) {
            if (isModifying) {
                if (typeof value === "boolean") {
                    handleChangeDataValues(option, !dataValues[Object.keys(data.fields)[option - 1]])
                } else if (typeof value === "number") {
                    handleChangeDataValues(option, dataValues[Object.keys(data.fields)[option - 1]] - 1)
                } else if (Array.isArray(variants)) {
                    const currentIndex = variants.indexOf(dataValues[Object.keys(data.fields)[option - 1]])
                    const nextIndex = (currentIndex + 1) % variants.length
                    handleChangeDataValues(option, variants[nextIndex])
                }
                return
            } else {
                setOption(option + 1)
            }
            return
        }
        if (e.key === "ArrowUp" && option > 0) {
            if (isModifying) {
                if (typeof dataValues[Object.keys(data.fields)[option - 1]] === "boolean") {
                    handleChangeDataValues(option, !dataValues[Object.keys(data.fields)[option - 1]])
                }
                if (typeof dataValues[Object.keys(data.fields)[option - 1]] === "number") {
                    handleChangeDataValues(option, dataValues[Object.keys(data.fields)[option - 1]] + 1)
                }
                return                
            } else {
                setOption(option - 1)
            }
            return
        }
        if (e.key === "Enter" && option !== 0) {
            if (!isModifying) {
                setIsModifying(true)
                setTempValue(dataValues[Object.keys(data.fields)[option - 1]])
                return
            } else {
                setIsModifying(false)
                return
            }
        }
        if (e.key === "Escape") {
            setDataValues((prev) => {
                return {
                    ...prev,
                    [Object.keys(data.fields)[option - 1]]: tempValue
                }
            })
            setIsModifying(false)
            return
        }
    }




    useEffect(() => {
        window.addEventListener("keydown", handleChangeOption)
        return () => { window.removeEventListener("keydown", handleChangeOption) }
    }, [option, isModifying, dataValues, tempValue])

    const handleChangeDataValues = (option: number, value: any) => {
        const key = Object.keys(data.fields)[option - 1]

        console.log(option, value)
        if (typeof value === "boolean") {
            setDataValues((prev) => {
                return {
                    ...prev,
                    [key]: value
                }
            })
            return
        }

        if (typeof value === "number") {
            if (value < 0) {
                setDataValues((prev) => {
                    return {
                        ...prev,
                        [key]: 0
                    }
                })

                return
            }

            setDataValues((prev) => {
                return {
                    ...prev,
                    [key]: value
                }
            })
            return
        }

    }




    return (
        <div className="text-3xl">
            {Object.keys(data.fields).map((key, index) => {
                return (
                    <div key={key} className={`${index !== 0 ? "mt-[-10px]" : null} ${index === option - 1 ? "text-white" : "text-[#0000cc]" }`}>
                        {data.fields[key]} : {String(dataValues[key])}
                    </div>
                )
            })}
        </div>
    )
}

export default LeftComponent


