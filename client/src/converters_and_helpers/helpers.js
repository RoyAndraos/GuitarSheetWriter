import ncAutoCorrelate from "./NCAutoCorrelate";
import autoCorrelate from "./AutoCorrelate";
import { noteToTabs } from "./noteToTabsData";
const noteStrings = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const noteFromPitch = (frequency) => {
  const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  return Math.round(noteNum) + 69;
};

const frequencyFromNoteNumber = (note) => {
  return 440 * Math.pow(2, (note - 69) / 12);
};

const centsOffFromPitch = (frequency, note) => {
  return Math.floor(
    (1200 * Math.log(frequency / frequencyFromNoteNumber(note))) / Math.log(2)
  );
};

const getDetunePercent = (detune) => {
  if (detune > 0) {
    return 50 + detune;
  } else {
    return 50 + -detune;
  }
};

const peakAmplitude = (buf) => {
  let peak = 0;
  for (let i = 0; i < buf.length; i++) {
    const value = Math.abs(buf[i]);
    if (value > peak) {
      peak = value;
    }
  }
  return Math.round(peak * 1000);
};

const updatePitch = (audioCtx, analyserNode, setEncodedNoteArray) => {
  const buf = new Float32Array(2048);
  analyserNode.getFloatTimeDomainData(buf);
  let noteInfo;
  const noiseCanceledFrequency = autoCorrelate(buf, audioCtx.sampleRate);
  const amp = peakAmplitude(buf);
  if (noiseCanceledFrequency === -1) {
    const frequency = ncAutoCorrelate(buf, audioCtx.sampleRate);
    if (frequency >= 40 && frequency <= 500) {
      const note = noteFromPitch(frequency);
      const symbol = noteStrings[note % 12];
      const scale = Math.floor(note / 12) - 1;
      const dtune = centsOffFromPitch(frequency, note);
      noteInfo = { note, symbol, scale, dtune, amp };

      setEncodedNoteArray((prev) => [...prev, noteInfo]);
      return noteInfo;
    }
    if (frequency === Infinity || frequency < 40 || frequency > 500) {
      noteInfo = { note: "rest" };
      setEncodedNoteArray((prev) => [...prev, noteInfo]);
      return noteInfo;
    }
  }
  if (noiseCanceledFrequency > -1) {
    const note = noteFromPitch(noiseCanceledFrequency);
    const symbol = noteStrings[note % 12];
    const scale = Math.floor(note / 12) - 1;
    const dtune = centsOffFromPitch(noiseCanceledFrequency, note);
    noteInfo = { note, symbol, scale, dtune, amp };
    setEncodedNoteArray((prev) => [...prev, noteInfo]);
    return noteInfo;
  }
};

const calculateMeasureTime = (timeSignature, bpm) => {
  const timeSignatureArray = [
    timeSignature.slice("/")[0],
    timeSignature.slice("/")[2],
  ];
  const measureTime =
    (60 / ((parseInt(bpm) * timeSignatureArray[0]) / timeSignatureArray[1])) *
    timeSignatureArray[1];
  const measureArrayLength = measureTime / (20 / 1000);
  return Math.round(measureArrayLength);
};

