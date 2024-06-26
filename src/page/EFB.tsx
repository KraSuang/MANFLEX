import { Routes, Route } from "react-router-dom"

import EQRH from "../view/EFB/eQRH.tsx"

export default function EFB() {
    return(
        <div className={`flex w-full h-full`}>
            <Routes>
                <Route path="/eQRH" element={<EQRH />} />
            </Routes>
        </div>
    )
}