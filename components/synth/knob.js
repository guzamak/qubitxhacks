"use client";
import { useState, useRef, useEffect } from "react";

export default function Knob({ control = () => {}, min = 0, max = 100, def = 50 }) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [startPosition, setStartPosition] = useState({
    x: null,
    y: null,
  });
  const [value, setvalue] = useState(def);
  const knobRef = useRef();
  const maxRotateYRef = useRef(100);
  const maxValueRef = useRef(max);
  const minValueRef = useRef(min);

  const handleMouseDown = (e) => {
    setStartPosition({
      x: e.pageX,
      y: e.pageY,
    });
    setIsMouseDown(true);
  };

  const handleMouseUp = (e) => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    setStartPosition({
      x: e.pageX,
      y: e.pageY,
    });
    if (isMouseDown) {
      const y = e.pageY;
      const deltaY = startPosition.y - y;
      // max percentY = 100% use to control rotate deg and value
      const percentY = deltaY * (100 / maxRotateYRef.current);
      // set value
      const newValue = Math.max(
        Math.min(
          value + (maxValueRef.current * percentY) / 100,
          maxValueRef.current
        ),
        minValueRef.current
      );
      setvalue(Math.round(newValue * 1000) / 1000);
    }
  };

  const handleTouchDown = (e) => {
    setStartPosition({
      x: e.touches[0].pageX,
      y: e.touches[0].pageY,
    });
    setIsTouching(true);
  };

  const handleTouchUp = (e) => {
    setIsTouching(false);
  };

  const handleTouchMove = (e) => {
    if (isTouching) {
      setStartPosition({
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
      });
      const touch = e.touches[0];
      const y = touch.pageY;
      const deltaY = startPosition.y - y;
      const percentY = deltaY * (100 / maxRotateYRef.current);
      // set value
      const newValue = Math.max(
        Math.min(
          value + (maxValueRef.current * percentY) / 100,
          maxValueRef.current
        ),
        minValueRef.current
      );
      setvalue(Math.round(newValue * 1000) / 1000);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleTouchUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleTouchUp);
    };
  }, []);

  // rotate knob
  useEffect(() => {
    control(value)
    const range = maxValueRef.current - minValueRef.current;
    const adjustedValue = value - minValueRef.current;
    const percentValue = (adjustedValue / range) * 100;
    const newRotate =
      Math.min(Math.max((360 * percentValue) / 100, 0), 360) - 180;
    knobRef.current.style.transform = `rotate(${newRotate}deg)`;
  }, [value]);

  return (
    <div>
      <input
        type="range"
        value={value}
        max={max}
        min={min}
        step="0.01"
        readOnly
        className="hidden"    
        />
      <div
        className=" w-12 h-12 border-2 rounded-full relative flex justify-center overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchDown}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchUp}
        ref={knobRef}
      >
        <div className="w-6 h-[0.05rem] bg-slate-300 rotate-90"></div>
      </div>
      <p className="text-slate-300 my-1 text-sm select-none pointer-events-none">{value}</p>
    </div>
  );
}
