interface TextButton {
    title: string
    onClick?: () => void
    className: string
    disable?: boolean
}

export const TextButton = ({ title, onClick, className, disable }: TextButton) => {
    return(
        <button 
            className={`flex w-fit h-fit rounded-lg justify-center items-center transition-all duration-200 bg-button border-button-border border-[2px] ${disable ? `` : `hover:bg-button-hover hover:border-button-border-hover`} ${className}`}
            onClick={onClick} 
            disabled={disable}
        >
            <p className={`text-semibold uppercase text-text mt-0.5`}>{title}</p>
        </button>
    )
}