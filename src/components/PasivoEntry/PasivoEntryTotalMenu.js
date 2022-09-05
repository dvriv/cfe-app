import React from 'react';
import { Header, Segment, Button, Grid, Container } from 'semantic-ui-react';
import { BrowserRouter as Router } from 'react-router-dom';
import PasivoTotalText from '../PasivoTotalText';

const PasivoEntryTotalMenu = (props) => {
  if (props.proceso === 'cuotasIMSS' && props.modo === 'Pasivo' && props.tipo === 'Operacion') {
    return (
      <Segment style={{ margin: 0, position: 'fixed', bottom: 20, width: '70%'}}>
        <Grid>
          <Grid.Column width={5}>
            <Header sub size="huge">Cuota Obrera y Patronal:</Header>
            <PasivoTotalText value={props.inputDataTotals['234K1']} />
          </Grid.Column>
          <Grid.Column width={5}>
            <Header sub size="huge">Retiro:</Header>
            <PasivoTotalText value={props.inputDataTotals['2342G']} />
          </Grid.Column>
          <Grid.Column width={5}>
            <Header sub size="huge">Cesantia y Vejez:</Header>
            <PasivoTotalText value={props.inputDataTotals['234K7']} />
          </Grid.Column>
          <Grid.Column width={7}>
            <Button onClick={props.saveResumenClickHandler} primary>Guardar</Button>
            <Button onClick={props.generateFile} secondary>Generar</Button>
            <Button secondary>Modificar</Button>
            <Button secondary>Restablecer</Button>
            <Button color="red">Eliminar</Button>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }

  if (props.proceso === 'cuotasIMSS' && props.modo === 'Pasivo' && props.tipo === 'Eventual') {
    return (
      <Segment style={{ margin: 0, position: 'fixed', bottom: 20, width: '70%'}}>
        <Grid>
          <Grid.Column width={4}>
            <Header sub size="huge">Cuota Obrera y Patronal:</Header>
            <PasivoTotalText value={props.inputDataTotals['234K4']} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Header sub size="huge">Retiro:</Header>
            <PasivoTotalText value={props.inputDataTotals['2342G']} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Header sub size="huge">Cesantia y Vejez:</Header>
            <PasivoTotalText value={props.inputDataTotals['234K7']} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Header sub size="huge">INFONAVIT:</Header>
            <PasivoTotalText value={props.inputDataTotals['2342A']} />
          </Grid.Column>
          <Grid.Column width={7}>
            <Button onClick={props.saveResumenClickHandler} primary>Guardar</Button>
            <Button onClick={props.generateFile} secondary>Generar</Button>
            <Button secondary>Modificar</Button>
            <Button secondary>Restablecer</Button>
            <Button color="red">Eliminar</Button>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
  if (props.proceso === 'cuotasIMSS' && props.modo === 'Ajuste' && props.tipo === 'Operacion') {
    return (
      <Segment style={{ margin: 0, position: 'fixed', bottom: 20, width: '70%'}}>
        <Grid>
          <Grid.Column width={3}>
            <Header sub size="huge">Provision:</Header>
            <PasivoTotalText value={props.provisionDataTotals['234K1']} />
          </Grid.Column>
          <Grid.Column width={3}>
            <Header sub size="huge">Liquidacion:</Header>
            <PasivoTotalText value={props.inputDataTotals['234K1']} />
          </Grid.Column>
          <Grid.Column width={3}>
            <Header sub size="huge">Diferencia:</Header>
            <PasivoTotalText value={props.diferenciaDataTotals['234K1']} />
          </Grid.Column>
          <Grid.Column width={7}>
            <Button onClick={props.saveResumenClickHandler} primary>Guardar</Button>
            <Button onClick={props.generateFile} secondary>Generar</Button>
            <Button secondary>Modificar</Button>
            <Button secondary>Restablecer</Button>
            <Button color="red">Eliminar</Button>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
  if (props.proceso === 'cuotasIMSS' && props.modo === 'Ajuste' && props.tipo === 'Eventual') {
    return (
      <Segment style={{ margin: 0, position: 'fixed', bottom: 20, width: '70%'}}>
        <Grid>
          <Grid.Column width={3}>
            <Header sub size="huge">Provision:</Header>
            <PasivoTotalText value={props.provisionDataTotals['234K4']} />
          </Grid.Column>
          <Grid.Column width={3}>
            <Header sub size="huge">Liquidacion:</Header>
            <PasivoTotalText value={props.inputDataTotals['234K4']} />
          </Grid.Column>
          <Grid.Column width={3}>
            <Header sub size="huge">Diferencia:</Header>
            <PasivoTotalText value={props.diferenciaDataTotals['234K4']} />
          </Grid.Column>
          <Grid.Column width={7}>
            <Button onClick={props.saveResumenClickHandler} primary>Guardar</Button>
            <Button onClick={props.generateFile} secondary>Generar</Button>
            <Button secondary>Modificar</Button>
            <Button secondary>Restablecer</Button>
            <Button color="red">Eliminar</Button>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
  if (props.proceso === 'pasivoLaboral' || props.proceso === 'impNomina') {
    return (
      <Segment style={{ margin: 0, position: 'fixed', bottom: 20, width: '70%' }}>
        <Grid>
          <Grid.Column width={7}>
            <Button primary>Guardar</Button>
            <Button onClick={props.generateFile} secondary>Generar</Button>
            <Button secondary>Modificar</Button>
            <Button secondary>Restablecer</Button>
            <Button color="red">Eliminar</Button>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
};

export default PasivoEntryTotalMenu;
