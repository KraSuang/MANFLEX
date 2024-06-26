import { Routes, Route } from 'react-router-dom'
import Checklist from './eQRH/Checklist.tsx'

export default function EQRH() {
    return(
        <div className={`block w-full h-full`}>
            <div className="flex w-full h-[60px] bg-content border-border border-b-[2px]">
                Test
            </div>
            <div className={`flex flex-col items-center justify-center w-full h-[calc(100%_-_60px)] px-40 py-4`}>
                <Routes>
                    <Route path='/checklist' element={<Checklist />}/>
                </Routes>
            </div>
        </div>
    )
}