let soundBuffer = null;
let soundLoaded = false;
const COW_MP3 = '/assets/sounds/0.mp3';

export let audioCtx;
try {
  // Fix up for prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
} catch (e) {
  console.error('Web Audio API is not supported in this browser');
}

const request = new XMLHttpRequest();
request.open('GET', COW_MP3, true);
request.responseType = 'arraybuffer';

// Decode asynchronously
request.onload = () => {
  audioCtx.decodeAudioData(request.response, buffer => {
    soundBuffer = buffer;
    soundLoaded = true;
  });
};
request.send();

export const playSound = panner => {
  if (!soundLoaded) {
    console.log('sound not loaded');
    return false;
  }

  let source = audioCtx.createBufferSource(); // creates a sound source
  source.buffer = soundBuffer; // tell the source which sound to play
  source.connect(panner).connect(audioCtx.destination); // connect the source to the context's destination (the speakers)
  source.start(0); // play the source now
  // note: on older systems, may have to use deprecated noteOn(time);
};
