export function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}

export function clamp(val, min, max) {
	return Math.max(min, Math.min(max, val));
}
