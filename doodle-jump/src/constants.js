const PLATFORM_HEIGHT = 11;
const PLATFORM_WIDTH = 60;

const xPositionNotInLineWithDood = randomFromTwoRanges();

function randomFromTwoRanges() {
	// Pick which range: 0 = first, 1 = second
	const rangeChoice = Math.random() < 0.5 ? 0 : 1;
	// const rangeChoice = 0;

	if (rangeChoice === 0) {
		// First range: 30–130
		return Math.random() * (50 - 30) + 30;
	} else {
		// Second range: 250–370
		return Math.random() * (295 - 265) + 265;
	}
}

function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}

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
