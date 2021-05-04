import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "@popmotion/popcorn";

const COLORS = [
  "var(--red)",
  "var(--blue)",
  "var(--black)",
  "var(--purp)",
  "var(--green)",
];

const variants = {
  enter: {
    x: 1000,
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -1000,
    opacity: 0,
  },
};

function Slideshow() {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (direction) => {
    setPage([page + direction, direction]);
  };

  const index = wrap(0, COLORS.length, page);

  return (
    <div style={{ position: "relative", height: 400 }}>
      <AnimatePresence>
        <motion.div
          drag="x"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          key={page}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            console.log("~~offset.x", offset.x);
            if (offset.x > 300) {
              paginate(-1);
            } else if (offset.x < -300) {
              paginate(1);
            }
          }}
          style={{
            height: 400,
            width: "100%",
            background: COLORS[index],
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Slideshow;
