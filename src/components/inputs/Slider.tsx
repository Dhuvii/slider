import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Slider = () => {
  console.log("rerendering");
  const handleSize = 20;
  const trackHeight = 8;
  const sliderTrackColor = "#d1d5db";
  const sliderTrackFiledColor = "#374151";

  const constraintRef = useRef<HTMLDivElement>(null);
  let handleRef = useRef<HTMLDivElement>(null);
  let progressBarRef = useRef<HTMLDivElement>(null);

  let min = 0;
  let max = 100;
  let [value, setValue] = useState(30);
  let [dragging, setDragging] = useState(false);
  let percent = value / (max - min);

  let handleX = useMotionValue(0);
  let progress = useTransform(handleX, (v) => v + handleSize / 2);
  let background = useMotionTemplate`linear-gradient(90deg, ${sliderTrackFiledColor} ${progress}px, ${sliderTrackColor} 0)`;

  const handleDrag = (e: MouseEvent | TouchEvent | PointerEvent) => {
    if (
      handleRef &&
      progressBarRef &&
      handleRef.current &&
      progressBarRef.current
    ) {
      let handleBounds = handleRef.current.getBoundingClientRect();
      let middleOfHandle = handleBounds.x + handleBounds.width / 2;
      let progressBarBounds = progressBarRef.current.getBoundingClientRect();
      let newProgress =
        (middleOfHandle - progressBarBounds.x) / progressBarBounds.width;

      setValue(newProgress * (max - min));
    }
  };

  useEffect(() => {
    if (progressBarRef && progressBarRef.current) {
      let newProgress = value / (max - min);
      let progressBarBounds = progressBarRef.current.getBoundingClientRect();

      handleX.set(newProgress * progressBarBounds.width);
    }
  }, [handleX, max, min, value, progressBarRef]);

  return (
    <div className="p-8">
      <div className="relative flex items-center">
        <motion.div
          animate={{
            height: dragging ? trackHeight + handleSize : trackHeight,
          }}
          style={{ height: trackHeight, background }}
          className={`absolute w-full h-4 rounded-full`}
        ></motion.div>

        <div
          ref={progressBarRef}
          style={{
            left: handleSize / 2,
            right: handleSize / 2,
          }}
          className="absolute h-1"
        ></div>

        <div ref={constraintRef} className="w-full">
          <motion.div
            ref={handleRef}
            drag="x"
            dragMomentum={false}
            dragConstraints={constraintRef}
            dragElastic={0}
            onDrag={handleDrag}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            onPointerDown={() => setDragging(true)}
            onPointerUp={() => setDragging(false)}
            animate={{
              scale: dragging ? 1.5 : 1,
            }}
            style={{
              width: handleSize,
              x: handleX,
            }}
            className="relative z-10 aw-full aspect-square rounded-full bg-gray-500 border-2 border-gray-300 shadow"
          ></motion.div>
        </div>

        <div
          data-test="slider-clickable-area"
          className="absolute w-full h-4"
          onPointerDown={(event) => {
            if (progressBarRef && progressBarRef.current) {
              let { left, width } =
                progressBarRef.current.getBoundingClientRect();
              let position = event.pageX - left;
              let newProgress = clamp(position / width, 0, 1);
              let newValue = newProgress * (max - min);
              setValue(newValue);
              animate(handleX, newProgress * width);
            }
          }}
        />
      </div>
      <div className="mt-10">{Math.floor(value * 100) / 100}</div>
    </div>
  );
};

function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}

export default Slider;
