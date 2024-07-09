import { FaChevronRight } from "react-icons/fa6"

interface TextButton {
    title: string
    details?: string
    isClose?: boolean
    onClick?: () => void
    className: string
    disable?: boolean
    isFirst?: boolean
    isLast?: boolean
}

export const TextButton = ({ title, onClick, className, disable }: TextButton) => {
    return (
        <button
            className={`flex w-fit h-fit rounded-lg justify-center items-center transition-all duration-200 bg-button border-button-border border-[2px] ${disable ? `` : `hover:bg-button-hover hover:border-button-border-hover`} ${className}`}
            onClick={onClick}
            disabled={disable}
        >
            <p className={`text-semibold uppercase text-text mt-0.5`}>{title}</p>
        </button>
    )
}

export const NumpadButton = ({ title, onClick, className, disable }: TextButton) => {
    return (
        <button
            className={`flex rounded-lg justify-center items-center transition-all duration-200 bg-button border-button-border border-[2px] ${disable ? `` : `hover:bg-button-hover hover:border-button-border-hover`} ${className}`}
            onClick={onClick}
            disabled={disable}
        >
            <p className={`text-semibold uppercase text-text mt-0.5`}>{title}</p>
        </button>
    )
}

export const FillButton = ({ title, details, onClick, isClose, className, isFirst, isLast, disable }: TextButton) => {
    return (
        <button
            className={`flex w-full h-fit justify-between items-center transition-all duration-200 border-button-border bg-button ${isFirst ? `rounded-t-lg border-y-[2px] border-x-[2px]` : `${isLast ? `rounded-b-lg border-x-[2px] border-b-[2px]` : `border-x-[2px] border-b-[2px]`}`} ${disable ? `` : `hover:bg-button-hover`} ${className}`}
            onClick={onClick}
            disabled={disable}
        >
            <p className={`text-semibold uppercase text-text mt-0.5`}>{title}</p>
            <div className={`flex w-fit h-full items-center`}>
                <p className={`text-semibold uppercase text-text mt-0.5`}>{details}</p>
                <FaChevronRight  className={`text-text ml-2 transition-all duration-200 ${!isClose ? `rotate-0` : `rotate-180`}`}/>
            </div>
        </button>
    )
}
