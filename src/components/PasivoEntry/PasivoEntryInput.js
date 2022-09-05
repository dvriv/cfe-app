import React from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const numberMask = createNumberMask({
  prefix: '$',
  suffix: '',
  allowDecimal: true,
  allowNegative: true,
  allowLeadingZeroes: false,
});

const percentMask = createNumberMask({
  prefix: '',
  suffix: '%',
  allowDecimal: true,
  allowNegative: true,
  allowLeadingZeroes: true,
  integerLimit: 2,
  decimalLimit: 10,
});

const PasivoEntryInput = props => (
  <MaskedInput
    value={props.shouldBeDisabled ?
      props.type === 'provision' ? props.provisionData[props.name] : props.diferenciaData[props.name]
      : props.inputData[props.name]}
    disabled={props.shouldBeDisabled}
    style={{ width: 150 }}
    size="lg"
    className="rs-input"
    mask={props.mask === 'percentMask' ? percentMask : numberMask}
    onChange={props.onChange}
    onBlur={props.onBlur}
    name={props.name}
  />
);

export default PasivoEntryInput;
