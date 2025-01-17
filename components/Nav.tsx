"use client";

import Link from "next/link";
import nav from "@/styles/css/Nav.module.css";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

const Nav = () => {
  const [show, setShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShow(currentScrollY < scrollYRef.current || currentScrollY < 100);
      scrollYRef.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const guestLinks = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={nav.container}
      style={{
        position: "sticky",
        top: "0",
        width: "100%",
        zIndex: "1",
        transition: "transform 0.4s ease-in-out",
        transform: show ? "translateY(0)" : "translateY(-150px)"
      }}
    >
      <Link href='/'>
        <Image
          width={50}
          height={50}
          src='/doppelshield-no-bg.png'
          alt='DoppelShield logo'
        />
      </Link>

      <div className={`${nav.tabsContainer} ${isOpen ? nav.open : ""}`}>
        {guestLinks.map(({ href, label }) => (
          <Link key={uuidv4()} href={href} className={nav.tab}>
            {label}
          </Link>
        ))}

        <Link href='/extension' className={nav.extensionButton}>
          Browser Extension
        </Link>
      </div>

      <div className={nav.hamburger} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Nav;
