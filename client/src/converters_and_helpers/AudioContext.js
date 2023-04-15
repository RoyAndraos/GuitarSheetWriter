const audioCtx = new window.AudioContext();
let analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;

const AudioContext = {
  getAudioContext() {
    return audioCtx;
  },

  getAnalyser() {
    return analyser;
  },

  resetAnalyser() {
    analyser = audioCtx.createAnalyser();
  },
};

export default AudioContext;
