'use client';

import TypewriterComponent from "typewriter-effect";

export default function Type() {
    return (
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            <TypewriterComponent
                options={{
                    strings: [
                        "Restaurantes.",
                        "Happy Hour.",
                        "Bares.",
                        "Shopping.",
                        "Festas.",
                    ],
                    autoStart: true,
                    loop: true,
                }}
            />
        </div>
    )
}