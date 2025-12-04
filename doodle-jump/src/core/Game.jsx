import { useEffect, useRef } from 'react';
import Platforms from './Platforms';

const ACCELERATION = 1600; // px/s²
const FRICTION = 0.92; // multiplies velocity per frame

const PLATFORM_HEIGHT = 15;
const PLATFORM_WIDTH = 80;

const doodWidth = 87;
const doodHeight = 85;

const Game = ({ setIsGameOver }) => {
	let direction = 1; // Right

	const platformRef = useRef([
		{ x: 155, y: 480, width: PLATFORM_WIDTH },
		{ x: 250, y: 350, width: PLATFORM_WIDTH },
	]);

	const lastTimeRef = useRef(performance.now());
	const doodRef = useRef({
		x: 157,
		y: 150,
		velocityX: 0,
		velocityY: 0,
		minHeight: 300,
		maxHeight: 100,

		jumpStrength: -550, // A greater negative number will make dood jump higher
		gravity: 900, // Decreasing gravity will make dood jump higher and fall slower

		horizontalSpeed: 240, // pixels per second
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
		dood.velocityY += dood.gravity * dt;
		dood.y += dood.velocityY * dt;

		// --- Platform collisions (only when falling) ---
		if (dood.velocityY > 0) {
			for (const p of platformRef.current) {
				const withinX = dood.x + doodWidth > p.x && dood.x < p.x + p.width;

				// console.log('withinX', withinX);
				// console.log('dood.x + doodWidth > p.x', dood.x + doodWidth > p.x);
				// console.log('dood.x < p.x + p.width', dood.x < p.x + p.width);
				// console.log('dood.x ', dood.x); // 157
				// console.log('p.x ', p.x);
				// console.log('p.width ', p.width);

				// Where dood’s feet are
				const feetY = dood.y + doodHeight;
				// console.log('feetY', feetY);
				// console.log('p.y', p.y);

				// Vertical overlap (touching the top surface)
				const tolerance = 5; // 5px tolerance
				const touching =
					feetY >= p.y - tolerance &&
					feetY <= p.y + tolerance &&
					dood.velocityY > 0;

				console.log('touching', touching);
				// console.log('feetY >= p.y', feetY >= p.y);
				// console.log('feetY <= p.y + 10', feetY <= p.y + 10);
				// console.log('withinX && touching', withinX, touching);

				if (withinX && touching) {
					// console.log('withinX && touching', withinX, touching);
					// Place dood exactly on top of the platform
					dood.y = p.y - doodHeight;

					// Bounce
					dood.velocityY = dood.jumpStrength;
				}
			}
		}

		// Switch direction at limits
		// if (dood.y > dood.minHeight) {
		// 	// endGame();
		// 	// dood.y = 650; // stop dood moving
		// 	dood.velocityY = dood.jumpStrength; // bounce upward
		// }

		// if (dood.y < dood.maxHeight) {
		// 	dood.velocityY = dood.gravity * 0.1; // start falling
		// }
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
		if (dood.x > 400 - 87) {
			dood.x = 400 - 87; // 400 = grid width, 87 = dood width
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

		if (input.right) direction = 1;
		if (input.left) direction = -1;

		doodElem.style.transform = `translate(${dood.x}px, ${dood.y}px) scaleX(${direction})`;
	};

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

	return (
		<>
			<Platforms doodRef={doodRef} platformRef={platformRef} />
			<div id="dood" className="doodler"></div>
		</>
	);
};

export default Game;
