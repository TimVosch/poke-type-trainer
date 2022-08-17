import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import {
  PokeType,
  pokeTypes,
  typeColor,
  randomType,
  getScore,
} from "./poketypes";
import createStore from "zustand";
import "./style.css";

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const generateSet = () => {
  const set = shuffle(Array.from(pokeTypes));
  const foe = set.pop();
  const opts = set.splice(0, 4);

  while (set.length > 0 && !opts.some((typ) => getScore(foe, typ) > 0)) {
    opts[0] = set.pop();
  }

  return { foe, opts: shuffle(opts) };
};

const initialSet = generateSet();

interface ScoreState {
  mode: "pending" | "playing";
  score: number;
  remaining: number;
  startTime: number;
  finishTime: number;
  foe: PokeType;
  options: PokeType[];
  guess(ix: number): void;
  play(): void;
}
const useScore = createStore<ScoreState>((set, get) => ({
  mode: "pending",
  score: 0,
  remaining: 10,
  foe: initialSet.foe,
  options: initialSet.opts,
  startTime: 0,
  finishTime: 0,

  guess: (ix: number) => {
    const { remaining, score, foe, options } = get();
    const typ = options[ix];
    const newScore = score + getScore(foe, typ);

    // Finished
    if (remaining === 1) {
      set((state) => ({
        finishTime: Date.now() - state.startTime,
        mode: "pending",
      }));
    }

    console.log(`You chose '${typ}' against '${foe}' and scored: ${newScore}`);
    const { foe: newFoe, opts: newOptions } = generateSet();

    set((state) => ({
      score: newScore,
      foe: newFoe,
      options: newOptions,
      remaining: state.remaining - 1,
    }));
  },
  play: () => {
    set((state) => ({
      mode: "playing",
      score: 0,
      remaining: 10,
      startTime: Date.now(),
    }));
  },
}));

const ScoreCard = () => {
  const score = useScore((state) => state.score);
  const time = useScore((state) => state.finishTime);
  const remaining = useScore((state) => state.remaining);

  return (
    <div class="mt-4 p-6 flex flex-row gap-4 rounded-xl bg-white shadow-md overflow-hidden">
      <span>Score: {score}</span>
      <span>Time: {time / 1000}</span>
      <span>Remaining: {remaining}</span>
    </div>
  );
};
const GameCard = () => {
  const score = useScore((state) => state.score);
  const foe = useScore((state) => state.foe);
  const options = useScore((state) => state.options);
  const guess = useScore((state) => state.guess);

  return (
    <div class="flex flex-col rounded-xl bg-white shadow-md overflow-hidden">
      {/* Header containing type */}
      <div
        class="w-full h-[200px] flex justify-center items-center text-4xl text-white font-bold"
        style={{ backgroundColor: typeColor(foe as any) }}
      >
        {foe}
      </div>
      {/* Available options */}
      <div class="w-full flex flex-col">
        {options.map((opt, ix) => (
          <span
            key={opt}
            onClick={(e) => {
              e.preventDefault();
              guess(ix);
            }}
            class="block text-center py-6 cursor-pointer text-2xl border-b last-of-type:border-0"
            style={{ color: typeColor(opt as any) }}
          >
            {opt}
          </span>
        ))}
      </div>
    </div>
  );
};

const PendingCard = () => {
  const play = useScore((state) => state.play);
  return (
    <div
      class="flex justify-center items-center p-6 text-white bg-blue-400 rounded-xl bg-white shadow-md overflow-hidden cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        play();
      }}
    >
      <h1 class="hidden xl:block text-4xl font-semibold">
        Press 'Space' to start
      </h1>
      <h1 class="xl:hidden text-4xl font-semibold">Click to start</h1>
    </div>
  );
};

const App = () => {
  const mode = useScore((state) => state.mode);
  const play = useScore((state) => state.play);
  const guess = useScore((state) => state.guess);

  const onKeyDown = (e: KeyboardEvent) => {
    console.log(e.code, { mode });
    if (mode === "pending" && e.code === "Space") {
      return play();
    }

    if (mode === "playing") {
      switch (e.code) {
        case "Digit1":
          return guess(0);
        case "Digit2":
          return guess(1);
        case "Digit3":
          return guess(2);
        case "Digit4":
          return guess(3);
      }
    }
  };

  // Handle keyboard inputs
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mode]);

  return (
    <div class="w-full mx-4 xl:w-[960px] xl:mx-auto mt-12">
      {mode === "pending" ? <PendingCard /> : null}
      {mode === "playing" ? <GameCard /> : null}
      <ScoreCard />
    </div>
  );
};

render(<App />, document.getElementById("app") as HTMLElement);
