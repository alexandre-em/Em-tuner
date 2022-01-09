import { pitchDetection as pitchDetect } from 'ml5';

let AudioContext = window.AudioContext // Default
  || window.webkitAudioContext // Safari and old versions of Chrome
  || false;

let audioContext;
let stream;

/**
 * Callback that allows to manipulate the computed frequency
 * @callback FrequencyCallback
 * @param {number} frequency
 * @returns {void}
 */
/**
 * @async
 * @description Request user's mic and setup the model
 * @param {FrequencyCallback} callback Function to save/use frequency
 */
const setup = async (callback) => {
  audioContext = new AudioContext();
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true, video: false
  });
  pitchDetection(audioContext, stream, callback);
};

/**
 * @async
 * @description Close all openned mics
 */
const closeChanges = async () => {
  await stream?.getTracks().forEach(async (track) => {
    await track.stop();
  })

  if (audioContext.state === 'running' || audioContext.state === 'suspended') {
    await audioContext.close();
  }
  console.log(stream, audioContext)
};
/**
 * @description Load the model then compute the frequency and save/use it with `setFrequency`
 * @param {AudioContext} audioContext
 * @param {MediaStream} stream
 * @param {FrequencyCallback} callback
 */
const pitchDetection = (audioContext, stream, callback) => {
  // When the model is loaded
  const modelLoaded = () => {
    console.log('Model Loaded!');
    pitch.getPitch(getPitch)
  }

  const getPitch = async (error, freq) => {
    if (audioContext.state === 'suspended')
      await audioContext.resume();
    if (error) {
      console.error(error);
    } else {
      if (freq) {
        callback(freq);
      }
      pitch.getPitch(getPitch);
    }
  }
  const url = process.env.REACT_APP_ENDPOINT || 'models/';
  const pitch = pitchDetect(url, audioContext, stream, modelLoaded);
};

export { setup, closeChanges, pitchDetection }
