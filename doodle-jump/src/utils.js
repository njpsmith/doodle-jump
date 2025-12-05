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