const decodeNoteArray = (encodedNoteArray, bpm, timeSignature) => {
  //'top' value of timeSignature
  const beatsPerMeasure = parseInt(timeSignature.split("/")[0]);
  //'bottom' value
  const bottomTimeSig = parseInt(timeSignature.split("/")[1]);

  // get all the durations possible.
  //----------------------------------------------------------------------------------------------

  // regular notes
  const quarter = 60000 / (parseInt(bpm) * (beatsPerMeasure / bottomTimeSig));
  const full = quarter * 4;
  const half = quarter * 2;
  const eighth = quarter / 2;
  const sixteenth = quarter / 4;
  // dotted notes

  const halfDotted = half * 1.5;
  const quarterDotted = quarter * 1.5;
  const eighthDotted = eighth * 1.5;
  const sixteenthDotted = sixteenth * 1.5;
  // triplet notes
  //
  //const halfTriplet = (half * 2) / 3;
  //const quarterTriplet = (quarter * 2) / 3;
  //const eighthTriplet = (eighth * 2) / 3;
  //const sixteenthTriplet = (sixteenth * 2) / 3;

  // duration of each in array values
  const arrayValueDuration = 20; // duration of each array value in ms
  // regular notes
  const numArrayValuesPer16thNote = Math.round(sixteenth / arrayValueDuration);
  const numArrayValuesPerEighthNote = Math.round(eighth / arrayValueDuration);
  const numArrayValuesPerQuarterNote = Math.round(quarter / arrayValueDuration);
  const numArrayValuesPerHalfNote = Math.round(half / arrayValueDuration);
  const numArrayValuesPerFullNote = Math.round(full / arrayValueDuration);
  // dotted Notes
  const numArrayValuesPerDottedSixtheenthNote = Math.round(
    sixteenthDotted / arrayValueDuration
  );
  const numArrayValuesPerDottedEighthNote = Math.round(
    eighthDotted / arrayValueDuration
  );
  const numArrayValuesPerDottedQuarterNote = Math.round(
    quarterDotted / arrayValueDuration
  );
  const numArrayValuesPerDottedHalfNote = Math.round(
    halfDotted / arrayValueDuration
  );

  // triplets
  //const numArrayValuesPerTripletSixteenthNote = Math.round(
  //  sixteenthTriplet / arrayValueDuration
  //);
  //const numArrayValuesPerTripletEighthNote = Math.round(
  //  eighthTriplet / arrayValueDuration
  //);
  //const numArrayValuesPerTripletQuarterNote = Math.round(
  //  quarterTriplet / arrayValueDuration
  //);
  //const numArrayValuesPerTripletHalfNote = Math.round(
  //  halfTriplet / arrayValueDuration
  //);

  //----------------------------------------------------------------------------------------------

  //Make an array of the possible durations
  //----------------------------------------------------------------------------------------------
  const noteDurations = [
    { name: "1", duration: numArrayValuesPerFullNote },
    { name: "d2", duration: numArrayValuesPerDottedHalfNote },
    { name: "2", duration: numArrayValuesPerHalfNote },

    //{ name: "2t", duration: numArrayValuesPerTripletHalfNote },
    { name: "d4", duration: numArrayValuesPerDottedQuarterNote },
    { name: "4", duration: numArrayValuesPerQuarterNote },

    //{ name: "4t", duration: numArrayValuesPerTripletQuarterNote },
    { name: "d8", duration: numArrayValuesPerDottedEighthNote },
    { name: "8", duration: numArrayValuesPerEighthNote },

    //{ name: "8t", duration: numArrayValuesPerTripletEighthNote },
    {
      name: "d16",
      duration: numArrayValuesPerDottedSixtheenthNote,
    },
    { name: "16", duration: numArrayValuesPer16thNote },

    //{
    //  name: "16t",
    //  duration: numArrayValuesPerTripletSixteenthNote,
    //},
  ];

  //----------------------------------------------------------------------------------------------

  //join all the similar values together while splitting the different ones from each other =>
  //[[{note1: note1},{note1: note1},{note1: note1}],[{note2: 'rest'},{note2: 'rest'},{note2: 'rest'},...]]
  //----------------------------------------------------------------------------------------------

  const groupNotes = (notes) => {
    let finalNotesArray = [];
    let currentGroup = [];

    for (let i = 0; i < notes.length; i++) {
      let currentNote = notes[i];
      if (i !== notes.length - 1) {
        if (currentGroup.length > 0) {
          if (currentNote.note === "rest" && notes[i + 1].note === "rest") {
            currentGroup.push(currentNote);
          } else if (
            currentNote.note === "rest" &&
            notes[i + 1].note !== "rest"
          ) {
            currentGroup.push(currentNote);

            finalNotesArray.push(currentGroup);
            currentGroup = [];
          } else if (
            currentNote.note !== "rest" &&
            notes[i + 1] &&
            notes[i + 1].note === "rest"
          ) {
            currentGroup.push(currentNote);

            finalNotesArray.push(currentGroup);
            currentGroup = [];
          } else if (
            currentNote.note !== "rest" &&
            notes[i + 1].note !== "rest"
          ) {
            if (currentNote.note === notes[i + 1].note) {
              currentGroup.push(currentNote);
            } else {
              currentGroup.push(currentNote);

              finalNotesArray.push(currentGroup);
              currentGroup = [];
            }
          }
        } else {
          currentGroup.push(currentNote);
          if (currentNote.note !== notes[i + 1].note) {
            finalNotesArray.push(currentGroup);
            currentGroup = [];
          }
        }
      } else {
        currentGroup.push(currentNote);

        finalNotesArray.push(currentGroup);
        currentGroup = [];
      }
    }

    if (currentGroup.length > 0) {
      finalNotesArray.push(currentGroup);
    }

    return finalNotesArray;
  };
  let splitNotesArray = groupNotes(encodedNoteArray);

  //----------------------------------------------------------------------------------------------
  //get rid of all the noise by comparing current value's length to the minimum readable length.
  //----------------------------------------------------------------------------------------------
  let simplifiedNoteArray = splitNotesArray;
  while (
    simplifiedNoteArray.some(
      (element) => element.length < numArrayValuesPer16thNote
    )
  ) {
    for (let i = 0; i < simplifiedNoteArray.length; i++) {
      if (simplifiedNoteArray[i].length < numArrayValuesPer16thNote) {
        if (i === 0) {
          if (simplifiedNoteArray[i + 1].length >= numArrayValuesPer16thNote) {
            simplifiedNoteArray[i] = simplifiedNoteArray[i + 1].concat(
              simplifiedNoteArray[i]
            );
            simplifiedNoteArray.splice(i, 1);
          }
        } else {
          simplifiedNoteArray[i - 1] = simplifiedNoteArray[i - 1].concat(
            simplifiedNoteArray[i]
          );
          simplifiedNoteArray.splice(i, 1);
        }
      }
    }
  }
  //----------------------------------------------------------------------------------------------

  // reduce the array of notes to get an object for each array {note: note, duration: duration}
  //----------------------------------------------------------------------------------------------
  const reducedNotesWithDuration = simplifiedNoteArray.map((element) => {
    if ([element[0].note] === "rest") {
      return { note: element[0].note.note, duration: element.length };
    } else {
      return { note: element[0], duration: element.length };
    }
  });

  for (let i = 0; i < reducedNotesWithDuration.length; i++) {
    if (reducedNotesWithDuration[i].note.note === "rest") {
      if (i !== reducedNotesWithDuration.length - 1) {
        if (reducedNotesWithDuration[i + 1].note.note === "rest") {
          const newDuration =
            reducedNotesWithDuration[i].duration +
            reducedNotesWithDuration[i + 1].duration;
          reducedNotesWithDuration[i] = {
            ...reducedNotesWithDuration[i],
            duration: newDuration,
          };
          reducedNotesWithDuration.splice(i + 1, 1);
        }
      }
    }
  }
  // To find the closest note duration to a given note:
  //----------------------------------------------------------------------------------------------
  const getClosestDuration = (duration) => {
    let closestDuration = noteDurations[0];
    let closestDifference = Math.abs(duration - closestDuration.duration);

    for (let i = 1; i < noteDurations.length; i++) {
      const difference = Math.abs(duration - noteDurations[i].duration);

      if (difference < closestDifference) {
        closestDuration = noteDurations[i].name;
        closestDifference = difference;
      }
    }
    if (closestDuration === noteDurations[0]) {
      closestDuration = noteDurations[0].name;
    }
    return closestDuration;
  };
  //----------------------------------------------------------------------------------------------

  //get right tab instead of note
  //----------------------------------------------------------------------------------------------
  const getTabFromNote = (symbol, scale) => {
    const note = `${symbol}${scale}`;

    const tabNote = noteToTabs.find((tab) => {
      return note === tab.name;
    });
    return { string: tabNote.string, fret: tabNote.fret };
  };
  //----------------------------------------------------------------------------------------------
  //build the measure by getting the closest duration of each note (closest to a readable note duration)
  //----------------------------------------------------------------------------------------------
  const measure = reducedNotesWithDuration.map((element) => {
    const newDuration = getClosestDuration(element.duration);
    if (element.note.note !== "rest") {
      const tabNote = getTabFromNote(element.note.symbol, element.note.scale);
      return { note: tabNote, duration: newDuration };
    } else {
      return { ...element, duration: newDuration };
    }
  });
  console.log(measure);
  //----------------------------------------------------------------------------------------------
  return measure;
};

export {
  noteFromPitch,
  centsOffFromPitch,
  getDetunePercent,
  updatePitch,
  calculateMeasureTime,
  decodeNoteArray,
};
