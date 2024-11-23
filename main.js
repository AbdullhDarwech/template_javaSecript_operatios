// Arrays
const arrayA = [];
const arrayB = [];
const arrayC = [];

const updateUI = (array, elementId) => {
  const container = document.getElementById(elementId);
  container.innerHTML = "";
  array.forEach((num, index) => {
    const li = document.createElement("li");
    li.textContent = num;
    li.ondblclick = () => {
      if (confirm(`Are you sure you want to delete ${num}?`)) {
        array.splice(index, 1);
        updateUI(array, elementId);
      }
    };
    container.appendChild(li);
  });
};


const addToArray = (matrix) => {
  const input = document.getElementById(`input${matrix}`);
  const value = Number(input.value);
  if (isNaN(value)) {
    alert("Please enter a valid number!");
    return;
  }
  const array = matrix === "A" ? arrayA : arrayB;
  if (array.length >= 9) {
    alert("Matrix is full. Cannot add more elements.");
    return;
  }
  array.push(value);
  updateUI(array, `array${matrix}`);
  input.value = "";
};


const findCommon = () => {
  arrayC.length = 0;
  arrayC.push(...arrayA.filter((num) => arrayB.includes(num)));
  updateUI(arrayC, "arrayC");
};

const findDifference = () => {
  arrayC.length = 0;
  arrayC.push(...arrayA.filter((num) => !arrayB.includes(num)));
  arrayC.push(...arrayB.filter((num) => !arrayA.includes(num)));
  updateUI(arrayC, "arrayC");
};

const sumPairs = () => {
  arrayC.length = 0;
  const maxLength = Math.max(arrayA.length, arrayB.length);
  for (let i = 0; i < maxLength; i++) {
    arrayC.push((arrayA[i] || 0) + (arrayB[i] || 0));
  }
  updateUI(arrayC, "arrayC");
};

const findTopNumbers = () => {
  arrayC.length = 0;
  const merged = [...arrayA, ...arrayB].sort((a, b) => a - b);
  arrayC.push(...merged.slice(0, 9));
  updateUI(arrayC, "arrayC");
};

const findEvens = () => {
  arrayC.length = 0;
  arrayC.push(...[...arrayA, ...arrayB].filter((num) => num % 2 === 0));
  updateUI(arrayC, "arrayC");
};

const findIndexes = () => {
  arrayC.length = 0;
  arrayA.forEach((num) => {
    const indexes = [];
    arrayB.forEach((val, index) => {
      if (num === val) {
        indexes.push(index);
      }
    });

    if (indexes.length >= 2) {
      arrayC.push(`Indexes for ${num}: ${indexes.join(", ")}`);
    } else {
      arrayC.push(...indexes);
    }
  });
  updateUI(arrayC, "arrayC");
};

const mergeOddIndexes = () => {
  arrayC.length = 0;
  const temp = [...arrayA, ...arrayB];
  arrayC.push(...temp.filter((_, index) => index % 2 !== 0));
  updateUI(arrayC, "arrayC");
};

const reduceSum = () => {
  arrayC.length = 0;
  const sum = [...arrayA, ...arrayB].reduce((acc, num) => acc + num, 0);
  arrayC.push(sum);
  updateUI(arrayC, "arrayC");
};
