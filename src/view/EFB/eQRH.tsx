import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

import Checklist from './eQRH/Checklist.tsx';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

export default function EQRH() {

    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const checklistData = useSelector((state: RootState) => state.checklist.checklist?.data);

    // Generate allowed paths dynamically based on checklist names
    const allowedPaths = checklistData
        ? checklistData.map(section => `/efb/eQRH/checklist/${section.name.toLowerCase().replace(/\s+/g, '-')}`)
        : [];

    console.log(allowedPaths);

    const eQRHPath = [
        { name: 'CHECKLIST', path: 'checklist', class: 'bg-green-500 hover:bg-green-700' }
    ];

    const prevPath = localStorage.getItem('previousPath')

    const handleExit = () => {

        if (prevPath) {
            navigate(`/efb/eQRH/${prevPath}`);
        } else {
            navigate('/efb/eQRH');
        }
    };

    const handlePath = (p: string) => {
        localStorage.setItem('previousPath', p);
    }

    return (
        <div className={`block w-full h-full`}>
            <div className="flex w-full h-[60px] bg-content border-border border-b-[2px]">
                <div className={`w-full max-w-[200px]`}></div>
                <div className={`flex w-full h-full justify-center`}>
                    <div className={`flex w-fit h-full ${allowedPaths.includes(currentPath) ? 'hidden' : 'flex'}`}>
                        {eQRHPath.map((d, i) => (
                            <Link
                                key={i}
                                to={`/efb/eQRH/${d.path}`}
                                className={`flex w-[120px] h-full items-center justify-center ${d.class}`}
                                onClick={() => handlePath(`${d.path}`)}
                            >
                                <p className={`text-text`}>{d.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={`flex w-full max-w-[200px] justify-end`}>
                    <button
                        onClick={handleExit}
                        className={`flex w-[120px] h-full items-center justify-center bg-red-500 hover:bg-red-600 ${allowedPaths.includes(currentPath) ? '' : 'hidden'}`}>
                        <p className={`text-text`}>Exit</p>
                    </button>
                </div>
            </div>
            <div className={`flex flex-col items-center justify-center w-full h-[calc(100%_-_60px)] px-40 py-4`}>
                <Routes>
                    <Route path='/checklist/*' element={<Checklist />} />
                </Routes>
            </div>
        </div>
    );
}
