import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface IMultiSlider {
  thumbSize?: number;
  trackHeight?: number;
  minDistance?: number;
  minRange?: number;
  maxRange?: number;
  minValue?: number;
  maxValue?: number;
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
}

const MultiSliderV2 = ({
  minRange = 0,
  maxRange = 100,
  thumbSize = 20,
  trackHeight = 8,
  minDistance = 10,
  minValue = minRange,
  maxValue = maxRange,
  setMinValue,
  setMaxValue,
}: IMultiSlider) => {
  let containerRef = useRef<HTMLDivElement>(null);

  let handleLeftRef = useRef<HTMLButtonElement>(null);
  let handleRightRef = useRef<HTMLButtonElement>(null);
  let progressBarRef = useRef<HTMLDivElement>(null);
  let fillProgressRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState<null | number>(null);
  const [progressBarWidth, setProgressBarWidth] = useState<null | number>(null);

  let [dragging, setDragging] = useState(false);
  let handleLeftX = useMotionValue(0);
  let handleRightX = useMotionValue(0);

  const handleLeftDrag = () => {
    if (
      handleLeftRef &&
      progressBarRef &&
      handleLeftRef.current &&
      progressBarRef.current &&
      progressBarWidth
    ) {
      let progressBarBounds = progressBarRef.current.getBoundingClientRect();

      let handleLeftBounds = handleLeftRef.current.getBoundingClientRect();
      let middleOfLeftHandle = handleLeftBounds.x + handleLeftBounds.width / 2;
      let newLeftProgress =
        (middleOfLeftHandle - progressBarBounds.x) / progressBarWidth;

      setMinValue(newLeftProgress * 100);
    }
  };

  const handleRightDrag = () => {
    if (
      handleRightRef &&
      progressBarRef &&
      handleRightRef.current &&
      progressBarRef.current &&
      progressBarWidth
    ) {
      let progressBarBounds = progressBarRef.current.getBoundingClientRect();

      let handleRightBounds = handleRightRef.current.getBoundingClientRect();
      let middleOfRightHandle =
        handleRightBounds.x + handleRightBounds.width / 2;
      let newRightProgress =
        (middleOfRightHandle - progressBarBounds.x) / progressBarWidth;

      setMaxValue(newRightProgress * 100);
    }
  };

  useEffect(() => {
    if (progressBarRef && progressBarRef.current) {
      let newLeftProgress = minValue / 100;
      let progressBarBounds = progressBarRef.current.getBoundingClientRect();
      handleLeftX.set(
        newLeftProgress *
          (progressBarWidth ? progressBarWidth : progressBarBounds.width)
      );
    }
  }, [handleLeftX, minValue, progressBarWidth, progressBarRef, containerWidth]);

  useEffect(() => {
    if (progressBarRef && progressBarRef.current) {
      let newRightProgress = maxValue / 100;
      let progressBarBounds = progressBarRef.current.getBoundingClientRect();
      handleRightX.set(
        newRightProgress *
          (progressBarWidth ? progressBarWidth : progressBarBounds.width)
      );
    }
  }, [
    handleRightX,
    maxValue,
    progressBarRef,
    progressBarWidth,
    containerWidth,
  ]);

  function updateContainerWidth(
    ref: React.RefObject<HTMLDivElement>,
    setter: React.Dispatch<React.SetStateAction<number | null>>
  ) {
    if (ref && ref.current) {
      const width = ref.current?.getBoundingClientRect().width;
      setter(width);
    }
  }

  useEffect(() => {
    updateContainerWidth(containerRef, setContainerWidth);
  }, [containerRef]);

  useEffect(() => {
    updateContainerWidth(progressBarRef, setProgressBarWidth);
  }, [progressBarRef]);

  const handleTrackClick = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      progressBarRef &&
      progressBarRef.current &&
      containerWidth &&
      fillProgressRef &&
      fillProgressRef.current
    ) {
      let { left, width } = progressBarRef.current.getBoundingClientRect();
      let position = e.pageX - left;
      let newProgress = clamp(position / width, 0, 1);

      let percentage = (position * 100) / containerWidth;
      let locFromLeft = Math.abs(minValue - percentage);
      let locFromRight = Math.abs(maxValue - percentage);

      let closest = locFromLeft > locFromRight ? "right" : "left";
      let newValue = newProgress * 100;

      fillProgressRef.current.classList.add("transition-all");
      fillProgressRef.current.classList.add("duration-300");
      if (closest === "left") {
        animate(handleLeftX, newProgress * width);
        handleLeftX.set(newProgress * width);
        setMinValue(newValue);
      }

      if (closest === "right") {
        animate(handleRightX, newProgress * width);
        handleRightX.set(newProgress * width);
        setMaxValue(newValue);
      }
      setTimeout(() => {
        if (fillProgressRef && fillProgressRef.current) {
          fillProgressRef.current.classList.remove("transition-all");
          fillProgressRef.current.classList.remove("duration-300");
        }
      }, 300);
    }
  };

  //keyboard accesibility
  useEffect(() => {
    function keyDown(e: KeyboardEvent) {
      const { key } = e;
      const activeEl = document.activeElement;
      const buttonType = activeEl?.getAttribute("data-thumb-type") as
        | "left"
        | "right";

      if (buttonType === "left" && key === "ArrowRight") {
        setMinValue((pv) =>
          Math.min(
            Math.min(
              pv + 1,
              maxValue -
                valueToPercentage(minRange, maxRange, minDistance) / 100
            ),
            100
          )
        );
      }
      if (buttonType === "left" && key === "ArrowLeft") {
        setMinValue((pv) => Math.max(pv - 1, 0));
      }

      if (buttonType === "right" && key === "ArrowRight") {
        setMaxValue((pv) =>
          Math.min(
            Math.min(
              pv + 1,
              100 + valueToPercentage(minRange, maxRange, minDistance) / 100
            ),
            100
          )
        );
      }
      if (buttonType === "right" && key === "ArrowLeft") {
        setMaxValue((pv) => Math.max(pv - 1, minValue + minDistance));
      }
    }

    window.addEventListener("keydown", keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, [minValue, maxValue]);

  //window resize
  useEffect(() => {
    function onResize() {
      if (
        containerRef &&
        progressBarRef &&
        containerRef.current &&
        progressBarRef.current
      ) {
        updateContainerWidth(containerRef, setContainerWidth);
        updateContainerWidth(progressBarRef, setProgressBarWidth);
      }
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      key={containerWidth}
      className="p-8"
      role="slider"
      aria-valuemin={minRange}
      aria-valuemax={maxRange}
      aria-valuetext={`${Math.round(
        mapRange(minValue, minRange, maxRange)
      )} to ${Math.round(mapRange(maxValue, minRange, maxRange))}`}
    >
      <div className="relative flex items-center">
        <motion.div
          animate={{
            height: dragging ? trackHeight + thumbSize : trackHeight,
          }}
          style={{ height: trackHeight }}
          className={`absolute w-full h-4 rounded-full bg-gray-200`}
        ></motion.div>

        <div
          ref={progressBarRef}
          style={{
            left: thumbSize / 2,
            right: thumbSize / 2,
          }}
          className="absolute h-1"
        ></div>

        <div ref={containerRef} className="absolute w-full"></div>

        {containerWidth && progressBarWidth && (
          <>
            {/* fill progress */}
            <motion.div
              ref={fillProgressRef}
              animate={{
                height: dragging ? trackHeight + thumbSize : trackHeight,
              }}
              style={{
                height: trackHeight,
                left: handleLeftX.get() + thumbSize / 2,
                width: handleRightX.get() - handleLeftX.get(),
              }}
              className="absolute bg-gray-600 rounded-full"
            ></motion.div>
            {/* end of fill progess */}

            <div className="w-full relative inset-0 flex items-center">
              <div className={`absolute w-full ${maxValue}`}>
                {/* left thumb */}
                <motion.button
                  aria-describedby="left thumb button"
                  data-thumb-type="left"
                  ref={handleLeftRef}
                  drag="x"
                  dragMomentum={false}
                  dragConstraints={{
                    left: 0,
                    right:
                      handleRightX.get() -
                      (minDistance > 0
                        ? (minDistance * progressBarWidth) / 100
                        : 0),
                  }}
                  dragElastic={0}
                  onDrag={handleLeftDrag}
                  onDragStart={() => setDragging(true)}
                  onDragEnd={() => setDragging(false)}
                  onPointerDown={() => setDragging(true)}
                  onPointerUp={() => setDragging(false)}
                  animate={{
                    scale: dragging ? 1.5 : 1,
                  }}
                  style={{
                    width: thumbSize,
                    x: handleLeftX,
                  }}
                  className="relative z-10 w-full aspect-square rounded-full bg-gray-500 border-2 border-gray-300 shadow flex items-center justify-center"
                >
                  <span className="sr-only">left thumb button</span>
                  <span className="text-xs text-white"></span>
                </motion.button>
              </div>

              <div className="absolute w-full">
                {/* right thumb */}
                <motion.button
                  aria-describedby="right thumb button"
                  ref={handleRightRef}
                  data-thumb-type="right"
                  drag="x"
                  dragMomentum={false}
                  dragConstraints={{
                    left:
                      handleLeftX.get() +
                      (minDistance > 0
                        ? (minDistance * progressBarWidth) / 100
                        : 0),
                    right: containerWidth - thumbSize,
                  }}
                  dragElastic={0}
                  onDrag={handleRightDrag}
                  onDragStart={() => setDragging(true)}
                  onDragEnd={() => setDragging(false)}
                  onPointerDown={() => setDragging(true)}
                  onPointerUp={() => setDragging(false)}
                  animate={{
                    scale: dragging ? 1.5 : 1,
                  }}
                  style={{
                    width: thumbSize,
                    x: handleRightX,
                  }}
                  className="relative z-10 w-full aspect-square rounded-full bg-gray-500 border-2 border-gray-300 shadow flex items-center justify-center"
                >
                  <span className="sr-only">right thumb button</span>
                  <span className="text-xs text-white"></span>
                </motion.button>
              </div>
            </div>
          </>
        )}

        <div
          role="slider-clickable-area"
          className="absolute w-full h-4"
          onPointerDown={handleTrackClick}
        />
      </div>
    </div>
  );
};

function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}

export function mapRange(value: number, min: number, max: number) {
  let safeVal = value;
  if (value < 0) safeVal = 0;
  if (value > 100) safeVal = 100;

  const range = max - min;
  const valRelativeToMin = (safeVal / 100) * range;
  return min + valRelativeToMin;
}

export function valueToPercentage(
  minVal: number,
  maxVal: number,
  val: number
): number {
  let safeVal = val;
  if (val < minVal) safeVal = minVal;
  if (val > maxVal) safeVal = maxVal;

  const range = maxVal - minVal;
  const valRelativeToMin = safeVal - minVal;
  return (valRelativeToMin / range) * 100;
}

export default MultiSliderV2;
