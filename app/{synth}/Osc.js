export default class Osc {
  constructor({actx, type, level, pan, feq, detune, conection, env, filter}) {
    this.actx = actx;
    this.osc = actx.createOscillator();
    this.osc.frequency.value = feq || 440;
    this.osc.detune.value = detune;
    this.osc.type = type;
    this.gainNode = actx.createGain();
    this.gainNode.gain.value = level;
    this.osc.connect(this.gainNode);
    this.panNode = actx.createStereoPanner();
    this.panNode.pan.value = pan;
    this.gainNode.connect(this.panNode);
    this.conection = conection;
    this.adsr = actx.createGain();
    this.panNode.connect(this.adsr);
    this.env = env;
    this.ease = 0.005
    this.feq = feq
    this.filter = actx.createBiquadFilter()
    if (Object.keys(filter).length === 0) {
        this.adsr.connect(conection);      
    } else {
      this.filter.type = filter.type;
      this.filter.frequency.value = filter.feq;
      this.filter.Q.value = filter.Q;
      this.adsr.connect(this.filter);
      this.filter.connect(conection);
    }
    this.osc.start();
  }
  start() {
    let currentTime = this.actx.currentTime;
    this.startTime = currentTime;
    this.adsr.gain.cancelScheduledValues(currentTime);
    this.adsr.gain.setValueAtTime(0, currentTime);
    this.adsr.gain.linearRampToValueAtTime(
      1,
      currentTime + this.env.attack + this.ease
    );
    this.adsr.gain.linearRampToValueAtTime(
      1,
      currentTime + this.env.attack + this.env.hold + this.ease
    );
    this.adsr.gain.linearRampToValueAtTime(
      this.env.sustain,
      currentTime + this.env.attack + this.env.hold + this.env.decay + this.ease
    );
  }
  stop() {
    let currentTime = this.actx.currentTime;
    this.adsr.gain.cancelScheduledValues(currentTime);
    this.adsr.gain.setTargetAtTime(
      0,
      currentTime,
      this.env.release + this.ease
    );
    setTimeout(() => {
      this.osc.disconnect();
    }, 1000);
  }

  updateOsc({ type, level, pan, detune }) {
    this.osc.type = type;
    this.osc.detune.value = detune;
    this.gainNode.gain.value = level ;
    this.panNode.pan.value = pan;
  }
  updateEnv(newEnv) {
    let currentTime = this.actx.currentTime;
    this.adsr.gain.cancelScheduledValues(this.startTime);
    // currentTime dont end in attack
    if (this.startTime + this.env.attack + this.ease > currentTime) {
      this.adsr.gain.linearRampToValueAtTime(
        1,
        this.startTime + newEnv.attack + this.ease
      );
      this.adsr.gain.linearRampToValueAtTime(
        1,
        this.startTime + newEnv.attack + newEnv.hold + this.ease
      );
      this.adsr.gain.linearRampToValueAtTime(
        newEnv.sustain,
        this.startTime + newEnv.attack + newEnv.hold + newEnv.decay + this.ease
      );
    }
    // currentTime dont end in hold
    else if (
      this.startTime + this.env.attack + this.env.hold + this.ease >
      currentTime
    ) {
      this.adsr.gain.linearRampToValueAtTime(
        1,
        this.startTime + this.env.attack + newEnv.hold + this.ease
      );
      this.adsr.gain.linearRampToValueAtTime(
        newEnv.sustain,
        this.startTime +
          this.env.attack +
          newEnv.hold +
          newEnv.decay +
          this.ease
      );
    }
    // currentTime dont end in decay
    else if (
      this.startTime +
        this.env.attack +
        this.env.hold +
        this.env.decay +
        this.ease >
      currentTime
    ) {
      this.adsr.gain.linearRampToValueAtTime(
        newEnv.sustain,
        this.startTime +
          this.env.attack +
          this.env.hold +
          newEnv.decay +
          this.ease
      );
      // currentTime end all
    } else {
      this.adsr.gain.linearRampToValueAtTime(newEnv.sustain, currentTime);
    }
    // change new to this
    this.env = newEnv;
  }
  updateFilter(newFilter) {
    if (Object.keys(newFilter).length === 0) {
      this.adsr.disconnect(); 
      this.adsr.connect(this.conection);
    } else {
      this.adsr.disconnect();
      this.adsr.connect(this.filter);
      this.filter.type = newFilter.type;
      this.filter.frequency.value = newFilter.feq;
      this.filter.Q.value = newFilter.Q;
      this.filter.connect(this.conection);
    }
  }
}
