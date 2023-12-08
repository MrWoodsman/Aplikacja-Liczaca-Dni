import { useEffect, useState } from "react";
import "./App.scss";

import heart from "./assets/heart.png";

import JSConfetti from "js-confetti";

function App() {
	const startDate = new Date(2020, 0, 4, 12);
	const [toDay, setToDay] = useState(new Date());

	const dayTo = () => {
		let time_difference = toDay.getTime() - startDate.getTime();
		let days_difference = time_difference / (1000 * 60 * 60 * 24);

		console.log(days_difference.toFixed(4));
		return days_difference.toFixed(0);
	};

	function godzinyDoNastepnegoDnia() {
		// Obecna data i godzina
		const dzisiaj = new Date();

		// Ustawiamy godzinę na 12:00
		// dzisiaj.setHours(12, 0, 0, 0);

		// Jutrzejsza data
		const jutro = new Date();
		jutro.setDate(dzisiaj.getDate() + 1);
		jutro.setHours(12, 0, 0, 0);

		// Różnica w milisekundach między obecną datą a jutrzejszą datą
		const roznicaMS = jutro - dzisiaj;

		// Konwersja milisekund na godziny
		const roznicaGodzin = Math.floor(roznicaMS / (60 * 60 * 1000));
		const roznicaMinut = Math.floor(
			(roznicaMS % (60 * 60 * 1000)) / (60 * 1000)
		);
		const roznicaSekund = Math.floor((roznicaMS % (60 * 1000)) / 1000);

		return `${roznicaGodzin}h ${roznicaMinut}m ${roznicaSekund}s`;
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setToDay(new Date());
			dayTo();
			// console.log(new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	// console.warn(StartDate);

	const jsConfetti = new JSConfetti();
	// jsConfetti
	// 	.addConfetti({
	// 		emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
	// 		emojiSize: 50,
	// 		confettiNumber: 40,
	// 	})
	// 	.then(() => jsConfetti.clearCanvas());

	const handleHeart = () => {
		jsConfetti
			.addConfetti({
				emojis: ["💘"],
				emojiSize: 50,
				confettiNumber: 40,
			})
			.then(() => jsConfetti.clearCanvas());
	};

	return (
		<div className="app">
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "8px",
					alignItems: "center",
				}}
			>
				<p>04.01.2020</p>
				<h1>Razem z Mikołajkiem</h1>
			</div>

			<div className="days_box">
				<h1>{dayTo()} dni</h1>
				<h1 style={{ fontSize: "20px", fontWeight: "700" }}>
					{godzinyDoNastepnegoDnia()}
				</h1>
				<p>Dni liczone o godzinie 12:00</p>
			</div>

			<div className="img_box">
				<img src={heart} onClick={() => handleHeart()} />
			</div>
		</div>
	);
}

export default App;
