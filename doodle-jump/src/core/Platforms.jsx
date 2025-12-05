import { useEffect, useRef } from 'react';

const PLATFORM_HEIGHT = 15;
const PLATFORM_WIDTH = 80;

const Platforms = ({ platformRef }) => {
	function randomRange(min, max) {
		return Math.random() * (max - min) + min;
	}

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
				>
					{i}
				</div>
			))}
		</>
	);
};

export default Platforms;
