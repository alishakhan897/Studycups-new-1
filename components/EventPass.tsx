import React, { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

interface EventPassProps {
    name: string;
    selectedEvent: "kanpur" | "lucknow";
}

const EventPass: React.FC<EventPassProps> = ({ name, selectedEvent }) => {
    const [regNumber, setRegNumber] = useState("");
    const passRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        if (selectedEvent === "kanpur") {
            setRegNumber(`KAN${randomNum}`);
        } else {
            setRegNumber(`LKO${randomNum}`);
        }


    }, [selectedEvent]);


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);


    const bgImage =
        selectedEvent === "kanpur"
            ? "https://res.cloudinary.com/alishakhan987/image/upload/v1763627667/STUDYCUPS_KANPUR_ADMIT_CARD_1_hw5kaj.png"
            : "https://res.cloudinary.com/alishakhan987/image/upload/v1763627694/STUDYCUPS_LUCKNOW_ADMIT_CARD_1_gztmq7.png";

    // 📌 DOWNLOAD FUNCTION
    const downloadPass = async () => {
        if (passRef.current) {
            try {
                const dataUrl = await toPng(passRef.current, {
                    cacheBust: true,
                    width: 420,
                    height: 720,
                    style: {
                        transform: "scale(1)",
                        transformOrigin: "top left",
                        backgroundColor: "white",
                    },
                });


                saveAs(dataUrl, `${name}-event-pass.png`);
            } catch (error) {
                console.error("Error generating image", error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center">

            <div
                ref={passRef}
                className="relative w-full max-w-[420px] mx-auto"
                style={{
                    backgroundImage: `url('${bgImage}')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center",
                    width: "420%",
                    height: "720px",
                    position: "relative",
                    backgroundColor: "white",
                }}
            >
                {/* Name */}
                <div
                    className="absolute font-bold text-[20px] text-[#0B2447]"
                    style={{
                        top: "22%",
                        left: "67%",
                        transform: "translateX(-50%)",
                        width: "50%",
                        textAlign: "left",
                    }}
                >
                    {name}
                </div>

                {/* Reg Number */}
                <div
                    className="absolute font-bold text-[20px] text-[#0B2447]"
                    style={{
                        top: "27%",
                        left: "69%",
                        transform: "translateX(-50%)",
                        width: "50%",
                        textAlign: "left",
                    }}
                >
                    {regNumber}
                </div>
            </div>


            <button
                onClick={downloadPass}
                className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md active:scale-95"
            >
                Download Admit Card
            </button>
        </div>
    );
};

export default EventPass;
