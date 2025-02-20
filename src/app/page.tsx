"use client";

import { MetaballText } from "./components/MetaballText";

const text = "Gardberg"
const margin = 100
const dotDensity = 0.055

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <MetaballText
          text={text}
          font="Fondamento"
          fontSize={250}
          dotDensity={dotDensity}
          dotSize={26}
          color="#1b0cc5"
          debug={false}
          alpha={1}
          margin={margin}
        />
      </div>
      <div>
        <MetaballText
          text={text}
          font="Fondamento"
          fontSize={250}
          dotDensity={dotDensity}
          dotSize={34}
          color="#1b0cc5"
          debug={false}
          alpha={1}
          margin={margin}
        />
      </div>
      <div>
        <MetaballText
          text={text}
          font="Fondamento"
          fontSize={250}
          dotDensity={dotDensity}
          dotSize={50}
          color="#1b0cc5"
          debug={false}
          alpha={1}
          margin={margin}
        />
      </div>
    </div>
  );
}
