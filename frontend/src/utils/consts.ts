import BearSkin1 from "../images/skins/timber.png";
import BearSkin2 from "../images/skins/brickn.png";
import BearSkin3 from "../images/skins/neyon.png";
import OpenedBearSkin1 from "../images/skins/timber.png";
import OpenedBearSkin2 from "../images/skins/brickn-opened.png";
import OpenedBearSkin3 from "../images/skins/neyon-opened.png";

export const POINTS_TO_ADD = 11;

export const SKINS = [
  {
    id: 1,
    image: BearSkin1,
    openedImage: OpenedBearSkin1,
    requiredPoints: 0,
    colorCN: "color-blue",
  },
  {
    id: 2,
    image: BearSkin2,
    openedImage: OpenedBearSkin2,
    requiredPoints: 5000,
    colorCN: "color-red",
  },
  {
    id: 3,
    image: BearSkin3,
    openedImage: OpenedBearSkin3,
    requiredPoints: 15000,
    colorCN: "color-green",
  },
];

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

export const levelThresholds = [0, 5000, 15000, 25000, 100000, 1000000];
