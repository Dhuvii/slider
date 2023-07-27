import { useState } from "react";
import Editor from "./components/inputs/Editor";
import MultiSliderV2, {
  mapRange,
  valueToPercentage,
} from "./components/inputs/MultiSliderV2";
import currencyFormatter from "./utilities/currencyFormatter";
import Slider from "./components/inputs/Slider";
import MultiSlider from "./components/inputs/MultiSlider";

const App = () => {
  const [minValue, setMinValue] = useState(valueToPercentage(300, 1800, 300));
  const [maxValue, setMaxValue] = useState(valueToPercentage(300, 1800, 1800));
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-10 bg-gray-50">
      {/* <div className="w-full max-w-md">
        <div className="">
          <MultiSliderV2
            minRange={300}
            maxRange={1800}
            minValue={minValue}
            setMinValue={setMinValue}
            maxValue={maxValue}
            setMaxValue={setMaxValue}
          />

          <div className="mt-1 w-full flex items-center justify-between">
            <div className="text-xs">
              {currencyFormatter(Math.round(mapRange(minValue, 300, 1800)))}
            </div>
            <div className="text-xs">
              {currencyFormatter(Math.round(mapRange(maxValue, 300, 1800)))}
            </div>
          </div>
        </div>
      </div> */}
      <div className="w-full">
        <MultiSlider />
      </div>
    </div>
  );
};

export default App;
