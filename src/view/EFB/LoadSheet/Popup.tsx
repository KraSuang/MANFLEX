import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Numpad } from '../../../components/VirtualKeyboard.tsx';
import { FocusField } from '../../../components/Textfield.tsx';
import { setCrew, setPAX, setCARGO } from '../../../redux/slice/performanceSlice.ts';
import { loadData } from '../../../script/loadData.ts';

interface PopupProps {
    setPopup: React.Dispatch<React.SetStateAction<string>>;
}

export const CONFIG_POPUP = () => {
    return (
        <div className="block w-full max-w-[300px] h-fit rounded-lg border-border border-[3px]"></div>
    );
};

export const PAX_POPUP = ({ setPopup }: PopupProps) => {
    const dispatch = useDispatch();
    const data = loadData();

    const [frontDeck, setFrontDeck] = useState<number>(data.performance.loadSheet?.PAX.front || 0);
    const [middleDeck, setMiddleDeck] = useState<number>(data.performance.loadSheet?.PAX.middle || 0);
    const [rearDeck, setRearDeck] = useState<number>(data.performance.loadSheet?.PAX.rear || 0);

    const [activeInput, setActiveInput] = useState<'frontDeck' | 'middleDeck' | 'rearDeck' | null>(null);
    const [focusedInput, setFocusedInput] = useState<'frontDeck' | 'middleDeck' | 'rearDeck' | null>(null);

    const total = frontDeck + middleDeck + rearDeck

    const handleKeyPress = (key: string) => {
        if (activeInput) {
            if (key === 'DEL') {
                // Remove the last character from the active input
                if (activeInput === 'frontDeck') {
                    setFrontDeck(prev => Math.floor(prev / 10));
                } else if (activeInput === 'middleDeck') {
                    setMiddleDeck(prev => Math.floor(prev / 10));
                } else if (activeInput === 'rearDeck') {
                    setRearDeck(prev => Math.floor(prev / 10));
                }
            } else if (key === 'ENT') {
                // Dispatch PAX data to Redux and close the popup
                dispatch(setPAX({
                    front: frontDeck,
                    middle: middleDeck,
                    rear: rearDeck
                }));
                setPopup('INOP');
            } else {
                // Append the key to the active input, limiting to 60
                const numKey = parseInt(key, 10);
                if (!isNaN(numKey)) {
                    if (activeInput === 'frontDeck') {
                        const newValue = frontDeck * 10 + numKey;
                        setFrontDeck(Math.min(newValue, 60));
                    } else if (activeInput === 'middleDeck') {
                        const newValue = middleDeck * 10 + numKey;
                        setMiddleDeck(Math.min(newValue, 60));
                    } else if (activeInput === 'rearDeck') {
                        const newValue = rearDeck * 10 + numKey;
                        setRearDeck(Math.min(newValue, 60));
                    }
                }
            }
        }
    };

    return (
        <div className="block w-full max-w-[400px] h-fit rounded-lg bg-content border-border border-[4px] px-4 py-4">
            <div className="flex w-full h-fit justify-between items-center px-1">
                <p className="text-text text-xl">PAX</p>
                <p className="text-text text-md">TOTAL {total || 0}</p>
            </div>
            <div className="block w-full h-fit mb-4">
                <FocusField
                    type="text"
                    value={`${String(frontDeck)}/60`}
                    onFocus={() => { setActiveInput('frontDeck'); setFocusedInput('frontDeck'); }}
                    label="Front Deck"
                    isFocus={focusedInput === 'frontDeck'}
                />
                <FocusField
                    type="text"
                    value={`${String(middleDeck)}/60`}
                    onFocus={() => { setActiveInput('middleDeck'); setFocusedInput('middleDeck'); }}
                    label="Middle Deck"
                    isFocus={focusedInput === 'middleDeck'}
                />
                <FocusField
                    type="text"
                    value={`${String(rearDeck)}/60`}
                    onFocus={() => { setActiveInput('rearDeck'); setFocusedInput('rearDeck'); }}
                    label="Rear Deck"
                    isFocus={focusedInput === 'rearDeck'}
                />
            </div>
            <div className="flex w-full h-fit items-center justify-center">
                <div className="block w-fit h-fit">
                    <Numpad onKeyPress={handleKeyPress} />
                </div>
            </div>
        </div>
    );
};

