export const pokeTypes = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
] as const;
export type PokeType = typeof pokeTypes[number];

interface PokeTypeInfo {
  immunes: PokeType[];
  weaknesses: PokeType[];
  strengths: PokeType[];
}

const typeInfo: Record<PokeType, PokeTypeInfo> = {
  Normal: {
    immunes: ["Ghost"],
    weaknesses: ["Rock", "Steel"],
    strengths: [],
  },
  Fire: {
    immunes: [],
    weaknesses: ["Fire", "Water", "Rock", "Dragon"],
    strengths: ["Grass", "Ice", "Bug", "Steel"],
  },
  Water: {
    immunes: [],
    weaknesses: ["Water", "Grass", "Dragon"],
    strengths: ["Fire", "Ground", "Rock"],
  },
  Electric: {
    immunes: ["Ground"],
    weaknesses: ["Electric", "Grass", "Dragon"],
    strengths: ["Water", "Flying"],
  },
  Grass: {
    immunes: [],
    weaknesses: ["Fire", "Grass", "Poison", "Flying", "Bug", "Dragon", "Steel"],
    strengths: ["Water", "Ground", "Rock"],
  },
  Ice: {
    immunes: [],
    weaknesses: ["Fire", "Water", "Ice", "Steel"],
    strengths: ["Grass", "Ground", "Flying", "Dragon"],
  },
  Fighting: {
    immunes: ["Ghost"],
    weaknesses: ["Poison", "Flying", "Psychic", "Bug", "Fairy"],
    strengths: ["Normal", "Ice", "Rock", "Dark", "Steel"],
  },
  Poison: {
    immunes: ["Steel"],
    weaknesses: ["Poison", "Ground", "Rock", "Ghost"],
    strengths: ["Grass", "Fairy"],
  },
  Ground: {
    immunes: ["Flying"],
    weaknesses: ["Grass", "Bug"],
    strengths: ["Fire", "Electric", "Poison", "Rock", "Steel"],
  },
  Flying: {
    immunes: [],
    weaknesses: ["Electric", "Rock", "Steel"],
    strengths: ["Grass", "Fighting", "Bug"],
  },
  Psychic: {
    immunes: ["Dark"],
    weaknesses: ["Psychic", "Steel"],
    strengths: ["Fighting", "Poison"],
  },
  Bug: {
    immunes: [],
    weaknesses: [
      "Fire",
      "Fighting",
      "Poison",
      "Flying",
      "Ghost",
      "Steel",
      "Fairy",
    ],
    strengths: ["Grass", "Psychic", "Dark"],
  },
  Rock: {
    immunes: [],
    weaknesses: ["Fighting", "Ground", "Steel"],
    strengths: ["Fire", "Ice", "Flying", "Bug"],
  },
  Ghost: {
    immunes: ["Normal"],
    weaknesses: ["Dark"],
    strengths: ["Psychic", "Ghost"],
  },
  Dragon: {
    immunes: ["Fairy"],
    weaknesses: ["Steel"],
    strengths: ["Dragon"],
  },
  Dark: {
    immunes: [],
    weaknesses: ["Fighting", "Dark", "Fairy"],
    strengths: ["Psychic", "Ghost"],
  },
  Steel: {
    immunes: [],
    weaknesses: ["Fire", "Water", "Electric", "Steel"],
    strengths: ["Ice", "Rock", "Fairy"],
  },
  Fairy: {
    immunes: [],
    weaknesses: ["Fire", "Poison", "Steel"],
    strengths: ["Fighting", "Dragon", "Dark"],
  },
};

const colors: Record<PokeType, string> = {
  Normal: "#aa9",
  Fire: "#f42",
  Water: "#39f",
  Electric: "#fc3",
  Grass: "#7c5",
  Ice: "#6cf",
  Fighting: "#b54",
  Poison: "#a59",
  Ground: "#db5",
  Flying: "#89f",
  Psychic: "#f59",
  Bug: "#ab2",
  Rock: "#ba6",
  Ghost: "#66b",
  Dragon: "#76e",
  Dark: "#754",
  Steel: "#aab",
  Fairy: "#e9e",
};

export function typeColor(t: PokeType): string {
  return colors[t];
}

export function randomType(): PokeType {
  return pokeTypes[Math.floor(Math.random() * pokeTypes.length)];
}

export function getScore(foe: PokeType, opt: PokeType): number {
  const optInfo = typeInfo[opt];
  if (optInfo.immunes.includes(foe)) {
    return -2;
  } else if (optInfo.weaknesses.includes(foe)) {
    return -1;
  } else if (optInfo.strengths.includes(foe)) {
    return 1;
  }
  return 0;
}
