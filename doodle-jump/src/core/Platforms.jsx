import { useEffect, useRef } from 'react';

const PLATFORM_HEIGHT = 15;
const PLATFORM_WIDTH = 80;

const Platforms = ({ doodRef, platformRef }) => {
	function randomRange(min, max) {
		return Math.random() * (max - min) + min;
	}

	useEffect(() => {
		// Starting platforms
		const dood = doodRef.current;

		// Platform 1: directly under dood
		// const p1 = {
		// 	x: dood.x - 20, // center-ish
		// 	y: dood.y + 80, // slightly below dood
		// 	width: PLATFORM_WIDTH,
		// 	height: PLATFORM_HEIGHT,
		// };

		// Platform 2: 100px above dood and to the side
		const randomOffset =
			(Math.random() < 0.5 ? -1 : 1) * (120 + Math.random() * 100);

		// const p2 = {
		// 	x: dood.x + randomOffset,
		// 	y: dood.y - 100,
		// 	width: 85,
		// 	height: 15,
		// };

		const x = randomRange(40, 320);
		const y = 600 - 2 * 80;

		const p3 = {
			x: x,
			y: y,
			width: PLATFORM_WIDTH,
			height: PLATFORM_HEIGHT,
		};

		// console.log('p3 ', p3);

		// platformRef.current = [...platformRef.current, p3];

		// clamp p2 inside screen
		// platformRef.current.forEach((p) => {
		// 	if (p.x < 0) p.x = 0;
		// 	if (p.x > 400 - p.width) p.x = 400 - p.width;
		// });

		// console.log('platformRef.current', platformRef.current);
		// console.log('dood.y + 80', dood.y + 80);
	}, []);

	return (
		<>
			{platformRef.current.map((p, i) => (
				<div
					key={i}
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
