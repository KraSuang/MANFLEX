import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the type for isSupport
interface SupportInfo {
    isSupport: boolean;
}

// Create a context with a default value
const ResponsiveSupportContext = createContext<SupportInfo | undefined>(undefined);

interface ResponsiveSupportProviderProps {
    children: ReactNode;
}

const checkIsSupport = (width: number, height: number): boolean => {
    if (width === 768 && height === 1024) {
        // iPad Mini Vertical
        return false;
    } else if (width === 1024 && height === 768) {
        // iPad Mini Horizontal
        return true;
    } else if (width === 820 && height === 1180) {
        // iPad Air Vertical
        return false;
    } else if (width === 1180 && height === 820) {
        // iPad Air Horizontal
        return true;
    } else if (width === 1024 && height === 1366) {
        // iPad Pro Vertical
        return false;
    } else if (width === 1366 && height === 1024) {
        // iPad Pro Horizontal
        return true;
    } else {
        return true;
    }
};

export const ResponsiveSupportProvider: React.FC<ResponsiveSupportProviderProps> = ({ children }) => {
    const [isSupport, setIsSupport] = useState<boolean>(checkIsSupport(window.innerWidth, window.innerHeight));

    useEffect(() => {
        const handleResize = () => {
            setIsSupport(checkIsSupport(window.innerWidth, window.innerHeight));
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <ResponsiveSupportContext.Provider value={{ isSupport }}>
            {children}
        </ResponsiveSupportContext.Provider>
    );
};

// Custom hook to use support information
export const useResponsiveSupport = (): SupportInfo => {
    const context = useContext(ResponsiveSupportContext);
    if (context === undefined) {
        throw new Error('useResponsiveSupport must be used within a ResponsiveSupportProvider');
    }
    return context;
};
