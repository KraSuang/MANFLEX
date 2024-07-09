import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FaSheetPlastic, FaBook, FaChevronDown } from "react-icons/fa6";
import { BiSolidPlaneTakeOff, BiSolidPlaneLand } from "react-icons/bi";

import { motion } from "framer-motion";

import EQRH from "../view/EFB/eQRH.tsx";
import LoadSheet from "../view/EFB/LoadSheet.tsx";

import { DataState, loadData } from "../script/loadData.ts";

function DEFAULT({ data }: DataState) {
    return (
        <div className="block w-full max-w-[500px] bg-content h-fit px-6 py-4 rounded-lg border-border border-[2px]">
            <div className="flex w-full h-fit justify-between text-text my-2">
                <p>Aircraft Type</p>
                <p>{data.airframe?.name}</p>
            </div>
            <div className="flex w-full h-fit justify-between text-text my-2">
                <p>Aircraft Registration</p>
                <p>{data.reg}</p>
            </div>
            <div className="flex w-full h-fit justify-between text-text my-2">
                <p>Flight No</p>
                <p>{data.flight_no}</p>
            </div>
            <div className="flex w-full h-fit justify-between text-text mt-8 mb-2">
                <p>MTOW</p>
                <p>{((data.airframe?.performance.MTOW ?? 0) / 1000).toFixed(1)} T</p>
            </div>
            <div className="flex w-full h-fit justify-between text-text my-2">
                <p>MLW</p>
                <p>{((data.airframe?.performance.MLW ?? 0) / 1000).toFixed(1)} T</p>
            </div>
            <div className="flex w-full h-fit justify-between text-text my-2">
                <p>MZFW</p>
                <p>{((data.airframe?.performance.ZFW.max ?? 0) / 1000).toFixed(1)} T</p>
            </div>
        </div>
    );
}

export default function EFB() {
    const NavItems = [
        { title: 'eQRH', icon: <FaBook />, path: 'eQRH' },
        { title: 'LoadSheet', icon: <FaSheetPlastic />, path: 'loadsheet' },
        { title: 'Takeoff', icon: <BiSolidPlaneTakeOff />, path: 'takeoff' },
        { title: 'Landing', icon: <BiSolidPlaneLand />, path: 'landing' }
    ];

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const MainVariant = {
        initial: {
            height: "calc(100% - 60px)"
        },
        open: {
            height: "calc(100% - 60px)"
        },
        close: {
            height: "100%"
        }
    };

    const NavVariant = {
        initial: {
            height: "60px",
            opacity: 1,
            display: 'flex'
        },
        open: {
            height: "60px",
            opacity: 1,
            display: 'flex',
            transition: {
                staggerChildren: 0.1, // Stagger each child’s animation
                delayChildren: 0.1    // Delay before children animations start
            }
        },
        close: {
            height: "0px",
            opacity: 0,
            transitionEnd: {
                display: 'none'
            }
        }
    };

    const NavItemVariant = {
        close: { y: 20, opacity: 0 },
        open: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    };

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    const data = loadData();

    return (
        <div className="block w-full h-screen relative">
            <motion.div
                initial="initial"
                animate={isOpen ? "open" : "close"}
                variants={MainVariant}
                className={`flex w-full justify-center items-center`}
            >
                <Routes>
                    <Route path="/" element={<DEFAULT data={data} />} />
                    <Route path="/eQRH/*" element={<EQRH data={data}/>} />
                    <Route path="/loadsheet" element={<LoadSheet data={data} />} />
                </Routes>
            </motion.div>
            <motion.ul
                initial="initial"
                variants={NavVariant}
                animate={isOpen ? "open" : "close"}
                className="w-full bg-content border-t-[2px] border-border justify-center items-center relative"
            >
                {NavItems.map((nav, index) => (
                    <motion.li
                        key={index}
                        variants={NavItemVariant}
                    >
                        <Link to={`${nav.path}`} className="flex items-center mx-4">
                            <span className="text-text text-xl mr-2">{nav.icon}</span>
                            <p className="text-text text-sm">{nav.title}</p>
                        </Link>
                    </motion.li>
                ))}
            </motion.ul>
            <button
                onClick={handleOpen}
                title="Popup"
                className="w-fit h-fit absolute right-0 px-3 py-3 bottom-1 border-border border-l-[2px] border-y-[2px] rounded-l-lg text-text text-xl"
            >
                <div className={`transition-all duration-500 ${isOpen ? `rotate-0` : ` rotate-180`}`}><FaChevronDown /></div>
            </button>
        </div>
    );
}
