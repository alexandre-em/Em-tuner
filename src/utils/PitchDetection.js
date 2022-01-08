import { pitchDetection as pitchDetect } from 'ml5';

let AudioContext = window.AudioContext // Default
  || window.webkitAudioContext // Safari and old versions of Chrome
  || false;

let audioContext;
let stream;

/**
 * @description Request user's mic and setup the model
 * @author <a href="mailto:alexandre.em@pm.me">Alexandre Em</a>
 * @param {(frequency: number) => void} setFrequency Function to save/use frequency
 */
const setup = async (setFrequency) => {
  audioContext = new AudioContext();
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true, video: false
  });
  pitchDetection(audioContext, stream, setFrequency);
};

/**
 * @description Close all openned mics
 * @author <a href="mailto:alexandre.em@pm.me">Alexandre Em</a>
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
 * @author <a href="mailto:alexandre.em@pm.me">Alexandre Em</a>
 * @param {AudioContext} audioContext
 * @param {MediaStream} stream
 * @param {(frequency: number) => void} setFrequency
 */
const pitchDetection = (audioContext, stream, setFrequency) => {
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
        setFrequency(freq);
      }
      pitch.getPitch(getPitch);
    }
  }
  const url = '/models/';
  const pitch = pitchDetect(url, audioContext, stream, modelLoaded);
};

export { setup, closeChanges }
