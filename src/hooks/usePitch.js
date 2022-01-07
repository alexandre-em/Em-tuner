import { useCallback, useMemo, useState } from "react";
import { pitchDetection as pitchDetect } from 'ml5';

export default function usePitch() {
  const [frequency, setFrequency] = useState();
  const [stream, setStream] = useState();
  const [isUsed, setIsUsed] = useState(false);

  let AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false;

  const audioContext = useMemo(() => new AudioContext(), [AudioContext]);

  /** Allume le micro */
  const setup = async () => {
    const s = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0
      }, video: false
    });
    setStream(s);
    pitchDetection(audioContext, s);
  };

  /** Eteint le micro */
  const closeChanges = useCallback(() => {
    stream?.getTracks().forEach((track) => {
      track.stop();
      stream.removeTrack(track);
    })
    if (audioContext.state === 'running' || audioContext.state === 'suspended'){
      audioContext.close();
    }
    console.log(stream, audioContext)
    setStream(null);
    return Promise.resolve();
  }, [stream, audioContext]);

  const pitchDetection = useCallback((audioContext, stream) => {
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
  }, []);

  return {
    state: { frequency, isUsed },
    setIsUsed,
    setup,
    closeChanges,
  };
}

