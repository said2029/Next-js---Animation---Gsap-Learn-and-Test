"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const videos = [
  {
    id: 1052229239,
    title: "Introduction to GSAP",
    category: "Animation",
    date: "2025-04-01",
  },
  {
    id: 1070840679,
    title: "Advanced GSAP Techniques",
    category: "Animation",
    date: "2025-04-10",
  },
  {
    id: 1064681837,
    title: "React and GSAP Integration",
    category: "Web Development",
    date: "2025-04-15",
  },
  {
    id: 1059153088,
    title: "Creating Smooth Animations",
    category: "Design",
    date: "2025-04-20",
  },
  {
    id: 1054669154,
    title: "GSAP Plugins Overview",
    category: "Animation",
    date: "2025-04-22",
  },
];
export default function Slider() {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useGSAP(
    () => {
      //   if (!sliderRef.current) return;
      initializeAnimation();
    },
    { scope: containerRef }
  );

  const initializeAnimation = () => {
    const cards = sliderRef.current.querySelectorAll(".card");
    gsap.to(cards, {
      y: (i) => 0 + 18 * i + "%",
      z: (i) => 10 * i,
      ease: "power3.out",
      stagger: -0.1,
    });
  };

  const handleClick = () => {
    if (isAnimated) return;
    setIsAnimated(true);
    const cards = Array.from(sliderRef.current.querySelectorAll(".card"));
    const lastCard = cards.pop();
    gsap.to(lastCard, {
      y: "+=150%",
      duration: 0.75,
      ease: "power3.out",
      onStart() {
        setTimeout(() => {
          sliderRef.current.prepend(lastCard);
          initializeAnimation();
          setTimeout(() => {
            setIsAnimated(false);
          }, 1000);
        }, 300);
      },
    });
  };

  const focusCard = (card) => {
    card = card.currentTarget;
    gsap.to(card, {
      scale: 1.2,
      duration: 0.5,
      ease: "power3.out",
    });
  }
  return (
    <>
      <div
        ref={containerRef}
        className="w-screen h-screen overflow-hidden bg-red-600 relative"
        onClick={handleClick}
      >
        <div
          style={{
            perspectiveOrigin: "50% 100%",
          }}
          className="slider absolute top-[5vh] h-screen w-screen perspective-[175px] overflow-hidden"
          ref={sliderRef}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              style={{
                transform: "translate3d(-50%,-50%,0)",
              }}
              onClick={focusCard}
              className="card w-[65%] h-[600px] absolute top-1/2 left-1/2  rounded-xl overflow-hidden bg-black cursor-zoom-in"
            >
              <div className=" bg-black w-full py-1.5 px-3 flex justify-between items-center">
                <div className="text-gray-400 text-center text-[12px] font-light">
                  {video.category}
                </div>
                <div className="text-white text-center text-xs font-bold opacity-70">
                  {video.title}
                </div>
                <div className="text-gray-400 text-center text-[12px] font-light">
                  {video.date}
                </div>
              </div>
              <div className="w-full h-full overflow-hidden [&_div]:scale-[1.5] pointer-events-none">
                <ReactPlayer
                  url={`https://vimeo.com/${video.id}`}
                  width="100%"
                  height="100%"
                  controls={false}
                  playing
                  muted
                  loop
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
