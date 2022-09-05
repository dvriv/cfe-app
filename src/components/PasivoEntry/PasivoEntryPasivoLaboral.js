import React from 'react';
import { Header, Input, Segment, SegmentGroup, Grid} from 'semantic-ui-react';
import PasivoEntryInput from './PasivoEntryInput';
import PasivoTotalText from '../PasivoTotalText';


  // This table is done with hard coded values because those values are never going to change
const PasivoEntryPasivoLaboral= props => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={8}>
      <Segment>
          <Header>Factor Mensual (%):  </Header>
          <PasivoEntryInput
            inputData={props.inputData}
            onChange={props.inputHandleChange}
            onBlur={props.inputHandleBlur}
            name="factorPercent"
            mask="percentMask"
          />
      </Segment>
      </Grid.Column>
      <Grid.Column width={8}>
        <Segment>
        <Header>Saldo de la cuenta: </Header>
          <PasivoEntryInput
            inputData={props.inputData}
            onChange={props.inputHandleChange}
            onBlur={props.inputHandleBlur}
            name="saldoDeCuenta"
          />
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={16} >
        <Segment inverted>
          <Header>Provision del mes: </Header>
          <PasivoTotalText value={props.inputDataTotals.saldoDeCuenta} />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>

);

export default PasivoEntryPasivoLaboral;
