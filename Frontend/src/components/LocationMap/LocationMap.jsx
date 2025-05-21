import React, { useState, useEffect } from 'react';

const LocationMap = () => {
    const [ctrlPressed, setCtrlPressed] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey || event.metaKey) {
                setCtrlPressed(true);
            }
        };

        const handleKeyUp = (event) => {
            if (!event.ctrlKey && !event.metaKey) {
                setCtrlPressed(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className="w-full h-auto relative">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2467.2159025511614!2d-0.2271310821872378!3d51.80221551675458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48763b04dc00c883%3A0x15cb1e3854de3c47!2sWentworth%20Lodge%2C%20Great%20North%20Rd%2C%20Welwyn%20Garden%20City%20AL8%207SR%2C%20UK!5e0!3m2!1sen!2s!4v1744644901417!5m2!1sen!2s"
                width="100%"
                height="600px"
                style={{ pointerEvents: ctrlPressed ? 'auto' : 'none' }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            {/* <iframe
                style={{ pointerEvents: ctrlPressed ? 'auto' : 'none' }}
                src="https://www.google.com/maps/d/embed?mid=1IuKsDO4XYpsAIrz1fcTg0Jz8dpYTsK0&ehbc=2E312F&noprof=1"
                width="100%"
                height="600px"
                loading="lazy"
            ></iframe> */}
        </div>
    );
};

export default LocationMap;