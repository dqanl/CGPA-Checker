
const computerTermCGPA = function (a, b) {
  const sumA = a.reduce((acc, curr) => acc + curr, 0);
  const sumB = b.reduce((acc, curr) => acc + curr, 0);

  const result = sumB / sumA;

  return parseFloat(result.toFixed(2));
};

const computeTotalCGPA = function (objj) {
  function collectComputationValues(obj, key, result = []) {
    for (const [k, v] of Object.entries(obj)) {
      if (k === key) {
        result.push(...v);
      } else if (typeof v === 'object' && v !== null) {
        collectComputationValues(v, key, result);
      }
    }
    return result;
  }

  const allCreditLoads = collectComputationValues(objj, 'Credit load'); ///allCreditLoads
  const allGradePoints = collectComputationValues(objj, 'Grade Point'); ///allGradePoints

  const sumA = allCreditLoads.reduce((acc, curr) => acc + curr, 0);
  const sumB = allGradePoints.reduce((acc, curr) => acc + curr, 0);

  const result = sumB / sumA;

  return parseFloat(result.toFixed(2));
};

export default { computerTermCGPA, computeTotalCGPA };
