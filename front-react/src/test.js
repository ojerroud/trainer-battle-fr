import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';

function ScreenshotToTextConverter() {
	const [screenshot, setScreenshot] = useState(null);
	const [textData, setTextData] = useState('');

	const handleScreenshotUpload = (event) => {
		const file = event.target.files[0];
		setScreenshot(file);
	};

	const convertScreenshotToText = async () => {
		if (!screenshot) {
			return;
		}

		alert('Ok !');

		const worker = createWorker();
		await worker.load();
		await worker.loadLanguage('eng');
		await worker.initialize('eng');

		const {
			data: { text },
		} = await worker.recognize(screenshot);
		setTextData(text);

		await worker.terminate();
		alert('travail terminé !');
	};

	return (
		<div>
			<input type="file" accept="image/*" onChange={handleScreenshotUpload} />
			<button onClick={convertScreenshotToText}>Convertir en texte</button>
			<div>
				<h2>Texte extrait :</h2>
				<p>{textData}</p>
			</div>
		</div>
	);
}

export default ScreenshotToTextConverter;