export const CARGO_POPUP = ({ setPopup }: PopupProps) => {
    const dispatch = useDispatch();
    const data = loadData();

    const [frontDeck, setFrontDeck] = useState<number>(data.performance.loadSheet?.CARGO.front || 0);
    const [middleDeck, setMiddleDeck] = useState<number>(data.performance.loadSheet?.CARGO.middle || 0);
    const [rearDeck, setRearDeck] = useState<number>(data.performance.loadSheet?.CARGO.rear || 0);

    const [activeInput, setActiveInput] = useState<'frontDeck' | 'middleDeck' | 'rearDeck' | null>(null);
    const [focusedInput, setFocusedInput] = useState<'frontDeck' | 'middleDeck' | 'rearDeck' | null>(null);

    const total = frontDeck + middleDeck + rearDeck

    const handleKeyPress = (key: string) => {
        if (activeInput) {
            if (key === 'DEL') {
                // Remove the last character from the active input
                if (activeInput === 'frontDeck') {
                    setFrontDeck(Number(String(frontDeck).slice(0, -1)));
                } else if (activeInput === 'middleDeck') {
                    setMiddleDeck(Number(String(middleDeck).slice(0, -1)));
                } else {
                    setRearDeck(Number(String(rearDeck).slice(0, -1)));
                }
            } else if (key === 'ENT') {
                dispatch(setCARGO({
                    front: Number(frontDeck),
                    middle: Number(middleDeck),
                    rear: Number(rearDeck)
                }));
                setPopup('INOP');
            } else {
                if (activeInput === 'frontDeck') {
                    setFrontDeck(Number(String(frontDeck + key)));
                } else if (activeInput === 'middleDeck') {
                    setMiddleDeck(Number(String(middleDeck + key)));
                } else {
                    setRearDeck(Number(String(rearDeck + key)));
                }
            }
        }
    };

    return (
        <div className="block w-full max-w-[400px] h-fit rounded-lg bg-content border-border border-[4px] px-4 py-4">
            <div className="flex w-full h-fit justify-between items-center px-1">
                <p className="text-text text-xl">CARGO</p>
                <p className="text-text text-md">TOTAL {total || 0} KG</p>
            </div>
            <div className="block w-full h-fit mb-4">
                <FocusField
                    type="text"
                    value={`${String(frontDeck)}`}
                    onFocus={() => { setActiveInput('frontDeck'); setFocusedInput('frontDeck'); }}
                    label="TOTAL KG"
                    isFocus={focusedInput === 'frontDeck'}
                />
                {/* <FocusField
                    type="text"
                    value={`${String(middleDeck)}/60`}
                    onFocus={() => { setActiveInput('middleDeck'); setFocusedInput('middleDeck'); }}
                    label="Middle Deck"
                    isFocus={focusedInput === 'middleDeck'}
                /> */}
                <FocusField
                    type="text"
                    value={`${String(rearDeck)}`}
                    onFocus={() => { setActiveInput('rearDeck'); setFocusedInput('rearDeck'); }}
                    label="Rear Deck"
                    isFocus={focusedInput === 'rearDeck'}
                />
            </div>
            <div className="flex w-full h-fit items-center justify-center">
                <div className="block w-fit h-fit">
                    <Numpad onKeyPress={handleKeyPress} />
                </div>
            </div>
        </div>
    );
};

export const CREW_POPUP = ({ setPopup }: PopupProps) => {
    const dispatch = useDispatch();

    const data = loadData()

    const [flightDeckCrew, setFlightDeckCrew] = useState(data.performance.loadSheet?.CREW.fdc);
    const [cabinDeckCrew, setCabinDeckCrew] = useState(data.performance.loadSheet?.CREW.cbc);

    const [activeInput, setActiveInput] = useState<'flightDeckCrew' | 'cabinDeckCrew' | null>(null);
    const [focusedInput, setFocusedInput] = useState<'flightDeckCrew' | 'cabinDeckCrew' | null>(null);

    const handleKeyPress = (key: string) => {
        if (activeInput) {
            if (key === 'DEL') {
                // Remove the last character from the active input
                if (activeInput === 'flightDeckCrew') {
                    setFlightDeckCrew(Number(String(flightDeckCrew).slice(0, -1)));
                } else {
                    setCabinDeckCrew(Number(String(cabinDeckCrew).slice(0, -1)));
                }
            } else if (key === 'ENT') {
                dispatch(setCrew({
                    fdc: Number(flightDeckCrew),
                    cbc: Number(cabinDeckCrew)
                }));
                setPopup('INOP');
            } else {
                // Append the key to the active input
                if (activeInput === 'flightDeckCrew') {
                    setFlightDeckCrew(Number(String(flightDeckCrew + key)));
                } else {
                    setCabinDeckCrew(Number(String(cabinDeckCrew + key)));
                }
            }
        }
    };

    return (
        <div className="block w-full max-w-[400px] h-fit rounded-lg bg-content border-border border-[4px] px-4 py-4">
            <div className="flex w-full h-fit px-1">
                <p className="text-text text-xl">CREW</p>
            </div>
            <div className="flex w-full h-fit mb-4">
                <FocusField
                    type="text"
                    value={String(flightDeckCrew)}
                    onFocus={() => { setActiveInput('flightDeckCrew'); setFocusedInput('flightDeckCrew'); }}
                    label="Flight Deck"
                    isFocus={focusedInput === 'flightDeckCrew'}
                />
                <FocusField
                    type="text"
                    value={String(cabinDeckCrew)}
                    onFocus={() => { setActiveInput('cabinDeckCrew'); setFocusedInput('cabinDeckCrew'); }}
                    label="Cabin Deck"
                    isFocus={focusedInput === 'cabinDeckCrew'}
                />
            </div>
            <div className="flex w-full h-fit items-center justify-center">
                <div className="block w-fit h-fit">
                    <Numpad onKeyPress={handleKeyPress} />
                </div>
            </div>
        </div>
    );
};
