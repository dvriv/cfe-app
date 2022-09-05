export const pasivoTipos = [
  {
    text: 'Eventual',
    value: 'Eventual',
  },
  {
    text: 'Operacion',
    value: 'Operacion',
  },
];

export const pasivoModos = [
  {
    text: 'Ajuste de Pasivo',
    value: 'Ajuste',
  },
  {
    text: 'Creditos Adicionales',
    value: 'Creditos',
  },
];

export const months = [
  {
    text: 'Enero',
    value: 1,
  },
  {
    text: 'Febrero',
    value: 2,
  },
  {
    text: 'Marzo',
    value: 3,
  },
  {
    text: 'Abril',
    value: 4,
  },
  {
    text: 'Mayo',
    value: 5,
  },
  {
    text: 'Junio',
    value: 6,
  },
  {
    text: 'Julio',
    value: 7,
  },
  {
    text: 'Agosto',
    value: 8,
  },
  {
    text: 'Septiembre',
    value: 9,
  },
  {
    text: 'Octubre',
    value: 10,
  },
  {
    text: 'Noviembre',
    value: 11,
  },
  {
    text: 'Diciembre',
    value: 12,
  },
];

function getYears(firstYear) {
  const d = new Date();
  const currentYear = d.getFullYear();
  const yearsArray = [];
  for (let i = firstYear; i <= currentYear; i += 1) {
    yearsArray.push({ text: i, value: i });
  }
  return yearsArray;
}

export const years = getYears(2015);

export const operacionInputNames = {
  cuotaFija: null,
  excPatronal: null,
  pdPatronal: null,
  gmpPatronal: null,
  excObrera: null,
  pdObrera: null,
  gmpObrera: null,
  92: null,
  '9I': null,
  93: null,
  94: null,
  95: null,
  '9E': null,
  '9O': null,
};

export const ajusteOperacionInputNames = {
  cuotaFija: null,
  excPatronal: null,
  pdPatronal: null,
  gmpPatronal: null,
  excObrera: null,
  pdObrera: null,
  gmpObrera: null,
  92: null,
  '9I': null,
  93: null,
  94: null,
};

export const ajusteOperacionInputTotalsNames = {
  91: null,
  '9G': null,
  '234K1': null,
};

export const operacionInputTotalsNames = {
  91: null,
  '9G': null,
  '234K1': null,
  '2342G': null,
  '234K7': null,
};

export const pasivoLaboralInputNames = {
  clvPercent: null,
  factorPercent: null,
  farallonPercent: null,
};

export const pasivoLaboralTotalNames = {
  clv: null,
  provision: null,
  farallon: null,
};

export const impNominaImputNames = {
  impNominaOperacion: null,
  impNominaFarallon: null,
  fomentoEducacionOperacion: null,
  fomentoEducacionFarallon: null,
};

export const impNominaTotalNames = {
  totalOperacion: null,
  totalFarallon: null,
};

export const eventualInputNames = {
  cuotaFija: null,
  excPatronal: null,
  pdPatronal: null,
  gmpPatronal: null,
  excObrera: null,
  pdObrera: null,
  gmpObrera: null,
  riesgoTrabajo: null,
  ivPatronal: null,
  ivObrera: null,
  gps: null,
  95: null,
  '9E': null,
  '9Q': null,
  '2X': null,
};


export const eventualTotalNames = {
  99: null,
  '9U': null,
  '234K4': null,
  '2342G': null,
  '234K7': null,
  '2X': null,
};

// eslint-disable
export const sumObj = (obj) => {
  let sum = 0;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      sum += parseFloat (obj[key] || 0);
    }
  }
  return sum;
};

export const sumObj2 = (obj) => {
  const number = Object.keys(obj).reduce((sum, key) => sum + parseFloat(obj[key], 0));
  console.log(number, Object.keys(obj));
  return number;
};

export const sumObj3 = obj => Object.values(obj).reduce((a, b) => a + b);

