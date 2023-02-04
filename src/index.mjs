import {
  fluorescentTubeUnits,
  hoursPerDay,
  daysPerWeek,
  weeksPerMonth,
  monthsPerYear,
  singleTubeInfo,
} from "./constants.mjs";
import {setupInitialValues, rand} from "./utils.mjs";

let totalTimeInHours = monthsPerYear * weeksPerMonth * daysPerWeek * hoursPerDay;

let {total, tubes} = setupInitialValues({
  fluorescentTubeUnits,
  singleTubeInfo,
});

let totalTubesBroken = 0;

while(totalTimeInHours > 0) {

  // loop of each tubing unit box 
  tubes.forEach((t, i) => {
    let tubesBrokenInTheBox = 0;

     // looping each tube of the box, so their lifetime is affected here in each hour of the loop 
    Object.keys(t).forEach((key) => {
      tubes[i] = {
        ...tubes[i],
        [key]: tubes[i][key] - 1,
      };

      // asking if the tube lifetime arrived, so we can execute actions 
      if (tubes[i][key] === 0) {
        totalTubesBroken += 1;
        tubesBrokenInTheBox += 1;

        /* 
          asking if there are 2 tubes broken in a single unit, if so, we replace them and buy another ones, 
          incrementing the total of how much money we spend on the tubes
        */
        if (tubesBrokenInTheBox === 2) {
          tubes[i] = {
            ...tubes[i],
            [key]: rand(),
          };
          return total += singleTubeInfo.price * 4;
        }
      }
    });
  });
  totalTimeInHours -= 1;
}

console.log(`The total of how much money was spend in tubes is ${total} ${singleTubeInfo.currency}`);
console.log(`The total of the tubes broken is ${totalTubesBroken} tubes`);

