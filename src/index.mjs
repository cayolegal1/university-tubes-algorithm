import {
  fluorescentTubeUnits,
  hoursPerDay,
  daysPerWeek,
  weeksPerMonth,
  monthsPerYear,
  singleTubeInfo,
} from "./constants.mjs";
import {setupInitialValues, buyNewTubesBox} from "./utils.mjs";

let totalTimeInHours = monthsPerYear * weeksPerMonth * daysPerWeek * hoursPerDay;
//let totalTimeInHours = 30;

let {total, tubes} = setupInitialValues({
  fluorescentTubeUnits,
});

console.log('tubos =>', tubes)

let totalTubesBroken = 0;
let boxIdCounter = tubes.length + 1;

while(totalTimeInHours > 0) {
  tubes.forEach((t, i) => {
    let tubesBrokenInTheBox = 0;
    Object.keys(t).forEach((key) => {
      if(tubes[i][key] > 0) {
        tubes[i] = {
          ...tubes[i],
          [key]: key !== "id" ? tubes[i][key] - 1 : tubes[i][key],
        };
        if (tubes[i][key] === 0) {
          totalTubesBroken += 1;
        }
      } else {tubesBrokenInTheBox += 1}
    });

    if (tubesBrokenInTheBox >= 2) {
      tubes.splice(i, 1);
      tubes.push(buyNewTubesBox(boxIdCounter));
      boxIdCounter += 1;
      total += singleTubeInfo.price * 4;
    }
  });

  totalTimeInHours -= 1;
}
console.log(tubes)
console.log(`The total of how much money was spend in tubes is ${total} ${singleTubeInfo.currency}`);
console.log(`The total of the tubes broken is ${totalTubesBroken} tubes`);

