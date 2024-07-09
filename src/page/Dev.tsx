import { TextButton } from "../components/Button";
import { Runway } from "../components/Runway";
export default function Dev() {
    return (
        <div className={`block w-full h-fit overflow-y-scroll p-10`}>
            <div className={`block w-full h-fit my-4`}>
                <p className={`text-text font-semibold text-3xl`}>BUTTON</p>
                <div className={`flex w-full h-fit mt-2`}>
                    <TextButton title="Test" />
                </div>
            </div>
            <div className={`block w-full h-fit my-4`}>
                <p className={`text-text font-semibold text-3xl`}>RUNWAY</p>
                <Runway isFeet={false} length={3500} ident="19R"/>
            </div>
        </div>
    )
}