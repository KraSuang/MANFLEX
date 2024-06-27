import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store.ts';
import { updateChecklistStatus, resetChecklistStatus, updateSectionStatus, resetAllChecklistStatus } from '../../../redux/slice/checklistSlice.ts';

import { TextButton } from '../../../components/Button.tsx'

function DEFAULT() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const checklistState = useSelector((state: RootState) => state.checklist)
    const handleChoose = (p: String) => {
        const formattedString = p.toLowerCase().replace(/\s+/g, '-');
        navigate(`/efb/eQRH/checklist/${formattedString}`);
    };

    const handleReset = () => {
        dispatch(resetAllChecklistStatus());

        const keysToRemove = [];
        for (const key in localStorage) {
            if (key.startsWith('isNow-') || key.startsWith('isOn-')) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));

    }

    return (
        <div className={`flex flex-col w-full h-full p-6 justify-between`}>
            <div className={`block w-full h-fit`}>
                {checklistState.checklist?.data.map((d, i) => (
                    <button
                        key={i}
                        onClick={() => handleChoose(d.name)}
                        className={`flex w-full h-fit py-2 my-2 bg-background px-6 ${d.status === `check` ? `border-green-400 text-green-400` : `${d.status === `skip` ? `border-blue-400 text-blue-400` : `border-border text-text`}`}  border-[2px] rounded-lg`}>
                        <p className={`text-sm`}>{d.name}</p>
                    </button>
                ))}
            </div>
            <TextButton className={`w-full h-fit py-2 text-sm`} title='Reset All' onClick={handleReset} />
        </div>
    );
}

