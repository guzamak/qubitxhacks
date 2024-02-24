export const calculateSimilarity = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const totalProperties = keys1.length;
  let matchingProperties = 0;

  for (let key of keys1) {
    if (keys2.includes(key)) {
      if (typeof obj1[key] == "object") {
        if (
          Object.keys(obj1[key]).length != 0 || Object.keys(obj2[key]).length != 0
        ) {
          const subSimilarity = calculateSimilarity(obj1[key], obj2[key]);
          matchingProperties += subSimilarity / 100;
        } else {
          matchingProperties++;
        }
      } else if (
        typeof obj1[key] == "number" && typeof obj2[key] == "number"
      ) {
        const threshold = 1.5; 
        const difference = Math.abs(obj1[key] - obj2[key]);
        const percentCloseness = (1 - (difference / threshold));
        if (percentCloseness > 0) {
            matchingProperties += percentCloseness;
        }
      } else if (obj1[key] == obj2[key]) {
        matchingProperties++;
      }
    }
  }

  const similarityPercent = (matchingProperties / totalProperties) * 100;
  return similarityPercent.toFixed(2);
};
