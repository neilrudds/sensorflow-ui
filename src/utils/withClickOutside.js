// Code Credits: https://stackoverflow.com/questions/63359138/react-closing-a-dropdown-when-click-outside

import React, {useState, useRef, useEffect } from "react";

// The withClickOutside is a Higher Order Component which will wrapper all child components
export default function withClickOutside(WrappedComponent) {
    const Component = (props) => {
        const [open, setOpen] = useState(false); // The current state of the navbar is managed here

        const ref = useRef(); // The useRef object will contain a reference to the current component 

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (!ref.current.contains(event.target)) { // If the user clicks outside of the current component, the referenced component will be closed.
                    setOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside); // This event handler will wait for a mouseclick only
        }, [ref]);

        return <WrappedComponent props={props} open={open} setOpen={setOpen} ref={ref} />;
    };

    return Component;
}