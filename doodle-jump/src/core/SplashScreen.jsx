import { isMobile } from '../utils';

const SplashScreen = ({ setStartGame, startGame, highScores }) => {
	const isDeviceMobile = isMobile();

	return (
		<div className={`splash-screen grid ${!startGame && 'display'}`}>
			<h1>Doodle Jump (clone)</h1>
			<h2>Created by Nicholas Smith</h2>

			<button onClick={setStartGame}>Play</button>

			<div className="high-score">
				High scores:
				<ol>
					{highScores.map((score, i) => (
						<li key={i}>
							{score.name}: {score.score}
						</li>
					))}
				</ol>
			</div>

			{isDeviceMobile && (
				<button
					onClick={async () => {
						if (window.DeviceOrientationEvent?.requestPermission) {
							const res =
								await window.DeviceOrientationEvent.requestPermission();
							console.log(res);
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
