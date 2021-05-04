import React, { useState } from "react";
import { motion } from "framer-motion";
import shuffle from "lodash/shuffle";

const COLORS = [
  "var(--red)",
  "var(--blue)",
  "var(--black)",
  "var(--purp)",
  "var(--green)",
];

function Squares() {
  const [colorsList, setColorsList] = useState(COLORS);

  return (
    <div>
      <button onClick={() => setColorsList(shuffle(colorsList))}>
        Shuffle
      </button>
      {colorsList.map((color) => (
        <motion.div
          key={color}
          positionTransition={{
            damping: 100,
            stiffness: 1,
          }}
          style={{
            background: color,
            height: 100,
            width: 100,
          }}
        />
      ))}
    </div>
  );
}

export default Squares;
