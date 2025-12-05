const SplashScreen = ({ setStartGame, startGame, highScore }) => {
	return (
		<div className={`splash-screen grid ${!startGame && 'display'}`}>
			<h1>Doodle Jump (clone)</h1>
			<h2>Created by Nicholas Smith</h2>

			<button onClick={setStartGame}>Play</button>

			<div className="high-score">High score: {highScore}</div>

			<button
				onClick={async () => {
					if (window.DeviceOrientationEvent?.requestPermission) {
						const res = await window.DeviceOrientationEvent.requestPermission();
						console.log(res);
					}
				}}
			>
				Enable Motion Controls
			</button>
		</div>
	);
};

export default SplashScreen;
