export function startVoiceSearch(inputEl) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Not supported");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";

  recognition.start();

  recognition.onresult = (e) => {
    inputEl.value = e.results[0][0].transcript;
    inputEl.dispatchEvent(new Event("input"));
  };
}