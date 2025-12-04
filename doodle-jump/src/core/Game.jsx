import { useEffect, useRef } from 'react';

const ACCELERATION = 1600; // px/s²
const FRICTION = 0.92; // multiplies velocity per frame

const Game = () => {
	let direction = 1; // Right

	const lastTimeRef = useRef(performance.now());
	const doodRef = useRef({
		x: 157,
		y: 300,
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

	// This update() function essentially "one frame of physics". All movement and collisions are updated here
	const update = (dt) => {
		const dood = doodRef.current;
		const input = inputRef.current;

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
		// --- Vertical movement ---
		dood.velocityY += dood.gravity * dt;
		dood.y += dood.velocityY * dt;

		// Switch direction at limits
		if (dood.y > dood.minHeight) {
			dood.velocityY = dood.jumpStrength; // bounce upward
		}

		if (dood.y < dood.maxHeight) {
			dood.velocityY = dood.gravity * 0.1; // start falling
		}
	};

	const draw = () => {
		const input = inputRef.current;
		const dood = doodRef.current;
		const doodElem = document.getElementById('dood');
		// doodElem.style.transform = `translateY(${dood.y}px)`;

		if (input.right) direction = 1;
		if (input.left) direction = -1;

		doodElem.style.transform = `translate(${dood.x}px, ${dood.y}px) scaleX(${direction})`;

		// if (input.left) {
		// 	console.log('move lefttttt');
		// 	doodElem.style.transform = ``;

		// 	doodElem.style.transform = `translate(${dood.x}px, ${dood.y}px) scaleX(-1)`;
		// }
		// if (input.right) {
		// 	doodElem.style.transform = `translate(${dood.x}px, ${dood.y}px) scaleX(1)`;
		// }
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
			<div id="dood" className="doodler"></div>
		</>
	);
};

export default Game;
