import React, { useEffect, useState } from "react";
import "./App.scss";

import JSConfetti from "js-confetti";

const App = () => {
	const [newDayHour, setNewDayHour] = useState(12);
	const startDate = new Date(2020, 0, 4, newDayHour);

	const convertDateToString = (date) => {
		let day = String(date.getDate()).padStart(2, "0");
		let month = String(date.getMonth() + 1).padStart(2, "0");
		let year = String(date.getFullYear()).padStart(2, "0");
		return ` ${day}.${month}.${year}`;
	};

	const calculateTimeFromFirstDate = (firstDate) => {
		let secondDate = new Date();
		firstDate.setHours(newDayHour, 0, 0, 0);
		// secondDate.setHours(12, 0, 0, 0);

		let dateDifference = secondDate.getTime() - firstDate.getTime();
		let daysDifference = dateDifference / (1000 * 60 * 60 * 24);
		return Math.floor(daysDifference);
	};

	const [remainingTime, setRemainingTime] = useState("00H 00M 00S");
	// Liczenie ile zostało czasu do następnego dnia do 12
	// lub akutlanego jesli jest przed 12
	const calculateRemainingTimeToNextDay = () => {
		let now = new Date();
		let nextNoon = new Date(now);

		// Ustaw godzinę na 12:00:00
		nextNoon.setHours(newDayHour, 0, 0, 0);

		// Jeśli obecna godzina jest po południu, dodaj 24 godziny, aby uzyskać najbliższą godzinę 12:00
		if (now.getHours() >= newDayHour) {
			nextNoon.setDate(nextNoon.getDate() + 1);
		}

		let timeDifference = nextNoon - now;
		let hours = Math.floor(timeDifference / (1000 * 60 * 60));
		let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

		setRemainingTime(
			`${String(hours).padStart(2, "0")}H ${String(minutes).padStart(
				2,
				"0"
			)}M ${String(seconds).padStart(2, "0")}S`
		);
	};

	useEffect(() => {
		calculateRemainingTimeToNextDay();
		const timeInterval = setInterval(() => {
			calculateRemainingTimeToNextDay();
		}, 1000);
	}, []);

	// Pobieranie danych z serwera
	const [data, setData] = useState(null);

	const fetchData = async () => {
		try {
			const response = await fetch(
				"https://appserver.mrwoodsman.repl.co/api/message"
			);
			const result = await response.json();

			setData(result.message);
			localStorage.setItem("message", result.message);
		} catch (error) {
			console.error("Błąd pobierania danych:", error);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const jsConfetti = new JSConfetti();
	const handleConfetti = () => {
		jsConfetti.addConfetti({
			emojis: ["💘", "🤩"],
			emojiSize: 50,
			confettiNumber: 40,
		});
	};

	const handleVisibilityChange = () => {
		if (document.hidden) {
			// Strona jest ukryta (użytkownik opuścił kartę)
			console.log("Użytkownik opuścił kartę.");
		} else {
			// Strona jest widoczna (użytkownik wrócił do karty)
			console.log("Użytkownik wrócił do karty.");
			fetchData();
			// handleConfetti();
		}
	};

	useEffect(() => {
		// Dodanie obsługi zdarzenia zmiany widoczności strony
		document.addEventListener(
			"visibilitychange",
			handleVisibilityChange,
			false
		);

		// Funkcja czyszcząca nasłuchiwanie po odmontowaniu komponentu
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);
	return (
		<div className="app">
			<div className="grid_placement">
				<div className="next_day_timer">
					<h4 className="title">Następny dzień za</h4>
					<h3 className="time">{remainingTime}</h3>
				</div>
				<div className="days_number">
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "8px",
						}}
					>
						<p className="title">
							Od
							{convertDateToString(startDate)}
						</p>
						<h1 className="days">
							{calculateTimeFromFirstDate(startDate)} Dni
						</h1>
						<svg
							className="overlane"
							xmlns="http://www.w3.org/2000/svg"
							width="224"
							height="21"
							viewBox="0 0 224 21"
							fill="none"
						>
							<path
								d="M3.25 12.9233C3.25 12.9233 25.8279 -0.297944 39.25 4.92327C45.8741 7.50007 47.1838 13.2023 53.75 15.9233C69.4137 22.414 78.8365 3.73387 95.75 4.92327C109.116 5.86323 114.898 14.7987 128.25 15.9233C146.088 17.4257 154.945 6.7763 172.75 4.92327C191.411 2.98123 220.75 6.92327 220.75 6.92327"
								stroke="#606C38"
								strokeWidth="6"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					<svg
						onClick={() => handleConfetti()}
						className="heart_animate"
						xmlns="http://www.w3.org/2000/svg"
						width="76"
						height="76"
						viewBox="0 0 76 76"
						fill="none"
					>
						<path
							d="M70.8125 27.8362C70.8125 48.3441 40.4053 64.9437 39.1103 65.6292C38.7691 65.8128 38.3876 65.9089 38 65.9089C37.6124 65.9089 37.2309 65.8128 36.8896 65.6292C35.5947 64.9437 5.1875 48.3441 5.1875 27.8362C5.19293 23.0205 7.10838 18.4036 10.5136 14.9983C13.9189 11.5931 18.5358 9.67761 23.3516 9.67218C29.4014 9.67218 34.6982 12.2737 38 16.6712C41.3018 12.2737 46.5986 9.67218 52.6484 9.67218C57.4642 9.67761 62.0811 11.5931 65.4864 14.9983C68.8916 18.4036 70.8071 23.0205 70.8125 27.8362Z"
							fill="#BC6C25"
						/>
					</svg>
				</div>
				<div className="text_box">
					<p>{data ? data : localStorage.getItem("message")}</p>
				</div>
			</div>
		</div>
	);
};

export default App;
