"use client";

import { useEffect, useState } from "react";
import { useMidiFeq } from "@/hooks/use-midi";
import { useExportOsc } from "@/hooks/use-export-osc";
import Osc from "@/app/{synth}/Osc";
import Midikeyboard from "@/components/synth/midikeyboard";
import OscControl from "@/components/synth/oscControl";
import ProblemDesc from "@/components/synth/problemDesc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";

export default function Problem({ problem }) {
  const [osc, setOsc] = useState({
    actx: null,
    type: "sine",
    level: 0.5,
    pan: 0,
    feq: null,
    detune: 0,
    conection: null,
    env: {
      attack: 0,
      hold: 0,
      decay: 1,
      sustain: 1,
      release: 0.1,
    },
    filter: {},
  });
  const [voices, setVoices] = useState([]);
  const { midiFeq, midiCode } = useMidiFeq();
  const soundBase64 = useExportOsc(osc);

  const createOsc = (feq = 440) => {
    if (!osc.actx) return;
    const oscSet = { ...osc, feq };
    const newvoice = new Osc(oscSet);
    newvoice.start();
    const oscFeq = newvoice.feq;
    var voice = {};
    voice[oscFeq] = newvoice;
    setVoices({ ...voices, ...voice });
  };

  const handleSubmit = () => {
    const id = toast.info("Checking..."); // Display loading toast
    const fetchData = async () => {
      try {
        const { actx, feq, conection, ...submitData } = osc;
        const data = await fetch(`/api/problem/${problem.id}/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });
        const score = await data.json();
        toast.update(id, {
          render: `Success: ${score}`,
          type: "success",
          isLoading: false,
        });
      } catch (error) {
        toast.update(id, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
        });
      }
    };
    fetchData();
  };

  useEffect(() => {
    const audioCtx = new window.AudioContext() || window.webkitAudioContext();
    const output = audioCtx.createGain();
    output.connect(audioCtx.destination);
    setOsc({
      ...osc,
      actx: audioCtx,
      conection: output,
    });
  }, []);

  useEffect(() => {
    if (!osc.actx) return;
    if (midiFeq.length == 0) {
      Object.values(voices).forEach((voice) => {
        voice.stop();
        setVoices({});
      });
    }
    midiFeq.forEach((feq) => {
      if (!(feq in voices)) {
        createOsc(feq);
      } else if (!midiFeq.includes(feq)) {
        voices[feq].stop();
        const { feq, ...newvoice } = voices;
        setVoices({ ...newvoice });
      }
    });
  }, [midiFeq]);

  useEffect(() => {
    Object.values(voices).forEach((voice) => {
      const { env, filter, feq, ...oscSet } = osc;
      voice.updateOsc(oscSet);
      voice.updateEnv(env);
      voice.updateFilter(filter);
    });
  }, [osc]);

  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[52rem] flex flex-col justify-center items-center my-10 md:my-36 space-y-10 md:space-y-20 text-center">
        <div className="w-full sm:w-3/4 md:w-2/4 space-y-6 md:space-y-12">
          <h1 className="text-4xl md:text-5xl font-bold">SYNTH</h1>
          <div className="scale-[75%] sm:scale-[80%] md:scale-100">
            <OscControl osc={osc} setOsc={setOsc} />
          </div>
        </div>
        <div className="flex justify-center w-3/4">
          <div className="hidden md:flex w-full  justify-center">
            <Midikeyboard midi={midiCode} />
          </div>
        </div>
      </div>
      <ProblemDesc
        submit={handleSubmit}
        problem={problem}
        soundBase64={soundBase64}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  );
}
