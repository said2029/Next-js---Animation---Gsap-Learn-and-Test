"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const menuLinks = [
  { path: "/Menu", label: "Home" },
  { path: "/Menu/work", label: "Work" },
  { path: "/Menu/about", label: "About" },
  { path: "/Menu/contact", label: "Contact" },
  { path: "/Menu/lab", label: "Lab" },
];
export default function Menu() {
  const container = useRef();
  const ti = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      gsap.set(".menu-link", { y: 76 });
      ti.current = gsap.timeline({ paused: true });
      ti.current
        .to(".menu-overlay", {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.25,
          ease: "power4.inOut",
        })
        .to(".menu-link", {
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power4.inOut",
        },"-=1")
        .to(".menu-close-button", {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1,
          ease: "power2.inOut",
        },"-=.7");
    },
    { scope: container }
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      ti.current.play();
    } else {
      ti.current.reverse();
    }
  }, [isOpen]);

  return (
    <div ref={container} className="relative">
      <div className="menu px-5 md:px-11 mx-auto py-5 fixed top-0  mix-blend-difference w-full flex justify-between items-center z-30">
        <h1 className="font-sans font-extrabold text-xl">Logo</h1>
        <button
          onClick={toggleMenu}
          className="cursor-pointer font-sans text-sm"
        >
          Menu
        </button>
      </div>
      <div
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        }}
        className="menu-overlay bg-[#bdfa3d] fixed inset-0 top-0 h-[100dvh]"
      >
        <div className="text-zinc-900 absolute top-28 md:left-60">
          <ul className="h-fit">
            {menuLinks.map((item) => (
              <li
                className="text-6xl md:text-8xl uppercase overflow-hidden"
                key={item.path}
              >
                <Link
                  onClick={toggleMenu}
                  className="menu-link block"
                  href={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <X
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            }}
            onClick={toggleMenu}
            size={170}
            strokeWidth={1}
            className="text-zinc-900 absolute bottom-3 md:left-52 cursor-pointer menu-close-button"
          />
        </div>
      </div>
    </div>
  );
}
