interface RunwayProps {
    ident: string,
    length: number,
    isFeet: boolean | false
}

export const Runway = ({ ident, length, isFeet }: RunwayProps) => {
    return (
        <div className={`flex flex-col items-center w-[200px] h-full bg-black`}>
            <div className={`flex flex-col justify-around w-full h-fit items-center`}>
                <div className={`w-[8px] h-[100px] bg-white my-4`}></div>
                <div className={`w-[8px] h-[100px] bg-white my-4`}></div>
                <div className={`w-[8px] h-[100px] bg-white my-4`}></div>
                <div className={`w-[8px] h-[100px] bg-white my-4`}></div>
                <p className={`text-text -rotate-90 text-4xl my-12`}>{length || '0'}{isFeet ? `FT` : `M`}</p>
                <div className={`w-[8px] h-[100px] bg-white my-4`}></div>
                <div className={`w-[8px] h-[100px] bg-white my-4`}></div>
                <div className={`w-[8px] h-[100px] bg-white my-4`}></div>
                <div className={`w-[8px] h-[100px] bg-white my-4`}></div>
            </div>
            <p className={`text-text text-[50px]`}>{ident || `00`}</p>
            <div className={`flex justify-around w-full h-fit mt-2`}>
                <div className={`flex w-full justify-around mr-1`}>
                    <div className={`w-[8px] h-[100px] bg-white`}></div>
                    <div className={`w-[8px] h-[100px] bg-white`}></div>
                    <div className={`w-[8px] h-[100px] bg-white`}></div>
                    <div className={`w-[8px] h-[100px] bg-white`}></div>
                    <div className={`w-[8px] h-[100px] bg-white`}></div>
                    <div className={`w-[8px] h-[100px] bg-white`}></div>
                </div>
                <div className={`flex w-full justify-around ml-1`}>
                    <div className={`w-[8px] h-[100px] bg-white`}></div>
                    <div className={`w-[8px] h-[100px] bg-white`}></div>
                    <div className={`w-[8px] h-[100px] bg-white`}></div>
                    <div className={`w-[8px] h-[100px] bg-white`}></div>
                    <div className={`w-[8px] h-[100px] bg-white`}></div>
                    <div className={`w-[8px] h-[100px] bg-white`}></div>
                </div>
            </div>
        </div>
    )
}