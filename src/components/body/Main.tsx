import { useEffect, useState } from 'react'
import moment from 'moment'


enum MainEnum {
    NONE,
    SYSTEM_TIME,
    SYSTEM_DATE
}

type MainOptions = "system_time" | "system_date"


const Main = () => {
    
    const [selectOption, setSelectOption] = useState(MainEnum.NONE)
    const [mainOption, setMainOption] = useState<MainOptions | false>(false)
    const [isModifying, setIsModifying] = useState<MainOptions | false>(false)

    const maxOptionsForMain = 2

    const handleKeyDown = (e: KeyboardEvent) => {
        handleArrows(e)
        handlePressEnter(e)
    }


    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown) 

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [selectOption, isModifying])


    const [currentTime, setCurrentTime] = useState(moment().format("HH:mm:ss"))
    const [currentDate, setCurrentDate] = useState(moment().format('ddd MM/DD/YYYY'))


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment().format('HH:mm:ss'))

            if (currentTime === '00:00:00') {
                setCurrentDate(moment().format('ddd MM/DD/YYYY'))
            }

        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const handlePressEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            if (selectOption === MainEnum.SYSTEM_TIME) {
                setMainOption("system_time")
                setIsModifying("system_time")
                return
            } else if (selectOption === MainEnum.SYSTEM_DATE) {
                setMainOption("system_date")
                setIsModifying("system_date")
                return
        }
        }
    }
    
    const handleArrows = (e: KeyboardEvent) => {
        
        if (e.key === "ArrowDown") {
            if (isModifying) {
                return
            }
            if (selectOption < maxOptionsForMain) {
                setSelectOption(selectOption + 1)
            }
        } else if (e.key === "ArrowUp") {
            if (isModifying) {
                return
            }
            if (selectOption > 0) {
                setSelectOption(selectOption - 1)
            }
        } 
    }

    console.log(mainOption)

    return (
        <div className="flex flex-row w-full">
            <div className="flex flex-col flex-1">
                <p className="text-gray-500 text-3xl mb-[-10px]"> BIOS Version&nbsp;&nbsp;&nbsp;&nbsp;: </p>
                <p className="text-gray-500 text-3xl"> BIOS Build Date : </p>
                <p className="text-gray-500 text-3xl mt-12"> System Memory&nbsp;&nbsp;&nbsp;: </p>
                <p className={`${selectOption === MainEnum.SYSTEM_TIME ? 'text-white' : 'text-[#0000cc]'} text-3xl mt-12 mb-[-10px]`}> System Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
                <p className={`${selectOption === MainEnum.SYSTEM_DATE ? 'text-white' : 'text-[#0000cc]'} text-3xl`}> System Date </p>
            </div>
            <div className="flex flex-col flex-1">
                <p className="text-gray-500 text-3xl mb-[-10px]"> 08.00.02 </p>
                <p className="text-gray-500 text-3xl"> 02/22/06 </p>
                <p className="text-gray-500 text-3xl mt-12"> 1108MB </p>
                <p className="text-[#0000cc] text-3xl mt-12 mb-[-10px]"> [{currentTime}] </p>
                <p className="text-[#0000cc] text-3xl"> [{currentDate}]_ </p>
            </div>

        </div>

  )
}

export default Main