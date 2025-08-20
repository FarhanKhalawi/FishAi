import { useEffect, useRef } from "react";

/** Custom hook to prevent certain functions from running on the initial mount of a React component. */
export const CustomUseEffect = (callback, dependencies) => {
    const isMounted = useRef( false );

    useEffect( () => {
        if (isMounted.current) {
            callback();
        } else {
            isMounted.current = true;
        }
    }, dependencies );
};