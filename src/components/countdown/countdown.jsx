// Countdown.js
import React, { useEffect, useState } from "react";
import JSConfetti from "js-confetti";

const Countdown = ({ startDate }) => {
	const [toDay, setToDay] = useState(new Date());
	const jsConfetti = new JSConfetti();

	const dayTo = () => {
		let time_difference = toDay.getTime() - startDate.getTime();
		let days_difference = time_difference / (1000 * 60 * 60 * 24);
		return days_difference.toFixed(0);
	};

	function godzinyDoNastepnegoDnia() {
		// Obecna data i godzina
		// const dzisiaj = new Date(2023, 11, 5, 12, 0, 0);
		const dzisiaj = new Date();

		// Ustawiamy godzinę na 12:00
		// dzisiaj.setHours(12, 0, 0, 0);

		// Jutrzejsza data
		const jutro = new Date();
		console.log(dzisiaj.getHours());
		if (
			dzisiaj.getHours() >= 12 &&
			dzisiaj.getMinutes() >= 0 &&
			dzisiaj.getSeconds() > 0
		) {
			jutro.setDate(dzisiaj.getDate() + 1);
		} else {
			jutro.setDate(dzisiaj.getDate());
		}
		jutro.setHours(12, 0, 0, 0);

		// Różnica w milisekundach między obecną datą a jutrzejszą datą
		const roznicaMS = jutro - dzisiaj;

		// Konwersja milisekund na godziny
		const roznicaGodzin = Math.floor(roznicaMS / (60 * 60 * 1000));
		const roznicaMinut = Math.floor(
			(roznicaMS % (60 * 60 * 1000)) / (60 * 1000)
		);
		const roznicaSekund = Math.floor((roznicaMS % (60 * 1000)) / 1000);

		if (roznicaGodzin == 0 && roznicaMinut == 0 && roznicaSekund == 0) {
			console.warn(1);
			jsConfetti.addConfetti({
				emojis: ["💘", "🤩"],
				emojiSize: 50,
				confettiNumber: 40,
			});
		}
		return `${String(roznicaGodzin).padStart(2, "0")}h ${String(
			roznicaMinut
		).padStart(2, "0")}m ${String(roznicaSekund).padStart(2, "0")}s`;
	}
	useEffect(() => {
		const interval = setInterval(() => {
			setToDay(new Date());
			dayTo();
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="countdown">
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "8px",
					alignItems: "center",
				}}
			>
				<p>04.01.2020</p>
			</div>
			<h1>{dayTo()} dni</h1>
			<h1 style={{ fontSize: "20px", fontWeight: "700" }}>
				{godzinyDoNastepnegoDnia()}
			</h1>
		</div>
	);
};

export default Countdown;
