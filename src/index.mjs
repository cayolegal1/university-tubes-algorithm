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

while(totalTimeInHours > 0) {

  // looping each box unit
  tubesBox.forEach((t, i) => {
    let tubesBrokenInCurrentBox = 0;

    // looping each tube of the box
    Object.keys(t).forEach((key) => {

      // we ask if the tube still works, if not, we no continue to use it
      if (tubesBox[i][key] > 0) {
        tubesBox[i] = {
          ...tubesBox[i],

          // here we substract each hour of the tube if the key is not the id of the box
          [key]: key !== "id" ? tubesBox[i][key] - 1 : tubesBox[i][key],
        };
        
        // we ask if the time of life of the tube arrives, if so, we add the count of the total tubes broken
        if (tubesBox[i][key] === 0) totalTubesBroken += 1;
        
        // if the tube doesn't work, we add the count of how many tubes are broken in a single unit 
      } else tubesBrokenInCurrentBox += 1;
    });

    /*
      we ask if there are two or more tubes (because there is a possibility that two or more tubes has the same useful time 
      and therefore break in the same time) broken in the current box unit, if so, we change it for another one, and we add 
      the amount of the box to the total of what the university have spent in the year
    */
    if (tubesBrokenInCurrentBox >= 2) {
      tubesBox.splice(i, 1);
      tubesBox.push(buyNewTubesBox(boxIdCounter));
      boxIdCounter += 1;
      total += singleTubeInfo.price * 4;
    }
  });

  totalTimeInHours -= 1;
}

console.log(`The total of how much money was spend in tubes is ${total} ${singleTubeInfo.currency}`);
console.log(`The total of the tubes broken is ${totalTubesBroken} tubes`);

