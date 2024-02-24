"use client";

import Knob from "./knob";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function OscControl({ osc, setOsc }) {
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState({
    type:"lowpass",
    feq:2000,
    Q:0,
  })

  const handleLevel = (value) => {
    setOsc({
      ...osc,
      level: value,
    });
  };

  const handlePan = (value) => {
    setOsc({
      ...osc,
      pan: value,
    });
  };
  const handleDetune = (value) => {
    setOsc({
      ...osc,
      detune: value,
    });
  };
  const handleType = (value) => {
    setOsc({
      ...osc,
      type: value,
    });
  };
  const handleAttack = (value) => {
    setOsc({
      ...osc,
      env: {
        ...osc.env,
        attack: value,
      },
    });
  }
  const handleHold = (value) => {
    setOsc({
      ...osc,
      env: {
        ...osc.env,
        hold: value,
      },
    });
  }
  const handleDecay = (value) => {
    setOsc({
      ...osc,
      env: {
        ...osc.env,
        decay: value,
      },
    });
  }
  const handleSustain = (value) => {
    setOsc({
      ...osc,
      env: {
        ...osc.env,
        sustain: value,
      },
    });
  }
  const handleRelease = (value) => {
    setOsc({
      ...osc,
      env: {
        ...osc.env,
        release: value,
      },
    });
  }
  const handleFilterType = (value) => {
    setFilter({
      ...filter,
      type:value,
    });
  }
  const handleFilterFeq = (value) => {
    setFilter({
      ...filter,
      feq: value,
    });
  }
  const handleFilterQ = (value) => {
    setFilter({
      ...filter,
      Q: value,
    });
  }

  useEffect(()=>{
    if (!isFilter){
      setOsc({
        ...osc,
        filter:{},
      });
    }else{
      setOsc({
        ...osc,
        filter:filter,
      });
    }
  },[filter,isFilter])

  return (
    <div className="space-y-14 text-xs">
      <div className="flex justify-between items-center ">
        <Select
          defaultValue={osc.type}
          onValueChange={(value) => handleType(value)}
        >
          <SelectTrigger className="w-36 text-xs mr-6">
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sine" className="text-xs">Sine</SelectItem>
            <SelectItem value="square" className="text-xs">Square</SelectItem>
            <SelectItem value="triangle" className="text-xs">Triangle</SelectItem>
            <SelectItem value="sawtooth" className="text-xs">Sawtooth</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-center">
          <Knob control={handleLevel} max={1.0} min={0.0} def={osc.level} />
          <p className="select-none pointer-events-none">Level</p>
        </div>
        <div className="text-center">
          <Knob control={handlePan} max={1} min={-1} def={osc.pan} />
          <p className="select-none pointer-events-none">Pan</p>
        </div>
        <div className="text-center">
          <Knob control={handleDetune} max={20} min={-20} def={osc.detune} />
          <p className="select-none pointer-events-none">Detune</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Switch onCheckedChange={(e) => {setIsFilter(e)}} className="data-[state=checked]:bg-slate-300 data-[disabled=true]:bg-slate-50 mr-3"/>
        <div
          className={cn(
            "flex justify-between items-center w-full space-x-5",
            !isFilter && "opacity-10"
          )}
        >
          <Select defaultValue={filter.type}
          onValueChange={(value) => handleFilterType(value)}>
            <SelectTrigger className="w-36 text-xs">
              <SelectValue className="text-xs"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lowpass" className="text-xs">Lowpass</SelectItem>
              <SelectItem value="highpass" className="text-xs">Highpass</SelectItem>
              <SelectItem value="bandpass" className="text-xs">Bandpass</SelectItem>
              <SelectItem value="notch" className="text-xs">Notch</SelectItem>
            </SelectContent>
          </Select>
          <div className="space-y-5 w-full">
            <div className="space-y-3">
              <p className="select-none pointer-events-none">Frequency : {filter.feq}</p>
              <Slider defaultValue={[filter.feq]} max={20000} min={0} step={1} onValueChange={(e) => handleFilterFeq(e[0])} />
            </div>
            <div className="space-y-3">
              <p className="select-none pointer-events-none">Q : {filter.Q}</p>
              <Slider defaultValue={[filter.Q]} max={10} min={0} step={0.1} onValueChange={(e) => handleFilterQ(e[0])} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="text-center">
          <Knob control={handleAttack} max={2} min={0} def={osc.env.attack} />
          <p className="select-none pointer-events-none">Attack</p>
        </div>
        <div className="text-center">
          <Knob control={handleHold} max={1} min={0} def={osc.env.hold} />
          <p className="select-none pointer-events-none">Hold</p>
        </div>
        <div className="text-center">
          <Knob control={handleDecay} max={1} min={0} def={osc.env.decay} />
          <p className="select-none pointer-events-none">Decay</p>
        </div>
        <div className="text-center">
          <Knob control={handleSustain} max={1} min={0} def={osc.env.sustain} />
          <p className="select-none pointer-events-none">Sustain</p>
        </div>
        <div className="text-center">
          <Knob control={handleRelease} max={1} min={0} def={osc.env.release} />
          <p className="select-none pointer-events-none">Release</p>
        </div>
      </div>
    </div>
  );
}
