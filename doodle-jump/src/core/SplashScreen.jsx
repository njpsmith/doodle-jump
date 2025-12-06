import { useState, useEffect } from 'react';
import { isMobile } from '../utils';
import Leaderboard from './Leaderboard';

const SplashScreen = ({ setStartGame, startGame, highScores }) => {
	const isDeviceMobile = isMobile();

	// values will be: null | "granted" | "denied"
	const [motionPermision, setMotionPermission] = useState(false);

	// Read permission on load (in case user already allowed it)
	useEffect(() => {
		if (
			'DeviceOrientationEvent' in window &&
			typeof DeviceOrientationEvent.requestPermission !== 'function'
		) {
			// Android / non-iOS — no permission flow
			setMotionPermission('granted');
		}
	}, []);

	return (
		<div className={`splash-screen grid ${!startGame && 'display'}`}>
			<h1>Doodle Jump (clone)</h1>
			<h2>Created by Nicholas Smith</h2>

			<button onClick={setStartGame}>Play</button>

			<Leaderboard highScores={highScores} />

			{isDeviceMobile && motionPermision !== 'granted' && (
				<button
					onClick={async () => {
						if (window.DeviceOrientationEvent?.requestPermission) {
							const res =
								await window.DeviceOrientationEvent.requestPermission();
							console.log('Motion permission', res);
							setMotionPermission(res);
						}
					}}
				>
					Enable Motion Controls
				</button>
			)}
		</div>
	);
};

export default SplashScreen;
