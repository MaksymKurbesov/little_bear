import BearSkin1 from "../images/skins/timber.png";
import BearSkin2 from "../images/skins/brickn.png";
import BearSkin3 from "../images/skins/neyon.png";
import BearSkin4 from "../images/skins/brizzy.png";
import BearSkin5 from "../images/skins/aztron.png";
import OpenedBearSkin1 from "../images/skins/timber.png";
import OpenedBearSkin2 from "../images/skins/brickn-opened.png";
import OpenedBearSkin3 from "../images/skins/neyon-opened.png";
import OpenedBearSkin4 from "../images/skins/brizzy-opened.png";
import OpenedBearSkin5 from "../images/skins/aztron-opened.png";

export const POINTS_TO_ADD = [1, 3, 5, 7, 10];

export const SKINS = [
  {
    id: 1,
    image: BearSkin1,
    openedImage: OpenedBearSkin1,
    requiredPoints: 0,
    colorCN: "color-brown",
    points: 1,
  },
  {
    id: 2,
    image: BearSkin2,
    openedImage: OpenedBearSkin2,
    requiredPoints: 20000,
    colorCN: "color-red",
    points: 3,
  },
  {
    id: 3,
    image: BearSkin5,
    openedImage: OpenedBearSkin5,
    requiredPoints: 60000,
    colorCN: "color-white",
    points: 5,
  },
  {
    id: 4,
    image: BearSkin4,
    openedImage: OpenedBearSkin4,
    requiredPoints: 120000,
    colorCN: "color-green",
    points: 7,
  },
  {
    id: 5,
    image: BearSkin3,
    openedImage: OpenedBearSkin3,
    requiredPoints: 200000,
    colorCN: "color-purple",
    points: 10,
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

export const levelThresholds = [0, 20000, 60000, 120000, 200000];
