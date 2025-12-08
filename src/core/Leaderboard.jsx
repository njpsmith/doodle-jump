const Leaderboard = ({ highScores }) => {
	if (highScores.length === 0) return;

	return (
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
	);
};

export default Leaderboard;
