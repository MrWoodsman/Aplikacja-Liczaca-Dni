// ConfettiButton.js
import React from "react";
import JSConfetti from "js-confetti";
import heart from "../../assets/heart.png";

const ConfettiButton = () => {
	const jsConfetti = new JSConfetti();

	const handleHeart = () => {
		jsConfetti.addConfetti({
			emojis: ["💘", "🤩"],
			emojiSize: 50,
			confettiNumber: 40,
		});
		// .then(() => jsConfetti.clearCanvas());
	};

	return (
		<div className="confetti-button">
			<img src={heart} alt="heart" onClick={handleHeart} />
		</div>
	);
};

export default ConfettiButton;
