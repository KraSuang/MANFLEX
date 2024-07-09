import { useEffect, useState } from 'react'
import { useResponsiveSupport } from '../../context/ResponsiveSupportContext.tsx'
import { motion } from 'framer-motion'

import { DataState } from "../../script/loadData.ts"

import { FillButton, TextButton } from "../../components/Button.tsx";

import PAX from "./LoadSheet/PAX.tsx";

import { CREW_POPUP, PAX_POPUP, CARGO_POPUP } from "./LoadSheet/Popup.tsx";

import { A20NPayload } from "@manflex/formula-A20N";
import { PassengerDeck, CargoDeck, PayloadManager, Pax, Cargo, Mass, Vector3 } from "@manflex/formula-common";
import { Rc, Cell } from "@manflex/wasm"

const paxData = [
    new Pax(0, new Cell(new Mass(84, 'kilogram')), 0, 0, Mass.default(), Mass.default(), 180, new Vector3(0, 0, 0))
];

const cargoData = [
    new Cargo(new Mass(5000, 'kilogram'), new Mass(0, 'kilogram'), new Mass(5000, 'kilogram'), Mass.default(), new Vector3(0, 0, 0), new Mass(10000, 'kilogram'))
];

// Create the PassengerDeck and CargoDeck
const passengerDeck = new PassengerDeck(paxData);
const cargoDeck = new CargoDeck(cargoData);

console.log(paxData)

// Create the PayloadManager
const payloadManager = new PayloadManager(new Rc(new Cell(new Mass(84, 'kilogram'))), passengerDeck, cargoDeck);


