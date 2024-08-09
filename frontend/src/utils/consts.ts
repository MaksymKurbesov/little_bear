import BearSkin1 from "../images/skins/timber.png";
import BearSkin2 from "../images/skins/brickn.png";
import BearSkin3 from "../images/skins/neyon.png";
import OpenedBearSkin1 from "../images/skins/timber.png";
import OpenedBearSkin2 from "../images/skins/brickn-opened.png";
import OpenedBearSkin3 from "../images/skins/neyon-opened.png";

export const POINTS_TO_ADD = [1, 5, 17];

export const SKINS = [
  {
    id: 1,
    image: BearSkin1,
    openedImage: OpenedBearSkin1,
    requiredPoints: 0,
    colorCN: "color-blue",
    points: 1,
  },
  {
    id: 2,
    image: BearSkin2,
    openedImage: OpenedBearSkin2,
    requiredPoints: 5000,
    colorCN: "color-red",
    points: 5,
  },
  {
    id: 3,
    image: BearSkin3,
    openedImage: OpenedBearSkin3,
    requiredPoints: 50000,
    colorCN: "color-green",
    points: 17,
  },
];

export const DAILY_REWARDS = [
  `10`,
  `50`,
  `100`,
  `300`,
  `500`,
  `1000`,
  `2000`,
  `3000`,
  `5000`,
  `10000`,
];

export const DAILY_REWARDS_BY_DAY: { [key: string]: number } = {
  0: 10,
  1: 50,
  2: 100,
  3: 300,
  4: 500,
  5: 1000,
  6: 2000,
  7: 3000,
  8: 5000,
  9: 10000,
};

export const levelThresholds = [0, 5000, 50000, 170000, 330000, 1000000];
