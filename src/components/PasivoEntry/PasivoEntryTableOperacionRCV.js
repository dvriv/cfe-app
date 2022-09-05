import React from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Table } from 'semantic-ui-react';

const numberMask = createNumberMask({
  prefix: '$',
  suffix: '',
  allowDecimal: true,
  requireDecimal: true,
  allowNegative: true,
  allowLeadingZeroes: false,
});

  // This table is done with hard coded values because those values are never going to change
const PasivoEntryTableOperacionRCV = props => (
  <Table celled structured>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Rama</Table.HeaderCell>
        <Table.HeaderCell>Subdivision</Table.HeaderCell>
        <Table.HeaderCell>Concepto de Costo</Table.HeaderCell>
        <Table.HeaderCell>Cuenta Contable</Table.HeaderCell>
        <Table.HeaderCell>Provision</Table.HeaderCell>
        <Table.HeaderCell>Liquidacion</Table.HeaderCell>
        <Table.HeaderCell>Diferencia</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Retiro</Table.Cell>
        <Table.Cell> </Table.Cell>
        <Table.Cell>2342G</Table.Cell>
        <Table.Cell>409518</Table.Cell>
        <Table.Cell><MaskedInput style={{ width: 200 }} size="lg" className="rs-input" mask={numberMask} /></Table.Cell>
        <Table.Cell><MaskedInput disabled style={{ width: 200 }} size="lg" className="rs-input" mask={numberMask} /></Table.Cell>
        <Table.Cell><MaskedInput style={{ width: 200 }} size="lg" className="rs-input" mask={numberMask} /></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell rowSpan="2">Cesantia y Vejez</Table.Cell>
        <Table.Cell>Patronal</Table.Cell>
        <Table.Cell>9E</Table.Cell>
        <Table.Cell>451450</Table.Cell>
        <Table.Cell><MaskedInput style={{ width: 200 }} size="lg" className="rs-input" mask={numberMask} /></Table.Cell>
        <Table.Cell><MaskedInput style={{ width: 200 }} size="lg" className="rs-input" mask={numberMask} /></Table.Cell>
        <Table.Cell><MaskedInput style={{ width: 200 }} size="lg" className="rs-input" mask={numberMask} /></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Obrera</Table.Cell>
        <Table.Cell>9O</Table.Cell>
        <Table.Cell>451451</Table.Cell>
        <Table.Cell><MaskedInput style={{ width: 200 }} size="lg" className="rs-input" mask={numberMask} /></Table.Cell>
        <Table.Cell><MaskedInput style={{ width: 200 }} size="lg" className="rs-input" mask={numberMask} /></Table.Cell>
        <Table.Cell><MaskedInput style={{ width: 200 }} size="lg" className="rs-input" mask={numberMask} /></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Total</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>234K7</Table.Cell>
        <Table.Cell>409724</Table.Cell>
        <Table.Cell><MaskedInput style={{ width: 200 }} size="lg" className="rs-input" mask={numberMask} /></Table.Cell>
        <Table.Cell><MaskedInput style={{ width: 200 }} size="lg" className="rs-input" mask={numberMask} /></Table.Cell>
        <Table.Cell><MaskedInput style={{ width: 200 }} size="lg" className="rs-input" mask={numberMask} /></Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default PasivoEntryTableOperacionRCV;
