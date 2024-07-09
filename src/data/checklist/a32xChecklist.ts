import { Checklist } from "../type/checklist.h.ts";

export const a32xChecklist: Checklist = [
    {
        name: 'BEFORE START',
        top: [
            {
                title: 'COCKPIT PERF',
                equip: 'COMPLETED (BOTH)',
                status: 'none'
            },
            {
                title: 'GEAR PINS and COVER',
                equip: 'REMOVED',
                status: 'none'
            },
            {
                title: 'SIGNS',
                equip: 'ON/AUTO',
                status: 'none'
            },
            {
                title: 'ADIRS',
                equip: 'NAV',
                status: 'none'
            },
            {
                title: 'FUEL QUANTITY',
                equip: '',
                status: 'none'
            },
            {
                title: 'TO DATA',
                equip: 'SET',
                status: 'none'
            },
            {
                title: 'BARO REF',
                equip: 'SET (BOTH)',
                status: 'none'
            }
        ],
        below: [
            {
                title: 'WINDOWS/DOORS',
                equip: 'CLOSED (BOTH)',
                status: 'none',
            },
            {
                title: 'BEACON',
                equip: 'ON',
                status: 'none',
            },
            {
                title: 'THR LEVERS',
                equip: 'IDLE',
                status: 'none',
            },
            {
                title: 'PARKING BRAKE',
                equip: 'AS RQRD',
                status: 'none',
            }
        ],
        status: 'none'
    },
    {
        name: 'AFTER START',
        top: [
            {
                title: 'ANTI ICE',
                equip: '',
                status: 'none'
            },
            {
                title: 'ECAM STATUS',
                equip: 'CHECKED',
                status: 'none'
            },
            {
                title: 'PITCH TRIM',
                equip: '% SET',
                status: 'none'
            },
            {
                title: 'RUDDER TRIM',
                equip: 'ZERO',
                status: 'none'
            }
        ],
        status: 'none'
    },
    {
        name: 'BEFORE TAKEOFF',
        top: [
            {
                title: 'FLIGHT CONTROL',
                equip: 'CHECKED (BOTH)',
                status: 'none'
            },
            {
                title: 'FLT INST',
                equip: 'CHECKED (BOTH)',
                status: 'none'
            },
            {
                title: 'BRIEFING',
                equip: 'CONFIRMED',
                status: 'none'
            },
            {
                title: 'FLAP SETTING',
                equip: 'BOTH',
                status: 'none'
            },
            {
                title: 'V1. VR. V2/FLX TEMP',
                equip: '(BOTH)',
                status: 'none'
            },
            {
                title: 'ATC',
                equip: 'SET',
                status: 'none'
            },
            {
                title: 'ECAM MEMO',
                equip: 'TO NO BLUE',
                status: 'none',
                description: ['AUTO BRK MAX', 'SIGNS ON', 'CABIN READY', 'SPLRS ARM', 'FLAPS TO', 'TO CONFIG NORM']
            },
        ],
        below: [
            {
                title: 'TAKEOFF RWY',
                equip: 'CONFIRMED (BOTH)',
                status: 'none'
            },
            {
                title: 'CABIN CREW',
                equip: 'ADVISED',
                status: 'none'
            },
            {
                title: 'TCAS',
                equip: 'TA OR TA/RA',
                status: 'none'
            },
            {
                title: 'ENG MODE SEL',
                equip: 'AS RQRD',
                status: 'none'
            },
            {
                title: 'PACK',
                equip: 'AS RQRD',
                status: 'none'
            },
        ],
        status: 'none'
    },
    {
        name: 'AFTER TAKEOFF',
        top: [
            {
                title: 'LDG GEAR',
                equip: 'UP',
                status: 'none'
            },
            {
                title: 'FLAPS',
                equip: 'RETRACTED',
                status: 'none'
            },
            {
                title: 'PACK',
                equip: 'ON',
                status: 'none'
            },
        ],
        below: [
            {
                title: 'BARO REF',
                equip: 'SET (BOTH)',
                status: 'none'
            },
        ],
        status: 'none'
    },
    {
        name: 'APPROACH',
        top: [
            {
                title: 'BRIEFING',
                equip: 'CONFIRMED',
                status: 'none'
            },
            {
                title: 'ECAM STATUS',
                equip: 'CHECKED',
                status: 'none'
            },
            {
                title: 'SEAT BELTS',
                equip: 'ON',
                status: 'none'
            },
            {
                title: 'BARO REF',
                equip: 'SET (BOTH)',
                status: 'none'
            },
            {
                title: 'MINIMUM',
                equip: 'SET (BOTH)',
                status: 'none'
            },
            {
                title: 'EMG MODE SEL',
                equip: 'AS RQRD',
                status: 'none'
            },
        ],
        status: 'none'
    },
    {
        name: 'LANDING',
        top: [
            {
                title: 'CABIN CREW',
                equip: 'ADVISED',
                status: 'none'
            },
            {
                title: 'A/THR',
                equip: 'SPEED/OFF',
                status: 'none'
            },
            {
                title: 'AUTOBRAKE',
                equip: 'AS RQRD',
                status: 'none'
            },
            {
                title: 'ECAM MEMO',
                equip: 'LDG NO BLUE',
                status: 'none',
                description: ['LDG GEAR DN', 'SIGNS ON', 'CABIN READY', 'SPLRS ARM', 'FLAPS SET']
            },
        ],
        status: 'none'
    },
    {
        name: 'PARKING',
        top: [
            {
                title: 'APU BLEED',
                equip: 'ON',
                status: 'none'
            },
            {
                title: 'ENGINE',
                equip: 'OFF',
                status: 'none'
            },
            {
                title: 'SEAT BELTS',
                equip: 'OFF',
                status: 'none'
            },
            {
                title: 'EXT LT',
                equip: 'AS RQRD',
                status: 'none',
            },
            {
                title: 'FUEL PUMPS',
                equip: 'OFF',
                status: 'none',
            },
            {
                title: 'PARK BRK AND CHOCK',
                equip: 'AS RQRD',
                status: 'none',
            },
        ],
        status: 'none'
    },
    {
        name: 'SECURE THE AIRCRAFT',
        top: [
            {
                title: 'ADIRS',
                equip: 'OFF',
                status: 'none'
            },
            {
                title: 'OXYGEN',
                equip: 'OFF',
                status: 'none'
            },
            {
                title: 'APU BLEED',
                equip: 'OFF',
                status: 'none'
            },
            {
                title: 'EMER EXIT LT',
                equip: 'OFF',
                status: 'none',
            },
            {
                title: 'SIGNS',
                equip: 'OFF',
                status: 'none',
            },
            {
                title: 'APU AND BAT OFF',
                equip: 'AS RQRD',
                status: 'none',
            },
        ],
        status: 'none'
    },
]