function ChecklistItem() {
    const [isNow, setIsNow] = useState(0);
    const [isOn, setIsOn] = useState<'top' | 'below'>('top');
    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [isLast, setIsLast] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const checklistState = useSelector((state: RootState) => state.checklist);
    const { name } = useParams<{ name: string }>();

    const sections = checklistState.checklist?.data;
    const sectionIndex = sections?.findIndex(d => d.name.toLowerCase().replace(/\s+/g, '-') === name);
    const section = sectionIndex !== undefined && sections ? sections[sectionIndex] : null;

    console.log({
        isNow: isNow,
        isOn: isOn,
    })

    useEffect(() => {
        if (!section) return;
        const savedIsNow = localStorage.getItem(`isNow-${section.name}`);
        const savedIsOn = localStorage.getItem(`isOn-${section.name}`);
        if (savedIsNow !== null) {
            setIsNow(parseInt(savedIsNow, 10));
            if (savedIsOn === 'below' && section.below) {
                setIsOn('below');
            }
        }
    }, [section]);

    useEffect(() => {
        if (sectionIndex === 0) {
            setIsFirst(true)
        } else {
            setIsFirst(false)
        }

        if (!section || sectionIndex === undefined || !sections || sectionIndex === sections.length - 1) {
            setIsLast(true);
        } else {
            setIsLast(false);
        }
        
    }, [sectionIndex])

    const handleCheck = () => {
        if (!section) return;

        const allItems = [...section.top, ...(section.below || [])];
        if (isNow < allItems.length) {
            const currentIndex = isOn === 'top' ? isNow : isNow - section.top.length;
            const itemType = isOn === 'top' ? 'top' : 'below';

            dispatch(updateChecklistStatus({
                sectionName: section.name,
                itemIndex: currentIndex,
                itemType: itemType,
                status: 'check',
            }));

            setIsNow(isNow + 1);

            if (isOn === 'top' && isNow === section.top.length - 1 && section.below) {
                setIsOn('below');
                setIsNow(section.top.length);
            }

            localStorage.setItem(`isNow-${section.name}`, String(isNow + 1));
            localStorage.setItem(`isOn-${section.name}`, isOn);

            if (isNow === allItems.length - 1) {
                const isAnyItemSkip = section.top.some(item => item.status === 'skip') || (section.below && section.below.some(item => item.status === 'skip'));

                // console.log('เท่ากันละ นอน')
                if (!isAnyItemSkip) {
                    dispatch(updateSectionStatus({ sectionName: section.name, status: "check" }))
                } else {
                    dispatch(updateSectionStatus({ sectionName: section.name, status: "skip" }))
                }
            }
        }
    };

    const handleSkip = () => {
        if (!section) return;

        const allItems = [...section.top, ...(section.below || [])];
        if (isNow < allItems.length) {
            const currentIndex = isOn === 'top' ? isNow : isNow - section.top.length;
            const itemType = isOn === 'top' ? 'top' : 'below';

            dispatch(updateChecklistStatus({
                sectionName: section.name,
                itemIndex: currentIndex,
                itemType: itemType,
                status: 'skip',
            }));

            setIsNow(isNow + 1);

            if (isOn === 'top' && isNow === section.top.length - 1 && section.below) {
                setIsOn('below');
                setIsNow(section.top.length);
            }

            localStorage.setItem(`isNow-${section.name}`, String(isNow + 1));
            localStorage.setItem(`isOn-${section.name}`, isOn);

            if (isNow === allItems.length - 1) {
                const isAnyItemSkip = section.top.some(item => item.status === 'skip') || (section.below && section.below.some(item => item.status === 'skip'));

                // console.log('เท่ากันละ นอน')

                if (!isAnyItemSkip) {
                    dispatch(updateSectionStatus({ sectionName: section.name, status: "check" }))
                } else {
                    dispatch(updateSectionStatus({ sectionName: section.name, status: "skip" }))
                }
            }
        }
    };

    const handleReset = () => {
        if (!section) return;

        dispatch(resetChecklistStatus({
            sectionName: section.name,
        }));

        dispatch(updateSectionStatus({ sectionName: section.name, status: "none" }))

        setIsNow(0);
        setIsOn('top');
        localStorage.setItem(`isNow-${section.name}`, String(0));
        localStorage.setItem(`isOn-${section.name}`, 'top');
    };

    const handlePrev = () => {
        const prevSectionIndex = sectionIndex !== undefined ? sectionIndex - 1 : 0;
        if (sections && prevSectionIndex >= 0) {
            const prevSectionName = sections[prevSectionIndex].name.toLowerCase().replace(/\s+/g, '-');
            navigate(`/efb/eQRH/checklist/${prevSectionName}`);
        } else {
            console.log('First checklist reached, cannot go back.');
        }
    };
    
    const handleNext = () => {
        if (!section || sectionIndex === undefined || !sections || sectionIndex === sections.length - 1) {
            console.log('Last checklist reached, cannot go forward.');
            return;
        }
    
        setIsNow(0);
        setIsOn('top');
    
        const nextSectionIndex = sectionIndex + 1;
        if (nextSectionIndex < sections.length) {
            const nextSectionName = sections[nextSectionIndex].name.toLowerCase().replace(/\s+/g, '-');
            navigate(`/efb/eQRH/checklist/${nextSectionName}`);
        } else {
            console.log('Last checklist reached, cannot go forward.');
        }
    };
    

    const handleExit = () => {
        navigate('/efb/eQRH/checklist/')
    }


    if (!section) {
        return <p>No checklist section found.</p>;
    }
    const allItem = [...section.top, ...(section.below || [])];
    const isAnyItemSkipped = section.top.some(item => item.status === 'skip') || (section.below && section.below.some(item => item.status === 'skip'));

    return (
        <div className={`block w-full h-full`}>
            <p className="w-full text-center text-xl text-text my-4">{section.name}</p>
            <div className={`flex flex-col w-full h-[calc(100%_-_80px)] justify-between`}>
                <div className="block w-full h-fit overflow-y-auto px-[26px] mb-4">
                    <div className={`block w-full h-fit`}>
                        {section.top.map((item, index) => (
                            <>
                                <div
                                    key={index}
                                    className={`block w-full h-fit text-sm bg-background ${item.description ? `py-2 mt-2 px-4` : `py-2 my-2 px-4`} ${isOn === 'top' && isNow === index ? `outline-[3px] outline-blue-400` : `${item.status === `check` ? `outline-green-400` : `${item.status === `skip` ? `outline-blue-400` : `outline-border`}`}`} rounded-md ${item.status === 'check' ? 'text-green-400' : item.status === 'skip' ? 'text-blue-400' : 'text-text'} outline outline-2`}>
                                    <div className={`flex w-full h-fit justify-between`}>
                                        <p>{item.title}</p>
                                        <p>{`${item.title === `FUEL QUANTITY` ? `00.0 KG` : `${item.equip}`}`}</p>
                                    </div>
                                </div>
                                {item?.description ? (
                                    <div className={`bg-background px-4 py-2 text-sm mx-1 mb-2 border-x-[2px] border-b-[2px] ${isOn === 'top' && isNow === index ? `border-blue-400 ` : `${item.status === `check` ? `border-green-400 text-green-400` : `${item.status === `skip` ? `border-blue-400 text-blue-400` : `border-border text-gray-300`}`}`} ${item.status === 'check' ? 'text-green-400' : item.status === 'skip' ? 'text-blue-400' : 'text-text'} rounded-b-lg`}>
                                        {item.description.map((desc, descIndex) => (
                                            <p key={descIndex} className="my-1">
                                                - {desc}
                                            </p>
                                        ))}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </>

                        ))}
                        {section.below && (
                            <>
                                <div className="w-full h-[3px] my-6 bg-border"></div>
                                {section.below.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex w-full h-fit justify-between text-sm bg-background ${isOn === 'below' && isNow === section.top.length + index ? `outline-[3px] outline-blue-400` : `${item.status === `check` ? `outline-green-400` : `${item.status === `skip` ? `outline-blue-400` : `outline-border`}`}`} rounded-md py-2 my-2 px-4 ${item.status === 'check' ? 'text-green-400' : item.status === 'skip' ? 'text-blue-400' : 'text-text'} outline outline-2`}>
                                        <p>{item.title}</p>
                                        <p>{item.equip}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    <div className={`${isNow < allItem.length ? `hidden` : `flex`} w-full h-fit justify-center items-center`}>
                        <div className={`flex w-fit h-fit px-8 py-2 border-border border-[2px] rounded-lg mt-4 ${!isAnyItemSkipped ? `border-green-400 text-green-400` : `border-blue-400 text-blue-400`}`}>
                            <p className={`uppercase`}>{section.name} Checklist {!isAnyItemSkipped ? `Completed` : `Overrided`}</p>
                        </div>
                    </div>
                </div>
                <div className="block w-full h-fit items-center px-6">
                    <TextButton className="w-full px-6 py-3 text-sm" title="Reset" onClick={handleReset} />
                    <div className={`flex w-full h-fit my-2 ${isNow < allItem.length ? `flex` : `hidden`}`}>
                        <TextButton className="w-full px-6 py-3 text-base mr-1" title="OVRD" onClick={handleSkip} />
                        <TextButton className="w-full px-6 py-3 text-base ml-1" title="NORM" onClick={handleCheck} />
                    </div>
                    <div className={`flex w-full h-fit my-2 ${isNow < allItem.length ? `hidden` : `flex`}`}>
                        <TextButton className={`w-full px-6 py-3 text-base mr-1 ${isFirst ? `opacity-50` : `opacity-100`}`} title="Prev" onClick={handlePrev} disable={isFirst} />
                        <TextButton className={`w-full px-6 py-3 text-base ml-1 ${isLast ? `hidden` : `block`}`} title="Next" onClick={handleNext} />
                        <TextButton className={`w-full px-6 py-3 text-base ml-1 ${isLast ? `block` : `hidden`}`} title="Exit" onClick={handleExit} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Checklist() {
    return (
        <div className={`flex flex-col w-full max-w-[800px] h-full items-center bg-content rounded-lg border-border border-[2px]`}>
            <Routes>
                <Route path='/' element={<DEFAULT />} />
                <Route path=':name' element={<ChecklistItem />} />
            </Routes>
        </div>
    )
}