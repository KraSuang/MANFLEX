import { motion, Variants } from 'framer-motion'
import { useState } from 'react'

interface dataProps {
    title: string,
    data: {
        name: string,
        status: boolean,
        id: string
    }[]
    onSelect: (id: string) => void;
}

const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

export const Selector = ({ data, title, onSelect }: dataProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectedData = data[selectedIndex];

    const handleSelect = (i: number) => {
        setSelectedIndex(i)
        setIsOpen(false)
        onSelect(data[i].id)
    }

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="relative outline-none"
        >
            <motion.button
                whileTap={{ scale: 1.0 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex w-full h-fit bg-button px-6 py-2 rounded-lg my-2 border-border border-[2px] justify-between outline-none`}
            >
                <p className={`text-text`}>{selectedData?.name || `${title}`}</p>
                <motion.div
                    variants={{
                        open: { rotate: 180 },
                        closed: { rotate: 0 }
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0.55 }}
                >
                </motion.div>
            </motion.button>
            <motion.div
                variants={{
                    open: {
                        clipPath: "inset(0% 0% 0% 0%)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05
                        },
                    },
                    closed: {
                        clipPath: "inset(10% 50% 90% 50%)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7
                        }
                    }
                }}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
                className={`absolute w-full border-border border-[2px] rounded-lg bg-button`}
            >
                {data.map((d, i) => (
                    <motion.button
                        variants={itemVariants}
                        key={i}
                        disabled={!d.status}
                        onClick={() => handleSelect(i)}
                        className={`text-text w-full h-fit justify-between items-center px-6 py-2 
                        ${i === 0 ? `hidden` : `flex`}
                        ${data.length === i + 1 ? `` : `border-border border-b-[2px]`}
                        ${!d.status ? `text-gray-400` : ``}
                        `}
                    >
                        <p className={`text-base`}>{d.name}</p>
                        <div className={`${selectedIndex === i ? `flex` : `hidden`} bg-green-600 rounded-full`}>
                            <p className={`text-text text-[10px] px-2 py-1`}>Selected</p>
                        </div>
                    </motion.button>
                ))}
            </motion.div>
        </motion.nav>
    )
}