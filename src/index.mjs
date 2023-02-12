import {
  hoursPerDay,
  daysPerWeek,
  weeksPerMonth,
  monthsPerYear,
  singleTubeInfo,
} from "./constants.mjs";
import {setupInitialValues, buyNewTubesBox} from "./utils.mjs";

let totalTimeInHours = monthsPerYear * weeksPerMonth * daysPerWeek * hoursPerDay;

let {total, tubesBox} = setupInitialValues()

let totalTubesBroken = 0;
let boxIdCounter = tubesBox.length + 1;

while (totalTimeInHours > 0) {
  tubesBox.forEach((t, i) => {
    let tubesBrokenInCurrentBox = 0;
    for (let key of Object.keys(t)) {
      tubesBox[i] = {
        ...tubesBox[i],
        [key]: key !== "id" ? tubesBox[i][key] - 1 : tubesBox[i][key],
      };

      if (tubesBox[i][key] === 0) {
        totalTubesBroken += 1;
      }

      if (tubesBox[i][key] < 1) {
        tubesBrokenInCurrentBox += 1;
        if (tubesBrokenInCurrentBox > 1) {
          tubesBox.splice(i, 1);
          tubesBox.push(buyNewTubesBox(boxIdCounter));
          boxIdCounter += 1;
          total += singleTubeInfo.price * 4;
          break;
        }
      }
    }
  });
  totalTimeInHours -= 1;
}

console.log(`The total of how much money was spend in tubes is ${total} ${singleTubeInfo.currency}`);
console.log(`The total of the tubes broken is ${totalTubesBroken} tubes`);

