const btnStart = document.querySelectorAll('.btn-check');

const jumpStart = document.getElementById('btncheck4');
const btnLabel = document.querySelectorAll('label.btn.btn-outline-primary');
const btnStartReady = document.querySelector('.btn-start-ready');

let checkingProArr = [];

const validation = function () {};
let matchingObj = {};

const completeVal = function (obj) {
  for (let key in obj) {
    if (obj[key] === true) {
      return true;
    }
  }
  return false;
};

btnStart.forEach((el) => {
  console.log((matchingObj[el.id] = el.checked));

  el.addEventListener('click', function () {
    if (el.checked === true) {
      console.log(`eeee`);
      matchingObj[el.id] = true;
      console.log(matchingObj);
      // btnStartReady.classList.remove('disabled');
    } else {
      matchingObj[el.id] = false;
      console.log(matchingObj);
      // btnStartReady.classList.add('disabled');
    }

    if (completeVal(matchingObj) === true)
      btnStartReady.classList.remove('disabled');
    if (completeVal(matchingObj) === false)
      btnStartReady.classList.add('disabled');

    console.log(`${completeVal(matchingObj)} --- RRRRRR`);
  });
});



