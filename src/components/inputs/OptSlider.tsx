import {
  motion,
  MotionConfig,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

export default function OptSlider() {
  let initialHeight = 4;
  let height = 12;
  let buffer = 12;
  let [ref, bounds] = useMeasure();
  let [hovered, setHovered] = useState(false);
  let [panning, setPanning] = useState(false);
  let progress = useMotionValue(0.5);
  let width = useTransform(progress, (v) => `${v * 100}%`);
  let roundedProgress = useTransform(
    progress,
    (v) => `${roundTo(v * 100, 0)}%`
  );
  let [progressState, setProgressState] = useState(roundedProgress.get());
  let state = panning ? "panning" : hovered ? "hovered" : "idle";

  useEffect(() => {
    roundedProgress.onChange((v) => setProgressState(v));
  }, [roundedProgress]);

  return (
    <MotionConfig transition={transition}>
      <motion.div
        animate={state}
        onPanStart={() => setPanning(true)}
        onPanEnd={() => setPanning(false)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onPan={(event, info) => {
          let deltaInPercent = info.delta.x / bounds.width;
          let newPercent = clamp(progress.get() + deltaInPercent, 0, 1);
          progress.set(newPercent);
        }}
        style={{ height: height + buffer }}
        className="flex items-center justify-center relative touch-none grow-0"
        variants={{
          idle: { width: "calc(95% - 48px)" },
          hovered: { width: "calc(100% - 48px)" },
          panning: { width: "calc(100% - 48px)" },
        }}
        initial={false}
        ref={ref}
      >
        <motion.div
          initial={false}
          variants={{
            idle: { height: initialHeight },
            hovered: { height },
            panning: { height },
          }}
          className="relative rounded-full overflow-hidden w-full"
        >
          <div className="h-full bg-gray-200" />
          <motion.div
            style={{ width }}
            className="bg-blue-500 absolute inset-0"
          />
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}

let transition = { type: "spring", bounce: 0, duration: 0.3 };

let clamp = (num: number, min: number, max: number) =>
  Math.max(Math.min(num, max), min);

function roundTo(number: number, decimals: number): number {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
