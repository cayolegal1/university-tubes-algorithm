import { singleTubeInfo, fluorescentTubeUnits, tubesPerUnit } from "./constants.mjs";

const minValue = 100;
const maxValue = 200;

export const rand = () => {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
}

export const setupInitialValues = () => {
  let currentTotalPrice = 0;
  let tubesWithLifetime = [];
  fluorescentTubeUnits.forEach((t, i) => {
    tubesWithLifetime[i] = {id: t.id}
    Object.keys(t).forEach((key) => {
      if(key !== 'id') {
        tubesWithLifetime[i] = {
          ...tubesWithLifetime[i],
          [key]: rand(),
        };
        currentTotalPrice += singleTubeInfo.price;
      }
    })
  })

  return {
    total: currentTotalPrice,
    tubes: tubesWithLifetime,
  }
};

export const buyNewTubesBox = (id) => {
  let tubes = {id};
  for(let i = 1; i <= tubesPerUnit; i++) { tubes[`tube${i}`] = rand() }
  return tubes
}
