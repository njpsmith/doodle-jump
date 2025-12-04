import { useEffect, useRef, useState } from 'react';
import Platforms from './Platforms';

const ACCELERATION = 1600; // px/s²
const FRICTION = 0.92; // multiplies velocity per frame

// const PLATFORM_HEIGHT = 15;
// const PLATFORM_WIDTH = 80 ;
const PLATFORM_HEIGHT = 11;
const PLATFORM_WIDTH = 60;

const OUT_OF_BOUNDS_HEIGHT = 650;

const SCROLL_THRESHOLD = 220; // px

// const DOOD_WIDTH = 87;
// const DOOD_HEIGHT = 85;
const DOOD_WIDTH = 60;
const DOOD_HEIGHT = 60;
// const DOOD_WIDTH = 50; // ball
// const DOOD_HEIGHT = 50;

const Game = ({
	setIsGameOver,
	resetGame,
	setResetGame,
	setScore,
	// setMaxHeight,
	// maxHeight,
}) => {
	const [tick, setTick] = useState(0);
	// const [isSquished, setIsSquished] = useState(false);

	const platformRef = useRef([
		{ x: 155, y: 480, width: PLATFORM_WIDTH, touched: false },
		{ x: 250, y: 350, width: PLATFORM_WIDTH, touched: false },
	]);

	const lastTimeRef = useRef(performance.now());
	const doodRef = useRef({
		x: 157,
		y: 150,
		velocityX: 0,
		velocityY: 0,
		jumpStrength: -550, // A greater negative number will make dood jump higher
		gravity: 900, // Decreasing gravity will make dood jump higher and fall slower
		horizontalSpeed: 240, // pixels per second
		yPrev: 150,
		direction: 1, // Right
	});

	const inputRef = useRef({
		left: false,
		right: false,
	});

	const run = () => {
		let frameID;

		function gameLoop(time) {
			const dt = (time - lastTimeRef.current) / 1000; // convert ms into seconds
			lastTimeRef.current = time;

			update(dt);
			draw();

			frameID = requestAnimationFrame(gameLoop);
		}

		frameID = requestAnimationFrame(gameLoop);

		return () => {
			cancelAnimationFrame(frameID);
		};
	};

	function endGame() {
		setIsGameOver(true);
	}

	function moveVertically(dood, dt) {
		// --- Vertical movement ---
		dood.yPrev = dood.y; // at the very start of moveVertically()

		dood.velocityY += dood.gravity * dt;
		dood.y += dood.velocityY * dt;

		// --- Platform collisions (only when falling) ---
		if (dood.velocityY > 0) {
			for (const p of platformRef.current) {
				// Vertical overlap (touching the top surface)
				// const tolerance = 5; // 5px tolerance

				const previousFeetY = dood.yPrev + DOOD_HEIGHT;
				const currentFeetY = dood.y + DOOD_HEIGHT;

				// Instead of just checking dood's feet position (feetY) against p.y at the current frame, check if dood passes through the platform between the previous and current frame. This prevents missed collisions, which can happen when dood’s vertical velocity is high enough that, in a single frame, his feet move from above the platform to below it, without your collision check ever triggering.
				const touching =
					dood.velocityY > 0 && // only when falling
					currentFeetY >= p.y && // currently below or at platform
					previousFeetY <= p.y && // was above platform last frame
					dood.x + DOOD_WIDTH > p.x && // horizontal overlap
					dood.x < p.x + p.width;

				if (touching) {
					// Place dood exactly on top of the platform
					dood.y = p.y - DOOD_HEIGHT;

					// Bounce
					dood.velocityY = dood.jumpStrength;

					// Scoring
					if (p.touched) return;
					p.touched = true; // you have landed on ('touched') the platform

					const platformHeightScore = 600 - p.y;

					// setMaxHeight((prev) =>
					// 	Math.round(Math.max(prev, platformHeightScore)),
					// );
					setScore((prev) => (prev += Math.round(platformHeightScore)));

					setTick((t) => t + 1); // triggers a re-render

					// setIsSquished(true);
					// Remove squish after 150ms
					// setTimeout(() => setIsSquished(false), 150);
				}
			}
		}

		// Check if dood fell off the bottom
		if (dood.y > OUT_OF_BOUNDS_HEIGHT) {
			endGame();
			dood.y = 650; // stop dood moving
			// dood.velocityY = dood.jumpStrength; // bounce upward
		}

		// if (dood.y < dood.maxHeight) {
		// 	dood.velocityY = dood.gravity * 0.1; // start falling
		// }

		if (dood.y < SCROLL_THRESHOLD) {
			// console.log('ABOVE THRESHOLD OF', SCROLL_THRESHOLD);
			const shift = SCROLL_THRESHOLD - dood.y; // how much dood has moved above threshold
			// console.log('shift', shift);
			dood.y = SCROLL_THRESHOLD; // keep doodler at threshold

			// Move all platforms down by the same amount
			platformRef.current.forEach((p) => {
				p.y += shift;
			});

			setTick((t) => t + 1); // triggers a re-render
		}
	}

	function moveHorizontally(dood, dt, input) {
		// --- Horizontal movement ---
		// const horizontalSpeed = dood.horizontalSpeed;
		if (input.left) {
			// dood.x -= horizontalSpeed * dt;
			dood.velocityX -= ACCELERATION * dt;
		}
		if (input.right) {
			// dood.x += horizontalSpeed * dt;
			dood.velocityX += ACCELERATION * dt;
		}

		// Apply friction
		dood.velocityX *= FRICTION;

		// Update position
		dood.x += dood.velocityX * dt;

		// Optional: clamp so dood stays in the screen
		if (dood.x < 0) {
			dood.x = 0;
			dood.velocityX = 0;
		}
		if (dood.x > 400 - DOOD_WIDTH) {
			dood.x = 400 - DOOD_WIDTH; // 400 = grid width
			dood.velocityX = 0;
		}
	}

	// This update() function essentially "one frame of physics". All movement and collisions are updated here
	const update = (dt) => {
		const dood = doodRef.current;
		const input = inputRef.current;

		moveHorizontally(dood, dt, input);

		moveVertically(dood, dt);
	};

	const draw = () => {
		const input = inputRef.current;
		const dood = doodRef.current;
		const doodElem = document.getElementById('dood');

		if (input.right) dood.direction = 1;
		if (input.left) dood.direction = -1;

		doodElem.style.transform = `translate(${dood.x}px, ${dood.y}px) scaleX(${dood.direction})`;

		// Remove platforms that have gone off the bottom of the screen
		platformRef.current = platformRef.current.filter((p) => p.y < 600);

		// Add new platform at top
		if (platformRef.current.length < 6) {
			const newPlatform = {
				x: randomRange(30, 370),
				// y: 0,
				y: randomRange(-35, -15),
				width: PLATFORM_WIDTH,
				height: PLATFORM_HEIGHT,
			};
			platformRef.current.push(newPlatform);
		}

		setTick((t) => t + 1); // triggers a re-render
	};

	// function runGameLoop() {
	// 	drawnInitialPlatforms = false;
	// }

	useEffect(() => {
		let frameId;

		function gameLoop(time) {
			const dt = (time - lastTimeRef.current) / 1000;
			lastTimeRef.current = time;

			update(dt);
			draw();

			frameId = requestAnimationFrame(gameLoop);
		}
		frameId = requestAnimationFrame(gameLoop);

		return () => {
			cancelAnimationFrame(frameId);
		};
	}, []);

	// Left/Right controls
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'ArrowLeft' || e.key === 'a') inputRef.current.left = true;
			if (e.key === 'ArrowRight' || e.key === 'd')
				inputRef.current.right = true;
		};

		const handleKeyUp = (e) => {
			if (e.key === 'ArrowLeft' || e.key === 'a') inputRef.current.left = false;
			if (e.key === 'ArrowRight' || e.key === 'd')
				inputRef.current.right = false;
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	function randomRange(min, max) {
		return Math.random() * (max - min) + min;
	}

	// generate a random number between 30 and 130 or between 250 and 370. This is the range either side of dood
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

	let drawnInitialPlatforms = false;

	useEffect(() => {
		if (!drawnInitialPlatforms) {
			const xPositionNotInLineWithDood = randomFromTwoRanges();
			// console.log('xPositionNotInLineWithDood', xPositionNotInLineWithDood);

			const p3 = {
				x: xPositionNotInLineWithDood,
				// x: 295,
				y: 250,
				width: PLATFORM_WIDTH,
				height: PLATFORM_HEIGHT,
				touched: false,
			};

			const p4 = {
				x: randomRange(40, 320),
				y: 600 - 6 * 80,
				width: PLATFORM_WIDTH,
				height: PLATFORM_HEIGHT,
				touched: false,
			};

			const p5 = {
				x: randomRange(30, 370),
				y: randomRange(20, 40),
				width: PLATFORM_WIDTH,
				height: PLATFORM_HEIGHT,
			};

			platformRef.current.push(p3);
			platformRef.current.push(p4);
			platformRef.current.push(p5);

			// console.log('platformRef.current ', platformRef.current);

			setTick((t) => t + 1); // triggers a re-render
		}

		drawnInitialPlatforms = true;
	}, []);

	useEffect(() => {
		if (!resetGame) return;

		// Reset dood position
		doodRef.current.x = 157;
		doodRef.current.y = 150;
		doodRef.current.velocityX = 0;
		doodRef.current.velocityY = 0;
		doodRef.current.yPrev = 150;
		doodRef.current.direction = 1;

		const doodElem = document.getElementById('dood');
		doodElem.style.transform = `translate(0px, 0px) scaleX(1)`;

		// Reset platforms

		setResetGame(false);
	}, [resetGame]);

	return (
		<>
			<Platforms doodRef={doodRef} platformRef={platformRef} />
			{<div id="dood" className="doodler"></div>}

			{/*<div id="dood" className="doodler">
				<div className={`ball ${isSquished ? 'squish' : ''}`}></div>
			</div>*/}
		</>
	);
};

export default Game;
