import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./page/Main.tsx"
import Dev from "./page/Dev.tsx"
import EFB from "./page/EFB.tsx"

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/efb/*" element={<EFB />} />
                <Route path="/dev" element={<Dev />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
