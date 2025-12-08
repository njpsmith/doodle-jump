export const isMobile = () => {
	return (
		'ontouchstart' in window && window.matchMedia('(max-width: 850px)').matches
	);
};

// export const isMobile = () => {
// 	console.log('TESTING!!');
// 	const hasTouch = navigator.maxTouchPoints > 1;
// 	const smallScreen = window.innerWidth < 900;

// 	return hasTouch && smallScreen;
// };

export function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}

export function randomFromTwoRanges() {
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
