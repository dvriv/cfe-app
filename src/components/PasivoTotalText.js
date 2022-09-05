import React from 'react';
import MaskedInput, { conformToMask } from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const numberMask = createNumberMask({
  prefix: '$',
  suffix: '',
  allowDecimal: true,
  allowNegative: true,
  allowLeadingZeroes: false,
});

const PasivoTotalText = ({ value }) => {
  const finalValue = conformToMask(String(value), numberMask, { guide: false });
  if (Math.sign(value) === -1) {
    return <span style={{ color: '#d70000' }}>{finalValue.conformedValue}</span>;
  }
  return <span>{finalValue.conformedValue}</span>;
};

export default PasivoTotalText;
