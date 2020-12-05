import { useCallback, useRef } from "react";

export const useScrollPage = (
    isLoading,
    lastPage,
    dispatch
) => {
    const observer = useRef();
    const lastElement = useCallback(
        (element) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && !lastPage) {
                        dispatch({ type: 'ADVANCE_PAGE' });
                    }
                },
                { threshold: 1 }
            );
            if (element) observer.current.observe(element);
        },
        [isLoading, lastPage, dispatch]
    );
    return lastElement;
};