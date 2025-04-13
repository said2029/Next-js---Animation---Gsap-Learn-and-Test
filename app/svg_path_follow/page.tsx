"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import Image from "next/image";

import { useEffect, useRef } from "react";

gsap.registerPlugin(MotionPathPlugin);

const TEXT_PRIMARY = [
  "FontEnd-developer-Here",
  "FontEnd-developer-Here",
  "FontEnd-developer-Here",
];
export default function page() {
  const container = useRef(null);

  useEffect(() => {
    const path_data = document.getElementById("path-1")?.getAttribute("d");
    document.getElementById("defs-1").setAttribute("d", path_data);
  }, []);

  useGSAP(
    () => {
      gsap.to("#text-34", {
        attr: { startOffset: "100%" },
        duration: 6,
        stagger: 3,
        repeat: -1,
        ease: "linear",
      });
      const animation = (selector, delay) => {
        gsap.to(selector, {
          attr: { startOffset: "100%" },
          duration: 6,
          delay: delay,
          repeat: -1,
          ease: "linear",
        });
      };
      //   animation("#text1", 0);
      //   animation("#text2", 3);
      //   animation("#text3", 4);
    },
    { scope: container }
  );
  return (
    <div
      ref={container}
      className="mx-auto flex justify-center items-center h-screen"
    >
      <svg
        width="800px"
        height="600px"
        viewBox="0 0 350 350"
        xmlns="http://www.w3.org/2000/svg"
        id="text-primary"
        className="overflow-visible"
      >
        <defs>
          <path id="defs-1" />
        </defs>
        <path
          className="fill-none"
          id="path-1"
          d="M -393 405 C -53 405 -73 5 177 5 C 427 5 407 405 747 405"
        />
        <text>
          {TEXT_PRIMARY.map((text, index) => (
            <textPath
              className="fill-white text-5xl uppercase font-mono"
              key={index}
              id={`text-34`}
              xlinkHref="#path-1"
              startOffset={"-50%"}
            >
              {text}
            </textPath>
          ))}
        </text>
      </svg>

      <div className="size-[600px] absolute bottom-40 right-1/2 left-1/2 -translate-x-1/2">
        <Image className="w-full h-full object-cover animate-[spin_3s_linear_infinite]" width={400} height={400} alt="" src="/disk.png" />
      </div>
    </div>
  );
}
