import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store.ts'

import { Selector } from "../components/Selector.tsx"
import { Textfield } from "../components/Textfield.tsx"
import { TextButton } from '../components/Button.tsx'

import { Airport } from '../data/type/airport.h.ts'

import config from '../../package.json'

import { Aircraft_Selector } from "../data/airframe/airframe_selector.ts"
import { getAirframeById } from '../data/airframe/airframeData.ts'

import { setAirframe } from '../redux/slice/airframeSlice.ts'
import { setFlightNo } from '../redux/slice/flightSlice.ts'
import { setRegistration } from '../redux/slice/flightSlice.ts'
import { setOrigin } from '../redux/slice/airportSlice.ts'
import { setDestination } from '../redux/slice/airportSlice.ts'

import Content from '../view/Content.tsx'
import ComboBox from '../components/ComboBox.tsx'

export default function Main() {
    const dispatch = useDispatch();
    const airframeState = useSelector((state: RootState) => state.airframe.selectedAirframe);
    const flightState = useSelector((state: RootState) => state.flight);
    const airportState = useSelector((state: RootState) => state.airport);

    const [isContent, setIsContent] = useState(false);
    const [isAllField, setIsAllField] = useState(false);

    const navigate = useNavigate()

    const AirportData = JSON.parse(localStorage.getItem('Airport') || '[]');

    const handleOpenContent = () => {
        setIsContent(true);
    };

    const handleCloseContent = () => {
        setIsContent(false);
    };

    const handleAirframeSelect = (id: string) => {
        const airframe = getAirframeById(id);
        if (airframe) {
            dispatch(setAirframe(airframe));
        }
    };

    const handleRegistrationNoChange = (value: string | number) => {
        dispatch(setRegistration(value as string));
    };

    const handleFlightNoChange = (value: string | number) => {
        dispatch(setFlightNo(value as string));
    };

    const handleOriginSelect = (value: Airport) => {
        dispatch(setOrigin(value));
    };

    const handleDestinationSelect = (value: Airport) => {
        dispatch(setDestination(value));
    };

    useEffect(() => {
        if (
            airframeState &&
            flightState.registration.trim() !== '' &&
            flightState.flightNo.trim() !== '' &&
            airportState.origin &&
            airportState.destination
        ) {
            setIsAllField(true);
        } else {
            setIsAllField(false);
        }
    }, [airframeState, flightState, airportState]);

    const handleStartFlight = () => {
        if (isAllField) {
            navigate('/efb')
        }
    }

    return (
        <>
            <div className="flex w-full h-screen justify-center items-center relative">
                <div className="fixed flex w-full h-[40px] bg-content top-0 border-b-[2px] border-border items-center justify-end px-4">
                    <TextButton title="Content Manager" className="px-2 py-1 text-xs" onClick={handleOpenContent} />
                </div>
                <div className="block w-full max-w-[600px] h-fit bg-content border-border border-[2px] rounded-xl">
                    <div className="block w-full h-fit px-8 py-6">
                        <p className="uppercase text-3xl text-text">{config.name}</p>
                        <p className="uppercase text-xs text-text">Version : {config.version}</p>
                        <div className="block w-full my-4">
                            <p className="text-text text-base ml-2">AIRCRAFT TYPE</p>
                            <Selector data={Aircraft_Selector} title="Choose" onSelect={handleAirframeSelect} />
                        </div>
                        <div className="block w-full my-4">
                            <p className="text-text text-base ml-2">AIRCRAFT REGISTRATION</p>
                            <Textfield type="text" value={flightState.registration} placeholder="ICAO" onChange={handleRegistrationNoChange} />
                        </div>
                        <div className="block w-full my-4">
                            <p className="text-text text-base ml-2">WEIGHT LIMIT</p>
                            <div className="flex w-full h-fit px-6 py-2 bg-button border-border border-[2px] rounded-lg my-2 justify-between">
                                <p className="text-white/50 text-base">MTOW/MLW/MZFW</p>
                                <p className="text-text text-base">{airframeState?.MTOW !== undefined ? `${(airframeState?.MTOW / 1000).toFixed(1)}` : '00'}/{airframeState?.MLW !== undefined ? `${(airframeState?.MLW / 1000).toFixed(1)}` : '00'}/{airframeState?.MZFW !== undefined ? `${(airframeState?.MZFW / 1000).toFixed(1)}` : '00'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[2px] bg-border"></div>
                    <div className="block w-full h-fit px-8 py-6">
                        <div className="block w-full my-4">
                            <p className="text-text text-base ml-2">FLIGHT NO</p>
                            <Textfield type="text" value={flightState.flightNo} placeholder="ICAO" onChange={handleFlightNoChange} />
                        </div>
                        <div className="block w-full my-4">
                            <p className="text-text text-base ml-2">FROM</p>
                            <ComboBox data={AirportData} title="ORIGIN | ICAO" onSelect={handleOriginSelect} type="origin" />
                        </div>
                        <div className="block w-full my-4">
                            <p className="text-text text-base ml-2">TO</p>
                            <ComboBox data={AirportData} title="DESTINATION | ICAO" onSelect={handleDestinationSelect} type="destination" />
                        </div>
                    </div>
                    <div className="flex w-full h-fit mb-8 px-8">
                        <button 
                            disabled={!isAllField}
                            onClick={handleStartFlight}
                            className={`flex w-full h-fit py-2 rounded-lg justify-center items-center transition-all duration-200 ${isAllField ? `hover:bg-button-hover hover:border-button-border-hover` : `opacity-50`} bg-button border-button-border border-[2px]`}>
                            <p className="text-semibold uppercase text-text mt-0.5">START FLIGHT</p>
                        </button>
                    </div>
                </div>
            </div>
            <Content isOpen={isContent} onClose={handleCloseContent} />
        </>
    );
}
