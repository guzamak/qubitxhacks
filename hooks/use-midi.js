import { useState, useEffect } from "react";
import { qwertyKeyMap } from "@/app/{synth}/qwertyMap";

export const useMidiFeq = () => {
  const [midiFeq, setMidFeq] = useState([]);
  const [midiCode, setmidiCode] = useState([]);

  useEffect(() => {
    const qwertyKey = qwertyKeyMap;

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (qwertyKey.hasOwnProperty(key)) {
        const newFeq = Math.round(
          Math.pow(2, (qwertyKey[key] - 69) / 12) * 440
        );
        if (!midiFeq.includes(newFeq)) {
          setMidFeq([...midiFeq, newFeq]);
        }
        if (!midiCode.includes(qwertyKey[key])) {
          setmidiCode([...midiCode, qwertyKey[key]]);
        }
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (qwertyKey.hasOwnProperty(key)) {
        const releasedFrequency = Math.round(
          Math.pow(2, (qwertyKey[key] - 69) / 12) * 440
        );
        const newMidiFeq = midiFeq.filter((freq) => freq !== releasedFrequency);
        const releasedCode = qwertyKey[key];
        const newMidiCode = midiCode.filter((code) => code !== releasedCode);
        setMidFeq(newMidiFeq);
        setmidiCode(newMidiCode);
      }
    };

    window.document.addEventListener("keydown", handleKeyDown);
    window.document.addEventListener("keyup", handleKeyUp);

    return () => {
      window.document.removeEventListener("keydown", handleKeyDown);
      window.document.removeEventListener("keyup", handleKeyUp);
    };
  }, [midiFeq]);

  return { midiFeq, midiCode };
};
