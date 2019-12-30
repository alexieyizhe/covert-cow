const SOUND_PATH = '/assets/sounds/';
const sounds = new Array(12)
  .fill(0)
  .map(() => ({ buffer: null, loaded: false }));

export let audioCtx;
export let audioGainNode;

/**
 * Instantiate the audio instances.
 */
try {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
  audioGainNode = audioCtx.createGain();
} catch (e) {
  console.error('Web Audio API is not supported in this browser!');
}

/**
 * Pre-load all the sounds that we'll need to play.
 */
sounds.forEach((val, i) => {
  const request = new XMLHttpRequest();
  const url = `${SOUND_PATH}${i}.mp3`;
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = () => {
    audioCtx.decodeAudioData(request.response, buffer => {
      val.buffer = buffer;
      val.loaded = true;
    });
  };
  request.send();
});

/**
 * Plays the specified sound.
 */
export const playSound = (panner, fileIdx) => {
  if (!sounds[fileIdx].loaded) {
    console.error('Sound not loaded!');
    return false;
  }

  let source = audioCtx.createBufferSource(); // creates a sound source
  source.buffer = sounds[fileIdx].buffer; // tell the source which sound to play
  source
    .connect(audioGainNode)
    .connect(panner)
    .connect(audioCtx.destination); // connect the source to the context's destination (the speakers)
  source.start(0); // play the source now
  // note: on older systems, may have to use deprecated noteOn(time);
};
