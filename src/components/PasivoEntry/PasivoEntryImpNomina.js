import React from 'react';
import { Header, Input, Segment, SegmentGroup, Grid} from 'semantic-ui-react';
import PasivoEntryInput from './PasivoEntryInput';
import PasivoTotalText from '../PasivoTotalText';


  // This table is done with hard coded values because those values are never going to change
const PasivoEntryImpNomina = props => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={8}>
        <Segment inverted>
          <Header>Operacion</Header>
        </Segment>
      </Grid.Column>
      <Grid.Column width={8}>
        <Segment inverted>
          <Header>Farallon</Header>
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={8}>
        <Segment>
          <Header>Impuesto Sobre Nomina</Header>
          <PasivoEntryInput
            inputData={props.inputData}
            onChange={props.inputHandleChange}
            onBlur={props.inputHandleBlur}
            name="impNominaOperacion"
          />
        </Segment>
      </Grid.Column>
      <Grid.Column width={8}>
        <Segment>
          <Header>Impuesto Sobre Nomina</Header>
          <PasivoEntryInput
            inputData={props.inputData}
            onChange={props.inputHandleChange}
            onBlur={props.inputHandleBlur}
            name="impNominaFarallon"
          />
        </Segment>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={8}>
        <Segment>
          <Header>Fomento a la Educacion</Header>
          <PasivoEntryInput
            inputData={props.inputData}
            onChange={props.inputHandleChange}
            onBlur={props.inputHandleBlur}
            name="fomentoEducacionOperacion"
          />
        </Segment>
      </Grid.Column>
      <Grid.Column width={8}>
        <Segment>
          <Header>Fomento a la Educacion</Header>
          <PasivoEntryInput
            inputData={props.inputData}
            onChange={props.inputHandleChange}
            onBlur={props.inputHandleBlur}
            name="fomentoEducacionFarallon"
          />
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={8} >
        <Segment inverted>
          <Header>Total Operacion:</Header>
          <PasivoTotalText value={props.inputDataTotals.totalOperacion} />
        </Segment>
      </Grid.Column>
      <Grid.Column width={8} >
        <Segment inverted>
          <Header>Total Farallon:</Header>
          <PasivoTotalText value={props.inputDataTotals.totalFarallon} />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>

);

export default PasivoEntryImpNomina;
