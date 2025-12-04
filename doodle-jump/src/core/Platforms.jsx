import { useEffect, useRef } from 'react';

const PLATFORM_HEIGHT = 15;
const PLATFORM_WIDTH = 80;

const Platforms = ({ doodRef, platformRef }) => {
	useEffect(() => {
		// Starting platforms
		const dood = doodRef.current;

		// Platform 1: directly under dood
		const p1 = {
			x: dood.x - 20, // center-ish
			y: dood.y + 80, // slightly below dood
			width: PLATFORM_WIDTH,
			height: PLATFORM_HEIGHT,
		};

		// Platform 2: 100px above dood and to the side
		const randomOffset =
			(Math.random() < 0.5 ? -1 : 1) * (120 + Math.random() * 100);
		const p2 = {
			x: dood.x + randomOffset,
			y: dood.y - 100,
			width: 85,
			height: 15,
		};

		// platformRef.current = [p1, p2];

		// clamp p2 inside screen
		// platformRef.current.forEach((p) => {
		// 	if (p.x < 0) p.x = 0;
		// 	if (p.x > 400 - p.width) p.x = 400 - p.width;
		// });

		console.log('dood.y + 80', dood.y + 80);
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
