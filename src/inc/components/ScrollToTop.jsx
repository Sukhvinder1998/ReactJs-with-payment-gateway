import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation(); // Get the current path

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top
    }, [pathname]); // Run on path change

    return null; // No UI element to render
};

export default ScrollToTop;
