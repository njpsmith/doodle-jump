// import { useEffect, useState } from 'react';

// export const useTiltControl = () => {
// 	const [tilt, setTilt] = useState(0); // gamma: left/right tilt

// 	useEffect(() => {
// 		function handleOrientation(event) {
// 			const gamma = event.gamma; // -90 (tilt left) to 90 (tilt right)
// 			setTilt(gamma);
// 		}

// 		// // Request permission on iOS
// 		// if (typeof DeviceOrientationEvent !== 'undefined' &&
// 		//    typeof DeviceOrientationEvent.requestPermission === 'function') {
// 		//   const permission = await DeviceOrientationEvent.requestPermission();
// 		// }

// 		window.addEventListener('deviceorientation', handleOrientation);

// 		return () => {
// 			window.removeEventListener('deviceorientation', handleOrientation);
// 		};
// 	}, []);

// 	return tilt;
// };
