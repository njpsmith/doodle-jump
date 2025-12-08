import { randomFromTwoRanges, randomRange } from './utils';

const PLATFORM_HEIGHT = 11;
const PLATFORM_WIDTH = 60;

const xPositionNotInLineWithDood = randomFromTwoRanges();

export const defaultPlatforms = [
	{ x: 155, y: 480, width: PLATFORM_WIDTH, touched: false },
	{ x: 60, y: 400, width: PLATFORM_WIDTH, touched: false },
	{ x: 250, y: 350, width: PLATFORM_WIDTH, touched: false },
	{ x: 310, y: 300, width: PLATFORM_WIDTH, touched: false },
	{
		x: xPositionNotInLineWithDood,
		y: 250,
		width: PLATFORM_WIDTH,
		height: PLATFORM_HEIGHT,
		touched: false,
	},
	{
		x: randomRange(40, 320),
		y: 200,
		width: PLATFORM_WIDTH,
		height: PLATFORM_HEIGHT,
		touched: false,
	},
	{
		x: randomRange(40, 320),
		y: randomRange(135, 140),
		width: PLATFORM_WIDTH,
		height: PLATFORM_HEIGHT,
		touched: false,
	},
	{
		x: randomRange(40, 320),
		y: randomRange(90, 100),
		width: PLATFORM_WIDTH,
		height: PLATFORM_HEIGHT,
		touched: false,
	},
	{
		x: randomRange(30, 370),
		y: randomRange(25, 40),
		width: PLATFORM_WIDTH,
		height: PLATFORM_HEIGHT,
		touched: false,
	},
	{
		x: randomRange(30, 370),
		y: randomRange(5, 10),
		width: PLATFORM_WIDTH,
		height: PLATFORM_HEIGHT,
		touched: false,
	},
];
