import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const variants = {
  open: { x: 0 },
  closed: {
    x: "-100%",
    transition: {
      delay: 0.3,
    },
  },
};

const liVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
  closed: { y: -20, opacity: 0 },
};

const links = ["one", "two", "three", "four"];

const Nav = ({ isNavOpen, setIsNavOpen }) => {
  return (
    <MenuNav
      variants={variants}
      initial="closed"
      animate={isNavOpen ? "open" : "closed"}
      transition={{ damping: 300 }}
    >
      <button onClick={() => setIsNavOpen(false)}>Close</button>
      <ul>
        {links.map((text) => (
          <motion.li variants={liVariants} key={text}>
            <a href="#">{text}</a>
          </motion.li>
        ))}
      </ul>
    </MenuNav>
  );
};

const MenuNav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--black);
  padding: 40px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0;
    margin: 0 0 1rem;
    font-size: 2rem;
    a {
      text-decoration: none;
      color: white;
      border-bottom: 2px transparent solid;
      transition: 0.3s ease border;

      &:hover {
        border-bottom: 2px var(--blue) solid;
      }
    }
  }
`;

export default Nav;
