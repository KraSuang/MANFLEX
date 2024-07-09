import { TextButton, NumpadButton } from "./Button.tsx"
interface NumpadProps {
    onKeyPress: (key: string) => void;
}
export const Numpad = ({ onKeyPress }: NumpadProps) => {

    const numbtn = [
        { name: '1', action: 1 },
        { name: '2', action: 1 },
        { name: '3', action: 1 },
        { name: '4', action: 1 },
        { name: '5', action: 1 },
        { name: '6', action: 1 },
        { name: '7', action: 1 },
        { name: '8', action: 1 },
        { name: '9', action: 1 },
        { name: 'DEL', action: '' },
        { name: '0', action: 1 },
        { name: 'ENT', action: '' },
    ]

    return(
        <div className={`grid grid-cols-3 gap-4`}>
            {numbtn.map((d, i) => (
                <NumpadButton key={i} className={`w-[62px] h-[62px]`} title={d.name} onClick={() => onKeyPress(d.name)}/>
            ))}
        </div>
    )
}