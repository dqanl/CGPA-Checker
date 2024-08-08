import Task from './Task files/Task.js';
import generatePDF from './Task files/PDF.js';
import {
  btnStart,
  btnLabel,
  btnStartReady,
  gradingSectionsByYearSemester,
  frontPage,
  calculateBtn,
} from './Task files/querySelectors.js';

const gradeMapping = {
  5: 'A',
  4: 'B',
  3: 'C',
  2: 'D',
  1: 'E',
  0: 'F',
};

let checkingProArr = {
  btncheck1: 'year1r1',
  btncheck2: 'year1r2',
  btncheck3: 'year2r1',
  btncheck4: 'year2r2',
  btncheck5: 'year3r1',
  btncheck6: 'year3r2',
  btncheck7: 'year4r1',
  btncheck8: 'year4r2',
};

//This is the returned object that will be used to store the results of the computation
const results = {
  TotalCGPA: 0,
};

//This object will be used to store the values of the checked checkboxes and will be used to determine the next step
let matchingObj = {};

let finalValidation = [];

// Function to check if all values in an object are true so as to enable the start button
const completeVal = function (obj) {
  for (let key in obj) {
    if (obj[key] === true) {
      return true;
    }
  }
  return false;
};

const objFilter = function (obj) {
  // Step 1: Convert the object entries to an array
  const entries = Object.entries(obj);

  // Step 2: Use .filter to remove entries with false values
  const filteredEntries = entries.filter(([key, value]) => value === true);

  // Step 3: Convert the filtered array back to an object
  return Object.fromEntries(filteredEntries);
};

const finalDestination1 = function (val) {
  //THIS FUNCTION PRIMARY HIDES THE FIRST PAGE AND REVEAL THE PAGE FOR THE USER TO INPUT THE CALCULATION.

  //hides the front page
  frontPage.classList.add('d-none');
  Object.keys(val).forEach((key) => {
    gradingSectionsByYearSemester.forEach((el) => {
      //checking if the content in the querySelector matches the key in the object and if it does, it adds the classList to the finalValidation array
      if (checkingProArr[key] === el.classList[0]) {
        finalValidation.push(el.classList[0]);

        // reveling the selected content
        el.classList.remove('d-none');
      }
    });
  });

  calculateBtn.classList.remove('d-none');
};

btnStart.forEach((el) => {
  //Logs all the semester button then check if it is checked or not using an array.

  el.addEventListener('click', function () {
    if (el.checked === true) {
      matchingObj[el.id] = true;
    } else {
      matchingObj[el.id] = false;
    }

    if (completeVal(matchingObj) === true)
      btnStartReady.classList.remove('disabled');
    if (completeVal(matchingObj) === false)
      btnStartReady.classList.add('disabled');
  });
});

// btnLabel.forEach((el) => {
//   console.log(el.control.outerHTML.slice(45, 54));
// });

btnStartReady.addEventListener('click', function () {
  let final = objFilter(matchingObj);
  finalDestination1(final);
});

calculateBtn.addEventListener('click', function () {
  gradingSectionsByYearSemester.forEach((el) => {
    if (finalValidation.includes(el.classList[0])) {
      const semesterTitle = el
        .querySelector('.semester-title')
        .textContent.trim();
      results[semesterTitle] = {};
      results[semesterTitle]['computation'] = {
        'Grade Point': [],
        'Credit load': [],
        'Term CGPA': 0,
      };

      const selectedNumber = el.querySelectorAll('select');

      selectedNumber.forEach((el) => {
        const courseName = el.closest('.row').querySelector('.col-7').innerText;
        const creditLoad = el
          .closest('.row')
          .querySelector('.col-1')
          .innerText.trim();

        const grade = gradeMapping[el.value];
        results[semesterTitle][courseName] = grade;
        const creditLoadPoint =
          results[semesterTitle]['computation']['Credit load'];
        const gradeLoadPoint =
          results[semesterTitle]['computation']['Grade Point'];

        creditLoadPoint.push(+creditLoad);
        gradeLoadPoint.push(+el.value * +creditLoad);
        results[semesterTitle]['computation']['Term CGPA'] =
          Task.computerTermCGPA(creditLoadPoint, gradeLoadPoint);
      });
    }
  });
  results.TotalCGPA = Task.computeTotalCGPA(results);
  generatePDF.generatePDF(results);
});
