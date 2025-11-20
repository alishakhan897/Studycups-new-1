import React, { useState, useEffect, useRef } from "react";

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

  const bgImage =
    selectedEvent === "kanpur"
      ? "https://res.cloudinary.com/alishakhan987/image/upload/v1763627667/STUDYCUPS_KANPUR_ADMIT_CARD_1_hw5kaj.png"
      : "https://res.cloudinary.com/alishakhan987/image/upload/v1763627694/STUDYCUPS_LUCKNOW_ADMIT_CARD_1_gztmq7.png";

  return (
    <div className="flex justify-center">
      <div
        ref={passRef}
        className="relative w-full max-w-[420px] mx-auto"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          width: "100%",
          height: "720px",
          position: "relative",
        }}
      > 
      
        {/* Name */} 

        <div
          className="absolute font-bold text-[20px] text-[#0B2447]"
          style={{
            top: "22%",     // <- PERFECT ALIGNMENT WITH NAME BOX
            left: "67%",      // move text in right box area
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
            top: "27%",     // <- PERFECT ALIGNMENT WITH REG NO BOX
            left: "69%",
            transform: "translateX(-50%)",
            width: "50%",
            textAlign: "left",
          }}
        >
          {regNumber}
        </div>
      
      </div>
    </div>
  );
};

export default EventPass;
