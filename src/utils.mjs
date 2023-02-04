const minValue = 100;
const maxValue = 200;

export const rand = () => {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
}

export const setupInitialValues = ({
  fluorescentTubeUnits,
  singleTubeInfo,
}) => {
  let currentTotalPrice = 0;
  let tubesWithLifetime = [];
  fluorescentTubeUnits.forEach((t, i) => {
    Object.keys(t).forEach((key) => {
      tubesWithLifetime[i] = {
        ...tubesWithLifetime[i],
        [key]: rand(),
      };
      currentTotalPrice += singleTubeInfo.price;
    });
  });

  return {
    total: currentTotalPrice,
    tubes: tubesWithLifetime,
  }
};