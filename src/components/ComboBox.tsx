import { Fragment, useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { Airport } from '../data/type/airport.h';
interface DataProps {
    title: string;
    data: Airport[];
    onSelect: (selected: Airport) => void;
    type: 'origin' | 'destination'; // New prop to distinguish between origin and destination
}

const ComboBox = ({ data, title, onSelect, type }: DataProps) => {
    const [selected, setSelected] = useState<Airport | null>(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        // Load previously selected airport from Redux state if available
        const selectedAirport = data.find(airport => airport.ident === localStorage.getItem(`${type}Airport`));
        if (selectedAirport) setSelected(selectedAirport);
    }, [type]);

    const filteredItems = query === ''
        ? data
        : data.filter((d) =>
            d.ident.toLowerCase().includes(query.toLowerCase())
        );

    const handleSelect = (item: Airport) => {
        setSelected(item);
        onSelect(item); // Update Redux state with selected airport
        localStorage.setItem(`${type}Airport`, item.ident); // Save selected airport in localStorage
    };

    return (
        <div className="relative w-full h-fit">
            <Combobox
                value={selected}
                onChange={(item: Airport | null) => {
                    setSelected(item);
                    onSelect(item ?? {} as any);
                }}
                nullable
            >
                <div className="relative mt-1">
                    <div className="relative w-full h-fit cursor-default overflow-hidden rounded-lg bg-button text-left border-border border-[2px] outline-none">
                        <Combobox.Input
                            className="w-full h-[42px] z-0 bg-button border-none px-6 py-2 leading-5 text-text outline-none"
                            displayValue={(d: Airport | null) => d ? `${d.ident} | ${d.name}` : ''}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={title}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 border-border border-[2px] z-10 max-h-60 w-full overflow-auto rounded-md bg-button text-base shadow-lg">
                            {filteredItems.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredItems.map((d, index) => (
                                    <Combobox.Option
                                        key={index}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 
                                            ${active ? 'bg-content text-white' : 'text-text'}
                                            ${data.length === index + 1 ? ` border-b-[2px]` : ``}`
                                        }
                                        value={d}
                                        onClick={() => handleSelect(d)}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                                >
                                                    {`${d.ident} | ${d.name}`}
                                                </span>
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};

export default ComboBox;
