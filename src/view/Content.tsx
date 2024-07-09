import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { Airport } from '../data/type/airport.h.ts'
import axios from 'axios'

interface ContentProps {
    isOpen: boolean
    onClose: () => void
}
export default function Content({ isOpen, onClose }: ContentProps) {
    const [isICAO, setIsICAO] = useState<string>('');
    const [isAirportShow, setIsAirportShow] = useState<Airport | undefined>(undefined);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setIsICAO(newValue);
    };

    const handleDownload = () => {
        if (isAirportShow) {
            // Retrieve stored data from localStorage
            const storedFiles: Airport[] = JSON.parse(localStorage.getItem('Airport') || '[]');

            // Check if isAirportShow already exists in storedFiles
            const isDuplicate = storedFiles.some(item => item.id === isAirportShow.id);

            // Only push isAirportShow if it's not a duplicate
            if (!isDuplicate) {
                storedFiles.push(isAirportShow);
                localStorage.setItem('Airport', JSON.stringify(storedFiles));
            }
        }
    };

    useEffect(() => {
        if (isICAO.length === 4) {
            const fetchData = async () => {
                try {
                    const response = await axios.get<Airport>(`http://10.10.10.153:10154/api/airport/download/`, {
                        params: {
                            icao: isICAO
                        }
                    });
                    const data = response.data;
                    setIsAirportShow(data);
                } catch (err) {
                    console.error('Error fetching data:', err);
                }
            };

            fetchData();
        }
    }, [isICAO]);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-content border-border border-[2px] p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-text"
                                    >
                                        Content Manager
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className={`flex w-full h-fit items-center bg-button border-border border-[2px] rounded-lg`}>
                                            <input
                                                className={`flex w-full h-fit bg-transparent text-text text-base px-6 py-2 outline-none`}
                                                placeholder='ICAO'
                                                value={isICAO}
                                                onChange={handleValueChange}
                                            />
                                        </div>
                                        <div className={`flex flex-col items-center rounded-lg bg-background px-4 py-2 border-border border-[2px] my-4`}>
                                            {isAirportShow ? (
                                                <button 
                                                    onClick={handleDownload}
                                                    className={`flex w-full h-fit px-2 py-2 text-text justify-between items-center`}
                                                >
                                                    <p>{isAirportShow.ident} | {isAirportShow.name}</p>
                                                    <p className={`text-text text-xs`}>Downloaded</p>
                                                </button>
                                            ) : (
                                                <p className={`text-text`}>No Data</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-button px-4 py-2 text-sm font-medium text-text outline-none"
                                            onClick={onClose}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}