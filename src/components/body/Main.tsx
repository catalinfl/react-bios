import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import ModifyContext from '../../context/ismodifyingcontext'
import ModifyTimeContext from '../../context/modifytimecontext'


enum MainEnum {
    NONE,
    SYSTEM_TIME,
    SYSTEM_DATE
}

type MainOptions = "system_time" | "system_date"
type TimeDateOptions = "hours" | "minutes" | "seconds" | false
type SystemDateOptions = "day" | "month" | "year" | false

type TimeObject = {
    [key in Exclude<TimeDateOptions, false>]: number
}

type DateObject = {
    [key in Exclude<SystemDateOptions, false>]: number
}

const Main = () => {
    
    const [selectOption, setSelectOption] = useState(MainEnum.NONE)
    const [currentOption, setCurrentOption] = useState<MainOptions | false>(false)
    const [modifyTime, setModifyTime] = useState<TimeDateOptions>(false)
    const [modifyDate, setModifyDate] = useState<SystemDateOptions>(false)
    const { modifiedTime, setModifiedTime, modifiedDate, setModifiedDate } = useContext(ModifyTimeContext)
    const [currentDate, setCurrentDate] = useState(
        modifiedDate ? moment().date(parseInt(modifiedDate.split("/")[0])).month(parseInt(modifiedDate.split("/")[1]) - 1).year(parseInt(modifiedDate.split("/")[2])).format('ddd DD/MM/YYYY')
        :
        moment().format('ddd DD/MM/YYYY'))

    
    const { isModifying, setIsModifying } = useContext(ModifyContext)
    

    console.log(modifiedDate, "data modificata")
    const [newDate, setNewDate] = useState<DateObject>(modifiedDate ? 
        {
            day: parseInt(modifiedDate.split("/")[0]),
            month: parseInt(modifiedDate.split("/")[1]),
            year: parseInt(modifiedDate.split("/")[2])
        }
        :
        {
            day: currentDate ? parseInt(currentDate.split(" ")[1].split("/")[0]) : moment().date(),
            month: currentDate ? parseInt(currentDate.split(" ")[1].split("/")[1]) : moment().month() + 1,
            year: currentDate ? parseInt(currentDate.split(" ")[1].split("/")[2]) : moment().year()
        }
    )



    const [newTime, setNewTime] = useState<TimeObject>(
        modifiedTime ? 
        {
        hours: parseInt(modifiedTime.split(":")[0]),
        minutes: parseInt(modifiedTime.split(":")[1]),
        seconds: parseInt(modifiedTime.split(":")[2])
        }
        : 
        {
        hours: moment().hours(),
        minutes: moment().minutes(),
        seconds: moment().seconds()
    })







    const maxOptionsForMain = 2

    const handleKeyDown = (e: KeyboardEvent) => {
        handleArrows(e)
        handlePressEnter(e)
        handleEsc(e)
    }


    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown) 

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [selectOption, currentOption, modifyTime, modifyDate, newTime, newDate])



    const [currentTime, setCurrentTime] = useState(modifiedTime ? 
        moment().hours(parseInt(modifiedTime.split(":")[0])).minutes(parseInt(modifiedTime.split(":")[1])).seconds(parseInt(modifiedTime.split(":")[2])).format("HH:mm:ss")
        :
        moment().format("HH:mm:ss"))




    useEffect(() => {
        if (modifyTime === false) {
            const interval = setInterval(() => {
                if (modifiedTime === false) {
                    setCurrentTime(moment().format('HH:mm:ss'));
    
                    // if (moment().format('HH:mm:ss') === '00:00:00') {
                    //     setCurrentDate(moment().format('ddd MM/DD/YYYY'));
                    // }
                } else {
                    const updatedTime = moment()
                        .hours(newTime.hours)
                        .minutes(newTime.minutes)
                        .seconds(newTime.seconds)
                        .add(1, 'seconds')

                    setCurrentTime(updatedTime.format('HH:mm:ss'))

                    if (updatedTime.format('HH:mm:ss') === '00:00:00' && modifiedDate === false) {
                        setCurrentDate(updatedTime.format('ddd MM/DD/YYYY'))
                    }

                    setModifiedTime(updatedTime.format("HH:mm:ss"))
                    // setModifiedDate(updatedTime.format("DD/MM/YYYY"))

                    newTime.hours = updatedTime.hours()
                    newTime.minutes = updatedTime.minutes()
                    newTime.seconds = updatedTime.seconds()
                }
                


            }, 1000);
    
            return () => clearInterval(interval);

        }
    }, [modifyTime, newTime, modifiedTime, modifiedDate, newDate]);

    const handlePressEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            if (selectOption === MainEnum.SYSTEM_TIME) {
                if (isModifying) {
                    setModifiedTime(moment().hours(newTime.hours).minutes(newTime.minutes).seconds(newTime.seconds).format("HH:mm:ss"))
                    setIsModifying(false)
                    setCurrentOption(false)
                    setModifyTime(false)
                    return
                }
                
                setIsModifying(true)
                setCurrentOption("system_time")
                setModifyTime("hours")
                return
            } else if (selectOption === MainEnum.SYSTEM_DATE) {
                if (isModifying) {
                    setIsModifying(false)
                    setCurrentOption(false)
                    setModifiedDate(moment().date(newDate.day).month(newDate.month - 1).year(newDate.year).format("DD/MM/YYYY"))
                    return
                }
                
                // setNewDate({
                //     day: modifiedDate ? parseInt(modifiedDate.split("/")[0]) : moment().date(),
                //     month: modifiedDate ? parseInt(modifiedDate.split("/")[1]) : moment().month() + 1,
                //     year: modifiedDate ? parseInt(modifiedDate.split("/")[2]) : moment().year()
                // })


                setModifyDate("day")
                setIsModifying(true)
                setCurrentOption("system_date")
                
                return
        }
        }
    }

    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            if (modifiedTime && isModifying && currentOption === "system_time") {
                setNewTime({
                    hours: modifiedTime ? parseInt(modifiedTime.split(":")[0]) : moment().hours(),
                    minutes: modifiedTime ? parseInt(modifiedTime.split(":")[1]) : moment().minutes(),
                    seconds: modifiedTime ? parseInt(modifiedTime.split(":")[2]) : moment().seconds()
                })
            } else if (modifiedDate && isModifying && currentOption === "system_date") {
                setNewDate({
                    day: modifiedDate ? parseInt(modifiedDate.split("/")[0]) : moment().date(),
                    month: modifiedDate ? parseInt(modifiedDate.split("/")[1]) : moment().month() + 1,
                    year: modifiedDate ? parseInt(modifiedDate.split("/")[2]) : moment().year()
                })

            }

            setIsModifying(false)
            setCurrentOption(false)
            setModifyTime(false)
        }
    }

    const handleArrows = (e: KeyboardEvent) => {
        if (currentOption === "system_time" && isModifying) {
            if (e.key === "ArrowRight") {
                switch (modifyTime) {
                    case "hours":
                        setModifyTime("minutes");
                        break;
                    case "minutes":
                        setModifyTime("seconds");
                        break;
                    case "seconds":
                        break;
                    default:
                        break;
                }
            }
    
            if (e.key === "ArrowLeft") {
                switch (modifyTime) {
                    case "hours":
                        break;
                    case "minutes":
                        setModifyTime("hours");
                        break;
                    case "seconds":
                        setModifyTime("minutes");
                        break;
                    default:
                        break;
                }
            }
        }
    
        if (currentOption === "system_date" && isModifying) {
            if (e.key === "ArrowRight") {
                switch (modifyDate) {
                    case "day":
                        setModifyDate("month");
                        break;
                    case "month":
                        setModifyDate("year");
                        break;
                    case "year":
                        break;
                    default:
                        break;
                }
            }
    
            if (e.key === "ArrowLeft") {
                switch (modifyDate) {
                    case "day":
                        break;
                    case "month":
                        setModifyDate("day");
                        break;
                    case "year":
                        setModifyDate("month");
                        break;
                    default:
                        break;
                }
            }
        }
    
        if (e.key === "ArrowDown") {
            if (currentOption === "system_time") {
                switch (modifyTime) {
                    case "hours":
                        setNewTime({
                            ...newTime,
                            hours: newTime.hours > 0 ? newTime.hours - 1 : 23
                        });
                        break;
                    case "minutes":
                        setNewTime({
                            ...newTime,
                            minutes: newTime.minutes > 0 ? newTime.minutes - 1 : 59
                        });
                        break;
                    case "seconds":
                        setNewTime({
                            ...newTime,
                            seconds: newTime.seconds > 0 ? newTime.seconds - 1 : 59
                        });
                        break;
                    default:
                        break;
                }
                return;
            }
            if (currentOption === "system_date") {


                switch (modifyDate) {
                    case "day":
                        setNewDate({
                            ...newDate,
                            day: newDate.day > 1 ? newDate.day - 1 : 31
                        });
                        break;
                    case "month":
                        setNewDate({
                            ...newDate,
                            month: newDate.month > 1 ? newDate.month - 1 : 12
                        });
                        break;
                    case "year":
                        setNewDate({
                            ...newDate,
                            year: newDate.year > 2000 ? newDate.year - 1 : 2024
                        });
                        break;
                }
                return;
            }
    
            if (selectOption < maxOptionsForMain) {
                setSelectOption(selectOption + 1);
            }
        } else if (e.key === "ArrowUp") {
            if (currentOption === "system_time") {
                switch (modifyTime) {
                    case "hours":
                        setNewTime({
                            ...newTime,
                            hours: newTime.hours < 23 ? newTime.hours + 1 : 0
                        });
                        break;
                    case "minutes":
                        setNewTime({
                            ...newTime,
                            minutes: newTime.minutes < 59 ? newTime.minutes + 1 : 0
                        });
                        break;
                    case "seconds":
                        setNewTime({
                            ...newTime,
                            seconds: newTime.seconds < 59 ? newTime.seconds + 1 : 0
                        });
                        break;
                    default:
                        break;
                }
                return;
            }
            if (currentOption === "system_date") {
                switch (modifyDate) {
                    case "day":
                        setNewDate({
                            ...newDate,
                            day: newDate.day < 31 ? newDate.day + 1 : 1
                        });
                        break;
                    case "month":
                        setNewDate({
                            ...newDate,
                            month: newDate.month < 12 ? newDate.month + 1 : 1
                        });
                        break;
                    case "year":
                        setNewDate({
                            ...newDate,
                            year: newDate.year < 2024 ? newDate.year + 1 : 2000
                        });
                        break;
                }
                return;
            }
            if (selectOption > 0) {
                setSelectOption(selectOption - 1);
            }
        }
    };

    const getTimeModifiedColour = (time: TimeDateOptions | SystemDateOptions) => {
        if (isModifying && currentOption === "system_time" && modifyTime === time) {
            return "text-white"
        }
        if (isModifying && currentOption === "system_date" && modifyDate === time) {
            return "text-white"
        }
    }

    useEffect(() => {
        if (modifiedTime) {
            setNewTime({
                hours: parseInt(modifiedTime.split(":")[0]),
                minutes: parseInt(modifiedTime.split(":")[1]),
                seconds: parseInt(modifiedTime.split(":")[2])
            })
        }

    }, [modifiedDate])




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
                <p className="text-[#0000cc] text-3xl mt-12 mb-[-10px]"> [{isModifying && currentOption === "system_time" ? (
                    <>
                    <span className={getTimeModifiedColour("hours")}>{moment().hours(newTime.hours).format("HH")}</span>
                    <span>:</span>
                    <span className={getTimeModifiedColour("minutes")}>{moment().minutes(newTime.minutes).format("mm")}</span>
                    <span>:</span>
                    <span className={getTimeModifiedColour("seconds")}>{moment().seconds(newTime.seconds).format("ss")}</span>
                    </>
                ) : currentTime}] </p>
                <p className="text-[#0000cc] text-3xl"> {modifyDate ? (
                    <>
                    <span>{moment().date(newDate.day).month(newDate.month - 1).year(newDate.year).format("ddd")} </span>
                    <span className={getTimeModifiedColour("day")}>{moment().date(newDate.day).format("DD")}</span>
                    <span>/</span>
                    <span className={getTimeModifiedColour("month")}>{moment().month(newDate.month - 1).format("MM")}</span>
                    <span>/</span><span className={getTimeModifiedColour("year")}>{moment().year(newDate.year).format("YYYY")}</span>
                    </>
                ) : currentDate} </p>
            </div>

        </div>

  )
}

export default Main