"use client";

import { MetaballText } from "./components/MetaballText";

const text = "Gardberg"
const margin = 100
const dotDensity = 0.055
export default function Home() {
  return (
    <div className="">
      <div className="flex justify-center items-center">
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

      <div className="flex justify-start items-center pl-40">
        <div style={{ fontFamily: "serif" }}>
          <div className="flex flex-col space-y-2">
            <a href="https://github.com/gardberg">github</a>
            <a href="https://www.linkedin.com/in/lukas-gardberg/">linkedin</a>
            <a href="/about">about me</a>
          </div>
        </div>
      </div>

    </div>
  );
}
