const ncAutoCorrelate = (buf, sampleRate) => {
  const bufferSize = buf.length;

  // Auto-correlation
  const autoCorr = new Array(bufferSize).fill(0);
  for (let i = 0; i < bufferSize; i++) {
    for (let j = 0; j < bufferSize - i; j++) {
      autoCorr[i] = autoCorr[i] + buf[j] * buf[j + i];
    }
  }

  // Find T0
  let d = 0;
  while (autoCorr[d] > autoCorr[d + 1]) {
    d++;
  }
  let maxval = -1,
    maxpos = -1;
  for (let i = d; i < bufferSize; i++) {
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

export default ncAutoCorrelate;