export default function LoadSheet({ data }: DataState) {
    const { isSupport } = useResponsiveSupport()

    const [showPopUp, setShowPopup] = useState<String>('INOP')

    const handleShowPopup = (n: string) => {
        if (showPopUp === n) {
            setShowPopup('INOP')
        } else {
            setShowPopup(n)
        }
    }

    const variants = {
        open: {
            display: 'flex',
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3
            }
        },
        close: {
            opacity: 0,
            x: -20,
            transition: {
                duration: 0.3
            },
            transitionEnd: {
                display: 'none',
            }
        }
    }
    useEffect(() => {
        // Set the number of passengers
        payloadManager.passenger_deck.pax[0].pax = 179;
        payloadManager.passenger_deck.pax[0].Load_Payload()

        const paxNum = payloadManager.Total_Pax_Num();
        const paxNumBinary = paxNum.toString(2);

        console.log({
            passenger: {
                payload: payloadManager.passenger_deck.Has_Pax(),
                pax: payloadManager.passenger_deck.pax[0].pax,
                load: payloadManager.Total_Passenger_Load(),
                moment: payloadManager.Total_Passenger_Moment(),
                pax_num: paxNumBinary
            }
        })
    }, []);

    const airframeState = data.airframe;
    const registration = data.reg;

    const dataResult = {
        CREW: `${data.performance.loadSheet?.CREW.fdc}/${data.performance.loadSheet?.CREW.cbc}`,
        PAX: String((data.performance.loadSheet?.PAX.front !== undefined ? data.performance.loadSheet.PAX.front : 0) + (data.performance.loadSheet?.PAX.middle !== undefined ? data.performance.loadSheet.PAX.middle : 0) + (data.performance.loadSheet?.PAX.rear !== undefined ? data.performance.loadSheet.PAX.rear : 0)),
        CARGO: String((data.performance.loadSheet?.CARGO.front !== undefined ? data.performance.loadSheet.CARGO.front : 0) + (data.performance.loadSheet?.CARGO.middle !== undefined ? data.performance.loadSheet.CARGO.middle : 0) + (data.performance.loadSheet?.CARGO.rear !== undefined ? data.performance.loadSheet.CARGO.rear : 0)),
        FOB: String((data.performance.loadSheet?.FUEL.FOB)),
        TAXIFUEL: String((data.performance.loadSheet?.FUEL.TaxiFuel)),
        TRIPFUEL: String((data.performance.loadSheet?.FUEL.TripFuel))
    }

    const d1 = [
        { title: 'CONFIG', detail: 'INOP' },
        { title: 'ENTRY MODE', detail: 'INOP' },
        { title: 'CREW', detail: dataResult.CREW },
        { title: 'CATERING', detail: 'INOP' },
        { title: 'LIMITING WEIGHT', detail: '' }
    ]

    const d2 = [
        { title: 'PAX', detail: dataResult.PAX },
        { title: 'CARGO', detail: dataResult.CARGO },
    ]

    const d3 = [
        { title: 'FOB', detail: `${dataResult.FOB} T` },
        { title: 'TRIP FUEL', detail: `${dataResult.TAXIFUEL} T` },
        { title: 'TAXI FUEL', detail: `${dataResult.TRIPFUEL} T` },
        { title: 'DENSITY', detail: 'INOP' }
    ]

    console.log(showPopUp)

    const dataResults = [
        { title: 'DOW / DOCG', weight: '', cg: '' },
        { title: 'PAYLOAD', weight: '', cg: '' },
        { title: 'ZFW / ZFWCG', weight: '', cg: '' },
        { title: 'T.O. FUEL', weight: '', cg: '' },
        { title: 'TOW / TOCG', weight: '', cg: '' },
        { title: 'TRIP FUEL', weight: '', cg: '' },
        { title: 'LW/ LCG', weight: '', cg: '' },
    ]
    if (isSupport) {
        return (
            <>
                <div className={`block w-full h-full relative`}>
                    <div className={`flex w-full h-[60px] justify-center items-center bg-content border-border border-b-[2px] py-2 z-0`}>
                        <p className={`flex justify-center text-base text-gray-300 min-w-[40px]`}>LOADSHEET</p>
                        <div className={`w-[2px] h-full bg-border mx-4`}></div>
                        <p className={`flex justify-center text-base text-gray-300 min-w-[60px]`}>{registration}</p>
                        <div className={`w-[2px] h-full bg-border mx-4`}></div>
                        <p className={`flex justify-center text-base text-gray-300 min-w-[40px]`}>{airframeState?.name}</p>
                    </div>
                    <div className={`flex w-full h-[calc(100%_-_92px)] my-4 px-4 z-0`}>
                        <div className={`flex w-full h-full`}>
                            <div className={`flex flex-col w-full max-w-[340px] h-full bg-content border-border border-[2px] rounded-xl p-4 relative`}>
                                <div className={`w-full h-fit`}>
                                    {d1.map((d, i) => (
                                        <FillButton key={i} onClick={() => handleShowPopup(`${d.title}`)} className={`pl-4 pr-2 py-2 text-sm`} isFirst={i === 0} isLast={d1.length === i + 1} title={d.title} details={d.detail} />
                                    ))}
                                </div>
                                <div className={`w-full h-fit my-3`}>
                                    {d2.map((d, i) => (
                                        <FillButton key={i} onClick={() => handleShowPopup(`${d.title}`)} className={`pl-4 pr-2 py-2 text-sm`} isFirst={i === 0} isLast={d2.length === i + 1} title={d.title} details={d.detail} />
                                    ))}
                                </div>
                                <div className={`w-full h-fit`}>
                                    {d3.map((d, i) => (
                                        <FillButton key={i} onClick={() => handleShowPopup(`${d.title}`)} className={`pl-4 pr-2 py-2 text-sm`} isFirst={i === 0} isLast={d3.length === i + 1} title={d.title} details={d.detail} />
                                    ))}
                                </div>
                                <motion.div
                                    className={`w-full max-w-[400px] h-fit absolute z-10 top-4 -right-[350px] -max-right-[340px]`}
                                    initial={'close'}
                                    animate={`${showPopUp === `CREW` ? `open` : `close`}`}
                                    variants={variants}
                                >
                                    <CREW_POPUP setPopup={(n) => setShowPopup(`${n}`)} />
                                </motion.div>
                                <motion.div
                                    className={`w-full max-w-[400px] h-fit absolute z-10 top-4 -right-[350px] -max-right-[340px]`}
                                    initial={'close'}
                                    animate={`${showPopUp === `PAX` ? `open` : `close`}`}
                                    variants={variants}
                                >
                                    <PAX_POPUP setPopup={(n) => setShowPopup(`${n}`)} />
                                </motion.div>
                                <motion.div
                                    className={`w-full max-w-[400px] h-fit absolute z-10 top-4 -right-[350px] -max-right-[340px]`}
                                    initial={'close'}
                                    animate={`${showPopUp === `CARGO` ? `open` : `close`}`}
                                    variants={variants}
                                >
                                    <CARGO_POPUP setPopup={(n) => setShowPopup(`${n}`)} />
                                </motion.div>
                            </div>
                            <div className={`flex flex-col w-full justify-between items-center px-4`}>
                                <PAX />
                                <div className={`flex w-full h-fit`}>
                                    <TextButton title="PAX" className={`w-full py-2 mr-1`} />
                                    <TextButton title="CARGO" className={`w-full py-2 ml-1`} />
                                </div>
                            </div>
                            <div className={`flex w-full max-w-[340px] h-full justify-center items-center`}>
                                <div className={`flex flex-col w-full h-fit bg-content border-border border-[2px] rounded-xl`}>
                                    <div className={`flex w-full h-fit`}>
                                        <div className={`w-full max-w-[200px] mt-2 mb-1.5`}></div>
                                        <div className={`flex w-full max-w-[100px] justify-center border-border border-x-[1px]`}>
                                            <p className={`text-text mt-2 mb-1.5`}>WEIGHT T</p>
                                        </div>
                                        <div className={`flex w-full max-w-[100px] justify-center`}>
                                            <p className={`text-text mt-2 mb-1.5`}>CG %</p>
                                        </div>
                                    </div>
                                    {dataResults.map((d, i) => (
                                        <div key={i} className={`flex w-full h-fit border-border border-t-[2px] text-sm`}>
                                            <div className={`flex w-full justify-start px-2 max-w-[140px]`}>
                                                <p className={`text-text mt-2 mb-1.5`}>{d.title}</p>
                                            </div>
                                            <div className={`flex w-full max-w-[100px] justify-center border-border border-x-[1px]`}>
                                                <p className={`text-text mt-2 mb-1.5`}>{d.weight}</p>
                                            </div>
                                            <div className={`flex w-full max-w-[100px] justify-center`}>
                                                <p className={`text-text mt-2 mb-1.5`}>{d.cg}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div className={`flex w-full h-fit py-16 justify-center border-t-[2px] border-border`}>
                                        <p className={`text-green-400 font-semibold`}>{`T.O. THS FOR 00.0% (1 UP)`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <p className={`text-text text-xl font-bold`}>Not support in vertical</p>
        )
    }

}