import React from 'react';
import { Form, Radio, Select, TextArea, Header, Message } from 'semantic-ui-react';
import { months, years } from '../../common';

const NewPasivoModalForm = props => (
  <Form error={props.newPasivoError} success={props.newPasivoSuccess}>
    <Header size="small">Proceso</Header>
    <Form.Group >
      <Form.Field>
        <Radio
          label="Cuotas IMSS"
          name="procesoRadioGroup"
          value="cuotasIMSS"
          checked={props.procesoValue === 'cuotasIMSS'}
          onChange={props.formHandleChange}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label="Pasivo Laboral"
          name="procesoRadioGroup"
          value="pasivoLaboral"
          checked={props.procesoValue === 'pasivoLaboral'}
          onChange={props.formHandleChange}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label="Imp. S / Nom."
          name="procesoRadioGroup"
          value="impNomina"
          checked={props.procesoValue === 'impNomina'}
          onChange={props.formHandleChange}
        />
      </Form.Field>
    </Form.Group>
    <Header size="small">Tipo</Header>
    <Form.Group >
      <Form.Field>
        <Radio
          label="Eventual"
          name="tipoRadioGroup"
          value="Eventual"
          checked={props.tipoValue === 'Eventual'}
          onChange={props.formHandleChange}
          disabled={props.procesoValue !== 'cuotasIMSS' || props.procesoValue === undefined}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label="Operacion"
          name="tipoRadioGroup"
          value="Operacion"
          checked={props.tipoValue === 'Operacion'}
          onChange={props.formHandleChange}
          disabled={props.procesoValue !== 'cuotasIMSS' || props.procesoValue === undefined}
        />
      </Form.Field>
    </Form.Group>

    <Header size="small">Modo</Header>
    <Form.Group>
      <Form.Field>
        <Radio
          label="Pasivo"
          name="modoRadioGroup"
          value="Pasivo"
          checked={props.modoValue === 'Pasivo'}
          onChange={props.formHandleChange}
          disabled={props.procesoValue !== 'cuotasIMSS' || props.procesoValue === undefined}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label="Ajuste de Pasivo"
          name="modoRadioGroup"
          value="Ajuste"
          checked={props.modoValue === 'Ajuste'}
          onChange={props.formHandleChange}
          disabled={props.procesoValue !== 'cuotasIMSS' || props.procesoValue === undefined}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label="Creditos Adicionales"
          name="modoRadioGroup"
          value="Creditos"
          checked={props.modoValue === 'Creditos'}
          onChange={props.formHandleChange}
          disabled={props.procesoValue !== 'cuotasIMSS' || props.procesoValue === undefined}
        />
      </Form.Field>
    </Form.Group>

    <Header size="small">Fecha</Header>
    <Form.Group>
      <Form.Field>
        <Select
          name="monthSelect"
          onChange={props.formHandleChange}
          options={months}
          placeholder="Seleccione Mes"
        />
      </Form.Field>
      <Form.Field>
        <Select
          name="yearSelect"
          onChange={props.formHandleChange}
          options={years}
          placeholder="Seleccione año"
        />
      </Form.Field>
    </Form.Group>
    <Form.Field>
      <Header size="small">Notas (Opcional)</Header>
      <TextArea
        value={props.notasValue}
        placeholder="Opcional"
        onChange={props.formHandleChange}
        name="notasInput"
      />
    </Form.Field>
    <Message
      error
      header="Resumen repetido"
      content="Ya existe una resumen con esos datos"
    />
    <Message
      success
      header="Resumen agregado"
      content="En unos segundos seras redirigido"
    />
  </Form>
);

/* 
const test = props => (
  <Form controlid="radioList">
    <RadioGroup
      name="modo"
      value={props.modoValue}
      onChange={props.modoHandleChange}
    >
      <span>Modo</span>
      <Radio value="pasivo">Pasivo</Radio>
      <Radio value="ajuste">Ajuste de Pasivo</Radio>
      <Radio value="credito-adicional">Creditos Adicionales</Radio>
    </RadioGroup>
    <RadioGroup
      name="tipo"
      value={props.tipoValue}
      onChange={props.tipoHandleChange}
    >
      <span>Tipo</span>
      <Radio value="eventual">Eventual</Radio>
      <Radio value="operacion">Operacion</Radio>
    </RadioGroup>
    <span>Mes</span>
    <DatePicker
      format="MM-YYYY"
      value={props.dateValue}
      onChange={props.datePickerHandleChange}
    />
    <span>Notas</span>
    <Input onChange={props.notasHandleChange} componentClass="textarea" rows={3} style={{ width: 400 }} placeholder="Notas" />
  </Form>
);
*/

export default NewPasivoModalForm;
