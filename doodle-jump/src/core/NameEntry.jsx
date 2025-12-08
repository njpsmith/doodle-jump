import { useState, useEffect } from 'react';

const NameEntry = ({
	score,
	playerName,
	setPlayerName,
	setHighScores,
	setShowNameEntryPrompt,
}) => {
	const [showError, setShowError] = useState(false);
	const [nameFieldTouched, setNameFieldTouched] = useState(false);

	function handleSubmitName(e) {
		e.preventDefault();

		if (playerName === '') {
			setShowError(true);
			return;
		}

		const newEntry = { score, name: playerName };

		setHighScores((prev) => {
			const updated = [...prev, newEntry]
				.sort((a, b) => b.score - a.score)
				.slice(0, 3); // keep top 3

			return updated;
		});

		setPlayerName(''); // Reset the entered name after submission

		// hide prompt
		setShowNameEntryPrompt(false);
	}

	function handleOnChange(e) {
		const value = e.target.value;

		// Keep only alphanumeric characters
		const cleaned = value.replace(/[^a-zA-Z0-9]/g, '');

		// Limit to 10 characters
		const limited = cleaned.slice(0, 10);

		setPlayerName(limited);
		setNameFieldTouched(true);
	}

	useEffect(() => {
		if (nameFieldTouched && playerName === '') {
			setShowError(true);
		} else if (nameFieldTouched && playerName !== '') {
			setShowError(false);
		}
	}, [playerName]);

	return (
		<div className="name-entry">
			<form onSubmit={handleSubmitName}>
				<p>Your score: {score}</p>
				<label htmlFor="scorename">
					You made the leaderboard! Enter your name
				</label>
				<input
					id="scorename"
					name="scorename"
					type="text"
					value={playerName}
					onChange={(e) => handleOnChange(e)}
					placeholder="Enter your name"
				/>
				{showError && (
					<p className="error-message">Don't forget to enter your name!</p>
				)}
				<button type="submit" disabled={showError}>
					Save Score
				</button>
			</form>
		</div>
	);
};

export default NameEntry;
