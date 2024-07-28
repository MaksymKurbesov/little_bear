const levelNames = [
  "Bronze", // From 0 to 4999 coins
  "Silver", // From 5000 coins to 24,999 coins
  "Gold", // From 25,000 coins to 99,999 coins
  "Platinum", // From 100,000 coins to 999,999 coins
  "Diamond", // From 1,000,000 coins to 2,000,000 coins
  "Epic", // From 2,000,000 coins to 10,000,000 coins
  "Legendary", // From 10,000,000 coins to 50,000,000 coins
  "Master", // From 50,000,000 coins to 100,000,000 coins
  "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
  "Lord", // From 1,000,000,000 coins to ∞
];

export const LEVELS_BY_POINTS: { [key: number]: string } = {
  0: "Bronze", // From 0 to 4999 coins
  5000: "Silver", // From 5000 coins to 24,999 coins
  25000: "Gold", // From 25,000 coins to 99,999 coins
  100000: "Platinum", // From 25,000 coins to 99,999 coins
  1000000: "Diamond", // From 25,000 coins to 99,999 coins
  2000000: "Epic", // From 25,000 coins to 99,999 coins
  10000000: "Legendary", // From 25,000 coins to 99,999 coins
  50000000: "Master", // From 25,000 coins to 99,999 coins
  100000000: "GrandMaster", // From 25,000 coins to 99,999 coins
};

export const DAILY_REWARDS = [
  `500`,
  `1K`,
  `2.5K`,
  `5K`,
  `15K`,
  `25K`,
  `100K`,
  `500K`,
  `1M`,
  `5M`,
];

export const DAILY_REWARDS_BY_DAY: { [key: string]: number } = {
  0: 500,
  1: 1000,
  2: 2500,
  3: 5000,
  4: 15000,
  5: 25000,
  6: 100000,
  7: 500000,
  8: 1000000,
  9: 5000000,
};
