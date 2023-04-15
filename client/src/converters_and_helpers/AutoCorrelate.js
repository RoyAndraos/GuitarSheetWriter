const autoCorrelate = (buf, sampleRate) => {
  const bufferSize = buf.length;

  //check if there's enough signal
  const rms = Math.sqrt(
    buf.reduce((total, current) => {
      return total + current * current;
    }, 0) / bufferSize
  );
  //not enough signal here
  if (rms < 0.01) {
    return -1;
  }

  // Find array of values of one wave
  let startIndex = 0;
  let endIndex = bufferSize - 1;
  let threshold = 0.1;
  for (let i = 0; i < bufferSize / 2; i++) {
    if (Math.abs(buf[i]) < threshold) {
      startIndex = i;
      break;
    }
  }
  for (let i = 1; i < bufferSize / 2; i++) {
    if (Math.abs(buf[bufferSize - i]) < threshold) {
      endIndex = bufferSize - i;
      break;
    }
  }
  buf = buf.slice(startIndex, endIndex);
  const newSize = buf.length;

  //auto-correlation
  const autoCorr = new Array(newSize).fill(0);
  for (let i = 0; i < newSize; i++) {
    for (let j = 0; j < newSize - i; j++) {
      autoCorr[i] = autoCorr[i] + buf[j] * buf[j + i];
    }
  }

  //find T0 (peak index shows how far it is from the start)
  let d = 0;
  while (autoCorr[d] > autoCorr[d + 1]) {
    d++;
  }
  let maxval = -1,
    maxpos = -1;
  for (let i = d; i < newSize; i++) {
    if (autoCorr[i] > maxval) {
      maxval = autoCorr[i];
      maxpos = i;
    }
  }
  let T0 = maxpos;

  // Parabolic Interpolation
  const x1 = autoCorr[T0 - 1];
  const x2 = autoCorr[T0];
  const x3 = autoCorr[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) {
    T0 = T0 - b / (2 * a);
  }

  return sampleRate / T0;
};

export default autoCorrelate;

/*
  1-calculate the Root Mean Square (RMS) of te signal:
  this calculates the average power of the signal overr the given window size. It's used to check if there is 
  enough signal present in the input buffer to proceed with the pitch detection. If the RMS is below a certain
  threshold, the function will return -1 indicating that there isnt enough signal.
  
  2-find the range of values in the buffer containing one wave of the signal:
  this step sets the beginning and end points of the buffer so that it only contains one
  complete wave of the signal. This is done by finding the first and last points in the buffer
  that are below a certain threshold (0.2 in this case).
  
  3-calculate the auto-correlation of the signal:
  this step gets the auto-correlation function of the signal using the formula:
  c[i] = sum(n=0 to N-1) x[n]*x[n+k]
  where: 
      i : lag between the signal and shifted version
      N : length of the signal array x
      j : index of the signal array x
      x[j+i] : value of time shifted version of the signal
  This gives us a measure of how similar the signal is to itself when shifted by a certain amount of time (i). 
  basically gets us an "average" array which we'll use to find a more accurate value for the max value we want to use in the end.
  
  4-Find the peak in the auto-correlation function:
  This step finds the peak in the auto-correlation function using the following method:
      .Find the first local minimum of the auto-correlation function
      .Starting from the minimum, find the highest peak in the auto-correlation function
  The position of the peak corresponds to the period of the signal.
  
  5-Calculate the fundamental frequency:
  The period of the signal is used to calculate the fundamental frequency using the formula:
  f = sampleRate / T0
  where T0 is the period of the signal and sampleRate is the sampling rate of the audio input.
   */
