import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import NewPasivoModalForm from './NewPasivoModalForm';
import addNewPasivo from '../../API/addNewPasivo';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

class NewPasivoModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipoValue: null,
      modoValue: null,
      monthValue: null,
      yearValue: null,
      notasValue: '',
      newPasivoError: false,
      newPasivoSuccess: false,
      newPasivoId: null,
    };
    this.shouldButtonBeDisabled = this.shouldButtonBeDisabled.bind(this);
    this.addNewPasivoHandleClick = this.addNewPasivoHandleClick.bind(this);
    this.formHandleChange = this.formHandleChange.bind(this);
    this.closeAndResetModal = this.closeAndResetModal.bind(this);
  }


  formHandleChange(event, { name, value }) {
    switch (name) {
      case 'procesoRadioGroup':
        this.setState({ procesoValue: value });
        break;
      case 'modoRadioGroup':
        this.setState({ modoValue: value });
        break;
      case 'tipoRadioGroup':
        this.setState({ tipoValue: value });
        break;
      case 'monthSelect':
        this.setState({ monthValue: value });
        break;
      case 'yearSelect':
        this.setState({ yearValue: value });
        break;
      case 'notasInput':
        this.setState({ notasValue: value });
        break;
      default: throw new Error('value not valid');
    }
  }

  // This is done because user shouldn't be able to click the button if he hasn't fill
  // all the form camps
  shouldButtonBeDisabled() {
    if (this.state.procesoValue === 'pasivoLaboral') {
      if (
        this.state.monthValue &&
        this.state.yearValue
      ) {
        return false;
      }
    }
    if (this.state.procesoValue === 'cuotasIMSS') {
      if (
        this.state.tipoValue &&
        this.state.modoValue &&
        this.state.monthValue &&
        this.state.yearValue
      ) {
        return false;
      }
    }
    if (this.state.procesoValue === 'impNomina') {
      if (
        this.state.monthValue &&
        this.state.yearValue
      ) {
        return false;
      }
    }
    return true;
  }

  async addNewPasivoHandleClick() {
    const proceso = this.state.procesoValue;
    const tipo = this.state.tipoValue;
    const modo = this.state.modoValue;
    const month = this.state.monthValue;
    const year = this.state.yearValue;
    const notas = this.state.notasValue;
    console.log('Handle Click', notas);
    const response = await addNewPasivo(proceso, tipo, modo, month, year, notas);
    console.log(response);
    if (response && response.constraint && response.constraint === 'no_repetidos_excepto_creditos') {
      this.setState({ newPasivoError: true });
    }
    if (response && response.length > 0) {
      this.setState({ newPasivoSuccess: true, newPasivoId: response[0].resumen_id });
    }
  }

  // This is done because the form values are not reset when just closing the modal.
  closeAndResetModal() {
    this.props.closeNewPasivoModal();
    this.setState({
      procesoValue: null,
      tipoValue: null,
      modoValue: null,
      monthValue: null,
      yearValue: null,
      notasValue: null,
    });
  }

  render() {
    if (this.state.newPasivoSuccess) {
      return <Redirect to={`/pasivos/${this.state.newPasivoId}/editar`} />;
    }
    return (
      <div className="modal-container">
        <Modal size="tiny" open={this.props.showModal} onClose={this.closeAndResetModal}>
          <Modal.Header>Agregar nuevo</Modal.Header>
          <Modal.Content>
            <NewPasivoModalForm
              procesoValue={this.state.procesoValue}
              modoValue={this.state.modoValue}
              tipoValue={this.state.tipoValue}
              monthValue={this.state.monthValue}
              yearValue={this.state.yearValue}
              notasValue={this.state.notasValue}
              formHandleChange={this.formHandleChange}
              newPasivoError={this.state.newPasivoError}
              newPasivoSuccess={this.state.newPasivoSuccess}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              disabled={this.shouldButtonBeDisabled()}
              onClick={this.addNewPasivoHandleClick}
              primary
            >
              Crear Nuevo
            </Button>
            <Button onClick={this.closeAndResetModal}>
              Cancelar
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default NewPasivoModalContainer;

