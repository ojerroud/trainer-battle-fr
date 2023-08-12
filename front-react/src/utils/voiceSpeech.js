export const voiceSpeech = (text) => {
	const synthesis = window.speechSynthesis;

	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = 'fr-FR';
	utterance.rate = 1;

	const voices = synthesis.getVoices();
	const defaultVoice = voices.find((voice) => voice.default);
	if (defaultVoice) {
		utterance.voice = defaultVoice;
	}

	utterance.onend = () => {
		console.log('synthese vocal terminée.');
	};

	synthesis.speak(utterance);
};
