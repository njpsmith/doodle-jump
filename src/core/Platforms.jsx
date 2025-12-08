import { useEffect, useRef } from 'react';
import { randomRange, randomFromTwoRanges } from '../utils';
import { PLATFORM_WIDTH, PLATFORM_HEIGHT } from '../constants';

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
		y: randomRange(30, 40),
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

const Platforms = ({ platformRef }) => {
	return (
		<>
			{platformRef.current.map((p, i) => (
				<div
					key={`${i}-${p.y}`}
					id={`platform-${i}`}
					className="platform"
					style={{
						left: `${p.x}px`,
						top: `${p.y}px`,
					}}
				></div>
			))}
		</>
	);
};

export default Platforms;
