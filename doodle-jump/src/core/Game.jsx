import { useEffect, useRef, useState } from 'react';
import Platforms from './Platforms';
import { useTiltControl } from './TiltControls';
import { isMobile } from '../utils';
import { defaultPlatforms } from '../constants';
import { randomFromTwoRanges, randomRange } from '../utils';
// console.log('defaultPlatforms', defaultPlatforms);
// const tilt = useTiltControl();

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
	startGame,
	setIsGameOver,
	resetGame,
	setResetGame,
	setScore,
	score,
	// isGameOver,
}) => {
	let isGameOver = false;

	// const [platforms, setPlatforms] = useState(defaultPlatforms);

	const [tick, setTick] = useState(0);

	const xPositionNotInLineWithDood = randomFromTwoRanges();
	const platformRef = useRef(defaultPlatforms);

	// const [platformsKey, setPlatformsKey] = useState(0);

	function resetPlatforms() {
		// console.log('CALLING resetPlatforms');
		platformRef.current = [...defaultPlatforms];

		platformRef.current.forEach((p, i) => {
			// console.log('i', i);
			const elem = document.getElementById(`platform-${i}`);
			elem.style.top = `${p.y}px`;
			elem.style.left = `${p.x}px`;
		});

		// console.log('resetPlatforms', platformRef.current);
		// setPlatforms([...defaultPlatforms]);

		// setPlatformsKey((k) => k + 1); // forces Platforms to remount

		// setTick((t) => t + 1); // triggers a re-render
	}

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

	// Because we need the latest score inside a loop that is outside React's render, we must store score in a ref
	const scoreRef = useRef(score);

	useEffect(() => {
		scoreRef.current = score;
	}, [score]);

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
		isGameOver = true;

		// platformRef.current = [];

		// setPlatformsKey((k) => k + 1); // forces Platforms to remount
		// console.log('platformRef.current', platformRef.current);
	}

	// useEffect(() => {
	// 	// Code here runs when the component mounts
	// 	console.log('Mounted isGameOver', isGameOver);

	// 	return () => {
	// 		// Cleanup code runs when the component unmounts
	// 		console.log('Unmounted isGameOver', isGameOver);
	// 	};
	// }, []); // Empty dependency array → runs once on mount and cleanup on unmount

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

		// if (!isGameOver) {
		// console.log('draw', isGameOver);
		// Remove platforms that have gone off the bottom of the screen
		platformRef.current = platformRef.current.filter((p) => p.y < 600);
		generateNewPlatforms();

		setTick((t) => t + 1); // triggers a re-render
		// } else {
		// console.log('reseting plumpas');
		// Game is over - Reset platforms
		// resetPlatforms();
		// }
	};

	function generateNewPlatforms() {
		// Add new platform at top
		if (platformRef.current.length < 10) {
			let x;
			let y;

			// Make game more difficult as score increases
			switch (true) {
				case scoreRef.current > 4000:
					x = randomRange(20, 380);
					y = randomRange(-15, -30);
					break;

				case scoreRef.current > 200:
					x = randomRange(25, 380);
					y = randomRange(-10, -20);
					break;

				default:
					x = randomRange(30, 370);
					y = randomRange(-10, -20);
			}
			const newPlatform = {
				x: x,
				y: y,
				width: PLATFORM_WIDTH,
				height: PLATFORM_HEIGHT,
			};
			platformRef.current.push(newPlatform);
		}
	}

	useEffect(() => {
		if (startGame) {
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
		}
	}, [startGame]);

	// Left/Right controls
	useEffect(() => {
		if (isMobile()) {
			// Motion logic
			function handleOrientation(e) {
				const gamma = e.gamma || 0; // -90 (tilt left) to 90 (tilt right)

				// Define tilt thresholds
				const leftThreshold = -10; // tilt left past -10° → move left
				const rightThreshold = 10; // tilt right past 10° → move right

				// Reset first
				inputRef.current.left = false;
				inputRef.current.right = false;

				// Apply tilt logic
				if (gamma < leftThreshold) {
					inputRef.current.left = true;
				} else if (gamma > rightThreshold) {
					inputRef.current.right = true;
				}

				// Optional: you can expose gamma if you want analog movement speed
				// inputRef.current.tilt = gamma;
			}

			window.addEventListener('deviceorientation', handleOrientation);
			return () =>
				window.removeEventListener('deviceorientation', handleOrientation);
		} else {
			// Desktop
			const handleKeyDown = (e) => {
				if (e.key === 'ArrowLeft' || e.key === 'a')
					inputRef.current.left = true;
				if (e.key === 'ArrowRight' || e.key === 'd')
					inputRef.current.right = true;
			};

			const handleKeyUp = (e) => {
				if (e.key === 'ArrowLeft' || e.key === 'a')
					inputRef.current.left = false;
				if (e.key === 'ArrowRight' || e.key === 'd')
					inputRef.current.right = false;
			};

			window.addEventListener('keydown', handleKeyDown);
			window.addEventListener('keyup', handleKeyUp);

			return () => {
				window.removeEventListener('keydown', handleKeyDown);
				window.removeEventListener('keyup', handleKeyUp);
			};
		}
	}, []);

	// generate a random number between 30 and 130 or between 250 and 370. This is the range either side of dood
	// function randomFromTwoRanges() {
	// 	// Pick which range: 0 = first, 1 = second
	// 	const rangeChoice = Math.random() < 0.5 ? 0 : 1;
	// 	// const rangeChoice = 0;

	// 	if (rangeChoice === 0) {
	// 		// First range: 30–130
	// 		return Math.random() * (50 - 30) + 30;
	// 	} else {
	// 		// Second range: 250–370
	// 		return Math.random() * (295 - 265) + 265;
	// 	}
	// }

	// DELETE THIS?
	let initialRenderTriggered = false;
	useEffect(() => {
		if (!initialRenderTriggered) {
			setTick((t) => t + 1); // triggers a re-render
		}
		initialRenderTriggered = true;
	}, []);

	useEffect(() => {
		if (!resetGame) return;

		isGameOver = false;
		// console.log('resetting game. isGameOver:', isGameOver);

		// resetPlatforms();

		// Reset dood position
		doodRef.current.x = 157;
		doodRef.current.y = 150;
		doodRef.current.velocityX = 0;
		doodRef.current.velocityY = 0;
		doodRef.current.yPrev = 150;
		doodRef.current.direction = 1;

		const doodElem = document.getElementById('dood');
		doodElem.style.transform = `translate(0px, 0px) scaleX(1)`;

		setScore(0);

		setResetGame(false);
	}, [resetGame]);

	return (
		<>
			<Platforms platformRef={platformRef} />
			{<div id="dood" className="doodler"></div>}
		</>
	);
};

export default Game;
