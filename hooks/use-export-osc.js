import { useEffect, useState } from "react";
import Osc from "@/app/{synth}/Osc";

export const useExportOsc = (osc) => {
  const [soundBase64, setSoundBase64] = useState(null);
  
  useEffect(() => { 
    if (!osc.actx) return;
    var chuck = [];
    var actx = osc.actx;
    var destination = actx.createMediaStreamDestination();
    var Recorder = new MediaRecorder(destination.stream);
    const { conection, feq, ...oscUse } = osc;
    var newOsc = new Osc({ ...oscUse, feq: 440, conection: destination });
    newOsc.start();
    Recorder.start();
    setSoundBase64(null)
    setTimeout(() => {
        newOsc.stop();
    }, 5000);
    setTimeout(() => {
      Recorder.stop();
    }, 6000);

    Recorder.ondataavailable = (evt) => {
      chuck.push(evt.data);
    };
    Recorder.onstop = () => {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob(chuck, { type: "audio/mp3" }));
      reader.onloadend = () => {
        setSoundBase64(reader.result);
      };
    };
  }, [osc]);

  return soundBase64;
};
