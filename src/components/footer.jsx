import React from "react";

const Footer = () => {
    return (
        <footer className="w-full border-t border-gray-300">
            <div className="flex justify-evenly p-6 text-lg text-gray-600">
                <p>&copy; 2024 4Rooms Worldwide S.L.</p>
                <ul className="flex gap-8">
                    <li>Terms & Condition</li>
                    <li>Privacy policy</li>
                    <li>Help</li>
                    <li>Language</li>
                </ul>
            </div>
            <div className="h-10  bg-gray-950"></div>
        </footer>
    );
};

export default Footer;
