import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface IMultiSlider {
  thumbSize?: number;
  trackHeight?: number;
  minDistance?: number;
  minRange?: number;
  maxRange?: number;
  initialMinValue?: number;
  initialMaxValue?: number;
}

const MultiSlider = ({
  minRange = 0,
  maxRange = 100,
  thumbSize = 20,
  trackHeight = 8,
  minDistance = 10,
  initialMinValue = minRange,
  initialMaxValue = maxRange,
}: IMultiSlider) => {
  if (initialMinValue < minRange)
    throw new Error(
      `Initial minimum value exceeds minimum range, ${initialMinValue} < ${minRange}`
    );

  if (initialMaxValue > maxRange)
    throw new Error(
      `Initial maximum value exceeds maximum range, ${initialMaxValue} > ${maxRange}`
    );

  let containerRef = useRef<HTMLDivElement>(null);

  let handleLeftRef = useRef<HTMLButtonElement>(null);
  let handleRightRef = useRef<HTMLButtonElement>(null);
  let progressBarRef = useRef<HTMLDivElement>(null);
  let fillProgressRef = useRef<HTMLDivElement>(null);

  let [leftValue, setLeftValue] = useState(
    valueToPercentage(minRange, maxRange, initialMinValue)
  );
  let [rightValue, setRightValue] = useState(
    valueToPercentage(minRange, maxRange, initialMaxValue)
  );

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
      progressBarRef.current
    ) {
      let progressBarBounds = progressBarRef.current.getBoundingClientRect();

      let handleLeftBounds = handleLeftRef.current.getBoundingClientRect();
      let middleOfLeftHandle = handleLeftBounds.x + handleLeftBounds.width / 2;
      let newLeftProgress =
        (middleOfLeftHandle - progressBarBounds.x) / progressBarBounds.width;

      setLeftValue(newLeftProgress * 100);
    }
  };

  const handleRightDrag = () => {
    if (
      handleRightRef &&
      progressBarRef &&
      handleRightRef.current &&
      progressBarRef.current
    ) {
      let progressBarBounds = progressBarRef.current.getBoundingClientRect();

      let handleRightBounds = handleRightRef.current.getBoundingClientRect();
      let middleOfRightHandle =
        handleRightBounds.x + handleRightBounds.width / 2;
      let newRightProgress =
        (middleOfRightHandle - progressBarBounds.x) / progressBarBounds.width;

      setRightValue(newRightProgress * 100);
    }
  };

  useEffect(() => {
    if (progressBarRef && progressBarRef.current) {
      let newLeftProgress = leftValue / 100;
      let progressBarBounds = progressBarRef.current.getBoundingClientRect();
      handleLeftX.set(newLeftProgress * progressBarBounds.width);
    }
  }, [handleLeftX, leftValue, progressBarRef]);

  useEffect(() => {
    if (progressBarRef && progressBarRef.current) {
      let newRightProgress = rightValue / 100;
      let progressBarBounds = progressBarRef.current.getBoundingClientRect();
      handleRightX.set(newRightProgress * progressBarBounds.width);
    }
  }, [handleRightX, rightValue, progressBarRef]);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const width = containerRef.current?.getBoundingClientRect().width;
      setContainerWidth(width);
    }
  }, [containerRef]);

  useEffect(() => {
    if (progressBarRef && progressBarRef.current) {
      const width = progressBarRef.current?.getBoundingClientRect().width;
      setProgressBarWidth(width);
    }
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
      let locFromLeft = Math.abs(leftValue - percentage);
      let locFromRight = Math.abs(rightValue - percentage);

      let closest = locFromLeft > locFromRight ? "right" : "left";
      let newValue = newProgress * 100;

      fillProgressRef.current.classList.add("transition-all");
      fillProgressRef.current.classList.add("duration-300");
      if (closest === "left") {
        animate(handleLeftX, newProgress * width);
        setLeftValue(newValue);
        handleLeftX.set(newProgress * width);
      }

      if (closest === "right") {
        animate(handleRightX, newProgress * width);
        setRightValue(newValue);
        handleRightX.set(newProgress * width);
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
        setLeftValue((pv) =>
          Math.min(
            Math.min(
              pv + 1,
              rightValue -
                valueToPercentage(minRange, maxRange, minDistance) / 100
            ),
            100
          )
        );
      }
      if (buttonType === "left" && key === "ArrowLeft") {
        setLeftValue((pv) => Math.max(pv - 1, 0));
      }

      if (buttonType === "right" && key === "ArrowRight") {
        setRightValue((pv) =>
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
        setRightValue((pv) => Math.max(pv - 1, leftValue + minDistance));
      }
    }

    window.addEventListener("keydown", keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, [leftValue, rightValue]);

  return (
    <div
      className="p-8"
      role="slider"
      aria-valuemin={minRange}
      aria-valuemax={maxRange}
      aria-valuetext={`${leftValue} to ${rightValue}`}
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
              <div className={`absolute w-full ${rightValue}`}>
                {/* left thumb */}
                <motion.button
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
                  <span className="text-xs text-white"></span>
                </motion.button>
              </div>

              <div className="absolute w-full">
                {/* right thumb */}
                <motion.button
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
      <div className="w-full flex items-center justify-between">
        <div className="mt-10 whitespace-nowrap">
          {Math.round(mapRange(leftValue, minRange, maxRange))}
        </div>
        <div className="mt-10 whitespace-nowrap">
          {Math.round(mapRange(rightValue, minRange, maxRange))}
        </div>
      </div>
    </div>
  );
};

function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}

function mapRange(value: number, min: number, max: number) {
  let safeVal = value;
  if (value < 0) safeVal = 0;
  if (value > 100) safeVal = 100;

  const range = max - min;
  const valRelativeToMin = (safeVal / 100) * range;
  return min + valRelativeToMin;
}

function valueToPercentage(
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

export default MultiSlider;
