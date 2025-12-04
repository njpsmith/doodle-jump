// (keyboard + touch abstraction)

export default class Input {
	constructor() {
		this.keys = { left: false, right: false };

		window.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowLeft' || e.key === 'a') this.keys.left = true;
			if (e.key === 'ArrowRight' || e.key === 'd') this.keys.right = true;
		});

		window.addEventListener('keyup', (e) => {
			if (e.key === 'ArrowLeft' || e.key === 'a') this.keys.left = false;
			if (e.key === 'ArrowRight' || e.key === 'd') this.keys.right = false;
		});
	}
}
