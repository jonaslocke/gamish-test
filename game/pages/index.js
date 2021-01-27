import { useEffect, useState } from "react";
import Hero from "../components/hero";

export default function Home() {
  const [path, setPath] = useState([true, ...new Array(9).fill(false)]);
  const [direction, setDirection] = useState(" right");
  const getPosition = () => path.indexOf(true) || 0;

  const move = (to) => {
    setPath([...path.map((block, id) => (id == to ? true : false))]);
  };
  const moveFoward = (to) => {
    setDirection(" right");
    const nextMove =
      getPosition() + 1 >= path.length ? path.length - 1 : getPosition() + 1;

    setPath([...path.map((block, id) => (id == nextMove ? true : false))]);
  };
  const moveBackward = (to) => {
    setDirection(" left");
    const nextMove = getPosition() == 0 ? 0 : getPosition() - 1;

    setPath([...path.map((block, id) => (id == nextMove ? true : false))]);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key == "d") {
        return moveFoward();
      }
    });
  }, []);
  return (
    <>
      <h1>hero's path</h1>
      <div className="path">
        {path.map((block, i) => {
          return !block ? (
            <div className="block" key={i}></div>
          ) : (
            <div className={`block${direction}`} key={i}>
              <Hero></Hero>
            </div>
          );
        })}
      </div>
      <button onClick={() => moveBackward()}>LEFT</button>
      <button onClick={() => moveFoward()}>RIGHT</button>
    </>
  );
}
