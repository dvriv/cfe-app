import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PasivoEntry from './PasivoEntry';
import { getPasivoById } from '../../API/getPasivo';
import savePasivoResumen from '../../API/savePasivoCuentas';
import loadPasivoProvision from '../../API/loadPasivoProvision';
import loadPasivoResumen from '../../API/loadPasivoCuentas';
import { generateFileCuotasIMSS, generateFilePasivoLaboral, generateFile } from '../../API/generateFile';
import {
  operacionInputNames,
  operacionInputTotalsNames,
  sumObj3,
  eventualInputNames,
  eventualTotalNames,
  pasivoLaboralInputNames,
  pasivoLaboralTotalNames,
  ajusteOperacionInputNames,
  ajusteOperacionInputTotalsNames,
  impNominaImputNames,
  impNominaTotalNames,
} from '../../common';

//  This delete the '$', '.', ',' from the input data
const maskedInputToInteger = (value) => {
  const re = /,|\$|_|/g;
  return parseFloat(value.replace(re, ''));
};

//  This check if the string have both decimal digits
const checkIfHaveDecimal = (value) => {
  const haveTwoDecimals = /\.\d\d$/g;
  const haveOneDecimal = /\.\d$/g;
  const haveZeroDecimalsWithPoint = /\.$/g;
  const haveZeroDecimalsWithoutPoint = /\./g;

  if (value && haveTwoDecimals.test(value)) {
    return 'haveTwoDecimals';
  }
  if (value && !haveZeroDecimalsWithoutPoint.test(value)) {
    console.log('haveZeroDecimalsWithoutPoint');
    return 'haveZeroDecimalsWithoutPoint';
  }

  if (value && haveOneDecimal.test(value)) {
    console.log('haveOneDecimal');
    return 'haveOneDecimal';
  }

  if (value && haveZeroDecimalsWithPoint.test(value)) {
    console.log('haveZeroDecimalsWithPoint');
    return 'haveZeroDecimalsWithPoint';
  }
  return false;
};

class PasivoEntryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: [],
      provisionShouldBeDisabled: true,
      liquidacionShouldBeDisabled: true,
      inputData: null,
      inputNumberData: null,
      inputDataTotals: null,
      provisionData: null,
      provisionNumberData: null,
      provisionDataTotals: null,
      diferenciaData: null,
      diferenciaNumberData: null,
      diferenciaDataTotals: null,
      downloadFile: false,
      loading: true,
      fileName: '',
    };
    this.inputHandleChange = this.inputHandleChange.bind(this);
    this.inputHandleBlur = this.inputHandleBlur.bind(this);
    this.fetchPasivoMeta = this.fetchPasivoMeta.bind(this);
    this.setStateToInputAndNumberData = this.setStateToInputAndNumberData.bind(this);
    this.setStateToInputDataTotals = this.setStateToInputDataTotals.bind(this);
    this.generateFile = this.generateFile.bind(this);
    this.initializeStateNames = this.initializeStateNames.bind(this);
    this.saveResumenClickHandler = this.saveResumenClickHandler.bind(this);
    this.loadResumenCuentas = this.loadResumenCuentas.bind(this);
    this.loadProvisionResumenCuentas = this.loadProvisionResumenCuentas.bind(this);
    this.setStateToProvisionAndNumberData = this.setStateToProvisionAndNumberData.bind(this);
    this.sumStateToProvisionAndNumberData = this.sumStateToProvisionAndNumberData.bind(this);
    this.setStateToDiferenciaData = this.setStateToDiferenciaData.bind(this);
  }

  async componentDidMount() {
    await this.fetchPasivoMeta();
    await this.initializeStateNames();
    await this.loadResumenCuentas();
    await this.loadProvisionResumenCuentas();
    this.setState({ loading: false });
  }

  async loadResumenCuentas() {
    const response = await loadPasivoResumen(this.state.metadata[0].resumen_id);
    console.log('those are the accounts', response);
    for (let object of response) {
      // const numberValue = maskedInputToInteger(object.monto);
      this.setStateToInputAndNumberData(object.concepto_costo, Number(object.monto), Number(object.monto));
    }
    this.setStateToInputDataTotals();
  }

  async loadProvisionResumenCuentas() {
    if (this.state.metadata[0].modo === 'Ajuste' && (this.state.metadata[0].mes % 2) === 0) {
      const mesActual = await loadPasivoProvision(this.state.metadata[0].mes, this.state.metadata[0].año, this.state.metadata[0].tipo);
      const mesAnterior = await loadPasivoProvision(this.state.metadata[0].mes - 1, this.state.metadata[0].año, this.state.metadata[0].tipo);
      for (let object of mesActual) {
        this.setStateToProvisionAndNumberData(object.concepto_costo, Number(object.monto), Number(object.monto));
        this.setStateToDiferenciaData(object.concepto_costo);
      }
      for (let object of mesAnterior) {
        this.sumStateToProvisionAndNumberData(object.concepto_costo, Number(object.monto), Number(object.monto));
        this.setStateToDiferenciaData(object.concepto_costo);
      }
      this.setStateToInputDataTotals();
    }
    else if (this.state.metadata[0].modo === 'Ajuste') {
      const response = await loadPasivoProvision(this.state.metadata[0].mes, this.state.metadata[0].año, this.state.metadata[0].tipo);
      console.log('those are provision accounts', response);
      for (let object of response) {
        this.setStateToProvisionAndNumberData(object.concepto_costo, Number(object.monto), Number(object.monto));
        this.setStateToDiferenciaData(object.concepto_costo);
      }
      this.setStateToInputDataTotals();
    }
  }

  setStateToDiferenciaData(name) {
    this.setState((prevState) => {
      let diferencia = Number(prevState.provisionNumberData[name]) - Number(prevState.inputNumberData[name]);
      if (!diferencia) {
        diferencia = 0;
      }
      console.log(diferencia);
      return ({
        diferenciaData: {
          ...prevState.diferenciaData,
          [name]: diferencia,
        },
        diferenciaNumberData: {
          ...prevState.diferenciaNumberData,
          [name]: diferencia,
        },
      });
    });
  }

  setStateToProvisionAndNumberData(provisionName, provisionValue, numberValue) {
    this.setState(prevState => ({
      provisionData: {
        ...prevState.provisionData,
        [provisionName]: provisionValue,
      },
      provisionNumberData: {
        ...prevState.provisionNumberData,
        [provisionName]: provisionValue,
      },
    }));
  }

  sumStateToProvisionAndNumberData(provisionName, provisionValue, numberValue) {
    if (
      provisionName === '95' ||
      provisionName === '9E' ||
      provisionName === '9Q' ||
      provisionName === '2X' ||
      provisionName === 95 ||
      provisionName === '9E' ||
      provisionName === '9O'
    ) {
      this.setState(prevState => ({
        provisionData: {
          ...prevState.provisionData,
          [provisionName]: provisionValue + prevState.provisionData[provisionName],
        },
        provisionNumberData: {
          ...prevState.provisionNumberData,
          [provisionName]: provisionValue + prevState.provisionNumberData[provisionName],
        },
      }));
    }
  }

  setStateToInputAndNumberData(inputName, inputValue, numberValue) {
    this.setState(prevState => ({
      inputData: {
        ...prevState.inputData,
        [inputName]: inputValue,
      },
      inputNumberData: {
        ...prevState.inputNumberData,
        [inputName]: numberValue,
      },
    }));
  }

  setStateToInputDataTotals() {
    let saldoDeCuentaFixed = 0;
    let clvFixed = 0;
    let farallonFixed = 0;

    // *********************************** Pasivo Laboral ****************************

    if (this.state.metadata[0].proceso === 'pasivoLaboral') {

      const saldoDeCuenta = (this.state.inputNumberData.factorPercent / 100) * this.state.inputNumberData.saldoDeCuenta;

      saldoDeCuentaFixed = saldoDeCuenta.toFixed(2);
      const clv = saldoDeCuenta;
      clvFixed = clv.toFixed(2) || 0;
      console.log('clvfixed', this.state.inputNumberData.clvPercent);

      this.setState({
        inputDataTotals: {
          saldoDeCuenta: saldoDeCuentaFixed,
          clv: clvFixed,
        },
      });
    }

    // *********************************** Impuesto Sobre Nomina 3% ********************
    if (this.state.metadata[0].proceso === 'impNomina') {
      this.setState(prevState => ({
        inputDataTotals: {
          totalOperacion:
          0 +
          prevState.inputNumberData.fomentoEducacionOperacion +
          prevState.inputNumberData.impNominaOperacion,
          totalFarallon:
          0 +
          prevState.inputNumberData.fomentoEducacionFarallon +
          prevState.inputNumberData.impNominaFarallon,
        },
      }));
    }

    // *********************************** Pasivo Operacion ****************************
    if (this.state.metadata[0].proceso === 'cuotasIMSS' && this.state.metadata[0].tipo === 'Operacion') {
      this.setState(prevState => ({
        inputDataTotals: {
          91:
          0 +
          prevState.inputNumberData.cuotaFija +
          prevState.inputNumberData.excPatronal +
          prevState.inputNumberData.pdPatronal +
          prevState.inputNumberData.gmpPatronal,
          '9G':
          0 +
          prevState.inputNumberData.excObrera +
          prevState.inputNumberData.pdObrera +
          prevState.inputNumberData.gmpObrera,
          '234K1':
          0 +
          prevState.inputNumberData.cuotaFija +
          prevState.inputNumberData.excPatronal +
          prevState.inputNumberData.pdPatronal +
          prevState.inputNumberData.gmpPatronal + // 91
          prevState.inputNumberData.excObrera +
          prevState.inputNumberData.pdObrera +
          prevState.inputNumberData.gmpObrera + // 9G
          prevState.inputNumberData['9I'] +
          prevState.inputNumberData[92] +
          prevState.inputNumberData[93] +
          prevState.inputNumberData[94],
          '2342G':
          0 +
          prevState.inputNumberData[95],
          '234K7':
          0 +
          prevState.inputNumberData['9E'] +
          prevState.inputNumberData['9O'],
        },
      }));
    }
    // ****************** Diferencia Totals Operacion
    if (this.state.metadata[0].proceso === 'cuotasIMSS' &&
    this.state.metadata[0].tipo === 'Operacion' &&
    this.state.metadata[0].modo === 'Ajuste') {
      this.setState(prevState => ({
        diferenciaDataTotals: {
          91:
          0 +
          prevState.diferenciaData.cuotaFija +
          prevState.diferenciaData.excPatronal +
          prevState.diferenciaData.pdPatronal +
          prevState.diferenciaData.gmpPatronal,
          '9G':
          0 +
          prevState.diferenciaData.excObrera +
          prevState.diferenciaData.pdObrera +
          prevState.diferenciaData.gmpObrera,
          '234K1':
          0 +
          prevState.diferenciaData.cuotaFija +
          prevState.diferenciaData.excPatronal +
          prevState.diferenciaData.pdPatronal +
          prevState.diferenciaData.gmpPatronal + // 91
          prevState.diferenciaData.excObrera +
          prevState.diferenciaData.pdObrera +
          prevState.diferenciaData.gmpObrera + // 9G
          prevState.diferenciaData['9I'] +
          prevState.diferenciaData[92] +
          prevState.diferenciaData[93] +
          prevState.diferenciaData[94],
          '2342G':
          0 +
          prevState.diferenciaData[95],
          '234K7':
          0 +
          prevState.diferenciaData['9E'] +
          prevState.diferenciaData['9O'],
        },
      }));
      this.setState(prevState => ({
        provisionDataTotals: {
          '234K1':
          0 +
          prevState.provisionData.cuotaFija +
          prevState.provisionData.excPatronal +
          prevState.provisionData.pdPatronal +
          prevState.provisionData.gmpPatronal + // 91
          prevState.provisionData.excObrera +
          prevState.provisionData.pdObrera +
          prevState.provisionData.gmpObrera + // 9G
          prevState.provisionData['9I'] +
          prevState.provisionData[92] +
          prevState.provisionData[93] +
          prevState.provisionData[94],
        },
      }));
    }

    // Pasivo Eventuales
    if (this.state.metadata[0].proceso === 'cuotasIMSS' && this.state.metadata[0].tipo === 'Eventual') {
      this.setState(prevState => ({
        inputDataTotals: {
          99:
          0 +
          prevState.inputNumberData.cuotaFija +
          prevState.inputNumberData.excPatronal +
          prevState.inputNumberData.pdPatronal +
          prevState.inputNumberData.gmpPatronal +
          prevState.inputNumberData.ivPatronal +
          prevState.inputNumberData.riesgoTrabajo +
          prevState.inputNumberData.gps,
          '9U':
          0 +
          prevState.inputNumberData.excObrera +
          prevState.inputNumberData.pdObrera +
          prevState.inputNumberData.gmpObrera +
          prevState.inputNumberData.ivObrera,
          '234K4':
          0 +
          prevState.inputNumberData.cuotaFija +
          prevState.inputNumberData.excPatronal +
          prevState.inputNumberData.pdPatronal +
          prevState.inputNumberData.gmpPatronal +
          prevState.inputNumberData.ivPatronal +
          prevState.inputNumberData.riesgoTrabajo +
          prevState.inputNumberData.gps +
          prevState.inputNumberData.excObrera +
          prevState.inputNumberData.pdObrera +
          prevState.inputNumberData.gmpObrera +
          prevState.inputNumberData.ivObrera,
          '2342G':
          0 +
          prevState.inputNumberData[95],
          '234K7':
          0 +
          prevState.inputNumberData['9E'] +
          prevState.inputNumberData['9Q'],
          '2342A':
          0 +
          prevState.inputNumberData['2X'],
        },
      }));
    }

    // Ajuste Eventuales
    if (this.state.metadata[0].proceso === 'cuotasIMSS' &&
    this.state.metadata[0].tipo === 'Eventual' &&
    this.state.metadata[0].modo === 'Ajuste') {
      this.setState(prevState => ({
        diferenciaDataTotals: {
          99:
          0 +
          prevState.diferenciaData.cuotaFija +
          prevState.diferenciaData.excPatronal +
          prevState.diferenciaData.pdPatronal +
          prevState.diferenciaData.gmpPatronal +
          prevState.diferenciaData.ivPatronal +
          prevState.diferenciaData.riesgoTrabajo +
          prevState.diferenciaData.gps,
          '9U':
          0 +
          prevState.diferenciaData.excObrera +
          prevState.diferenciaData.pdObrera +
          prevState.diferenciaData.gmpObrera +
          prevState.diferenciaData.ivObrera,
          '234K4':
          0 +
          prevState.diferenciaData.cuotaFija +
          prevState.diferenciaData.excPatronal +
          prevState.diferenciaData.pdPatronal +
          prevState.diferenciaData.gmpPatronal +
          prevState.diferenciaData.ivPatronal +
          prevState.diferenciaData.riesgoTrabajo +
          prevState.diferenciaData.gps +
          prevState.diferenciaData.excObrera +
          prevState.diferenciaData.pdObrera +
          prevState.diferenciaData.gmpObrera +
          prevState.diferenciaData.ivObrera,
          '2342G':
          0 +
          prevState.diferenciaData[95],
          '234K7':
          0 +
          prevState.diferenciaData['9E'] +
          prevState.diferenciaData['9Q'],
          '2342A':
          0 +
          prevState.diferenciaData['2X'],
        },
      }));
      this.setState(prevState => ({
        provisionDataTotals: {
          '234K4':
          0 +
          prevState.provisionData.cuotaFija +
          prevState.provisionData.excPatronal +
          prevState.provisionData.pdPatronal +
          prevState.provisionData.gmpPatronal +
          prevState.provisionData.ivPatronal +
          prevState.provisionData.riesgoTrabajo +
          prevState.provisionData.gps +
          prevState.provisionData.excObrera +
          prevState.provisionData.pdObrera +
          prevState.provisionData.gmpObrera +
          prevState.provisionData.ivObrera,
        },
      }));
    }
  }

  async fetchPasivoMeta() {
    const response = await getPasivoById(this.props.match.params.id);
    if (!response || response.error) {
      console.log('there was an error getting the pasivos');
      // Show error not getting data from DB
    }
    const metadata = response.data;
    const provisionShouldBeDisabled = (metadata[0].modo !== 'Pasivo' || this.props.match.params.mode !== 'editar');
    const liquidacionShouldBeDisabled = (metadata[0].modo === 'Pasivo' || this.props.match.params.mode !== 'editar');
    const diferenciaShouldBeDisabled = (metadata[0].modo === 'Pasivo' || this.props.match.params.mode !== 'editar');

    this.setState({
      metadata,
      provisionShouldBeDisabled,
      liquidacionShouldBeDisabled,
      diferenciaShouldBeDisabled,
    });
    console.log('this is from fetchPasivoMeta', metadata);
  }

  initializeStateNames() {
    // Pasivo Laboral
    if (this.state.metadata[0].proceso === 'pasivoLaboral') {
      this.setState({
        inputData: pasivoLaboralInputNames,
        inputNumberData: pasivoLaboralInputNames,
        inputDataTotals: pasivoLaboralTotalNames,
      });
    }
    // Impuesto S / Nomina
    if (this.state.metadata[0].proceso === 'impNomina') {
      this.setState({
        inputData: impNominaImputNames,
        inputNumberData: impNominaImputNames,
        inputDataTotals: impNominaTotalNames,
      });
    }
    if (this.state.metadata[0].proceso === 'cuotasIMSS' &&
    this.state.metadata[0].modo === 'Pasivo' &&
    this.state.metadata[0].tipo === 'Operacion'
    ) {
      this.setState({
        inputData: operacionInputNames,
        inputNumberData: operacionInputNames,
        inputDataTotals: operacionInputTotalsNames,
        diferenciaData: operacionInputNames,
        diferenciaNumberData: operacionInputNames,
        diferenciaDataTotals: operacionInputTotalsNames,
      });
    }
    if (this.state.metadata[0].proceso === 'cuotasIMSS' &&
    this.state.metadata[0].tipo === 'Eventual'
    ) {
      this.setState({
        inputData: eventualInputNames,
        inputNumberData: eventualInputNames,
        inputDataTotals: eventualTotalNames,
        diferenciaData: eventualInputNames,
        diferenciaNumberData: eventualInputNames,
        diferenciaDataTotals: eventualTotalNames,
      });
    }
    if (this.state.metadata[0].proceso === 'cuotasIMSS' &&
    this.state.metadata[0].modo === 'Ajuste' &&
    this.state.metadata[0].tipo === 'Operacion'
    ) {
      this.setState({
        inputData: ajusteOperacionInputNames,
        inputNumberData: ajusteOperacionInputNames,
        inputDataTotals: ajusteOperacionInputTotalsNames,
        provisionData: ajusteOperacionInputNames,
        provisionNumberData: ajusteOperacionInputNames,
        provisionDataTotals: ajusteOperacionInputTotalsNames,
        diferenciaData: operacionInputNames,
        diferenciaNumberData: operacionInputNames,
        diferenciaDataTotals: operacionInputTotalsNames,
      });
    }
    if (this.state.metadata[0].proceso === 'cuotasIMSS' &&
    this.state.metadata[0].modo === 'Ajuste' &&
    this.state.metadata[0].tipo === 'Eventual'
    ) {
      this.setState({
        inputData: eventualInputNames,
        inputNumberData: eventualInputNames,
        inputDataTotals: eventualTotalNames,
        provisionData: eventualInputNames,
        provisionNumberData: eventualInputNames,
        provisionDataTotals: eventualTotalNames,
        diferenciaData: eventualInputNames,
        diferenciaNumberData: eventualInputNames,
        diferenciaDataTotals: eventualTotalNames,
      });
    }
  }

  /*
  addDecimalsToInputs(e) {

  }
  */

  inputHandleChange(e) {
    const { name } = e.target;
    const { value } = e.target;
    const numberValue = maskedInputToInteger(value);

    this.setStateToInputAndNumberData(name, value, numberValue);
    if (this.state.metadata[0].modo === 'Ajuste') {
      this.setStateToDiferenciaData(name);
    }
  }

  inputHandleBlur(e) {
    const { name } = e.target;
    const { value } = e.target;
    let finalValue = value;
    let numberValue = maskedInputToInteger(finalValue);
    if (this.state.metadata[0].proceso === 'cuotasIMSS') {
      switch (checkIfHaveDecimal(value)) {
        case false:
          finalValue = '$0.00';
          numberValue = 0;
          break;
        case 'haveTwoDecimals':
          break;
        case 'haveZeroDecimalsWithoutPoint':
          finalValue = `${value}.00`;
          numberValue = maskedInputToInteger(finalValue);
          break;
        case 'haveOneDecimal':
          finalValue = `${value}0`;
          numberValue = maskedInputToInteger(finalValue);
          break;
        case 'haveZeroDecimalsWithPoint':
          finalValue = `${value}00`;
          numberValue = maskedInputToInteger(finalValue);
          break;
        default:
          console.log('dunno what to do on default');
      }
    }
    this.setStateToInputAndNumberData(name, finalValue, numberValue);
    this.setStateToInputDataTotals();
    const sumAll = (sumObj3(this.state.inputNumberData));
    console.log(sumAll);
  }

  async generateFile() {
    // Generate File Pasivo Laboral
    if (this.state.metadata[0].proceso === 'pasivoLaboral') {
      const cuentasMayor = {
        clv: this.state.inputDataTotals.clv,
      };

      const result = await generateFile(null, cuentasMayor, this.state.metadata[0]);
      console.log(result);
      if (result) {
        this.setState({ downloadFile: true, fileName: result.name });
      }
    }

    //Generate File Impuesto Sobre Nomina
    if (this.state.metadata[0].proceso === 'impNomina') {
      const cuentasMayor = {
        totalFarallon: this.state.inputDataTotals.totalFarallon,
        totalOperacion: this.state.inputDataTotals.totalOperacion,
      };
      const cuentasContables = {
        fomentoEducacionFarallon: this.state.inputNumberData.fomentoEducacionFarallon,
        fomentoEducacionOperacion: this.state.inputNumberData.fomentoEducacionOperacion,
        impNominaFarallon: this.state.inputNumberData.impNominaFarallon,
        impNominaOperacion: this.state.inputNumberData.impNominaOperacion,
      };

      const result = await generateFile(cuentasContables, cuentasMayor, this.state.metadata[0]);
      console.log(result);
      if (result) {
        this.setState({ downloadFile: true, fileName: result.name });
      }
    }

    // Generate File Pasivo Operacion
    if (
      this.state.metadata[0].proceso === 'cuotasIMSS' &&
      this.state.metadata[0].tipo === 'Operacion' &&
      this.state.metadata[0].modo === 'Pasivo'
    ) {
      const cuentasContables = {
        91: this.state.inputDataTotals[91],
        '9G': this.state.inputDataTotals['9G'],
        92: this.state.inputNumberData[92],
        '9I': this.state.inputNumberData['9I'],
        93: this.state.inputNumberData['93'],
        94: this.state.inputNumberData['94'],
        95: this.state.inputNumberData['95'],
        '9E': this.state.inputNumberData['9E'],
        '9O': this.state.inputNumberData['9O'],
      };

      const cuentasMayor = {
        '2342G': this.state.inputDataTotals['2342G'],
        '234K1': this.state.inputDataTotals['234K1'],
        '234K7': this.state.inputDataTotals['234K7'],
      };

      const result = await generateFile(cuentasContables, cuentasMayor, this.state.metadata[0]);
      if (result) {
        this.setState({ downloadFile: true, fileName: result.name });
      }
    }
    // Generate File Ajuste Operacion
    if (
      this.state.metadata[0].proceso === 'cuotasIMSS' &&
      this.state.metadata[0].tipo === 'Operacion' &&
      this.state.metadata[0].modo === 'Ajuste' &&
      (this.state.metadata[0].mes % 2) === 1
    ) {
      const cuentasContables = {
        91: this.state.diferenciaDataTotals[91],
        '9G': this.state.diferenciaDataTotals['9G'],
        92: this.state.diferenciaData[92],
        '9I': this.state.diferenciaData['9I'],
        93: this.state.diferenciaData['93'],
        94: this.state.diferenciaData['94'],
      };

      const cuentasMayor = {
        '234K1': this.state.diferenciaDataTotals['234K1'],
      };

      const result = await generateFile(cuentasContables, cuentasMayor, this.state.metadata[0]);
      if (result) {
        this.setState({ downloadFile: true, fileName: result.name });
      }
    }
    // Generate File Pasivo Eventual
    if (
      this.state.metadata[0].proceso === 'cuotasIMSS' &&
      this.state.metadata[0].tipo === 'Eventual' &&
      this.state.metadata[0].modo === 'Pasivo'
    ) {
      const cuentasContables = {
        99: this.state.inputDataTotals[99],
        '9U': this.state.inputDataTotals['9U'],
        95: this.state.inputNumberData['95'],
        '9E': this.state.inputNumberData['9E'],
        '9Q': this.state.inputNumberData['9Q'],
        '2X': this.state.inputNumberData['2X'],
      };

      const cuentasMayor = {
        '2342G': this.state.inputDataTotals['2342G'],
        '234K4': this.state.inputDataTotals['234K4'],
        '234K7': this.state.inputDataTotals['234K7'],
        '2342A': this.state.inputDataTotals['2342A'],
      };

      const result = await generateFile(cuentasContables, cuentasMayor, this.state.metadata[0]);
      if (result) {
        this.setState({ downloadFile: true, fileName: result.name });
      }
    }
    // Generate File Ajuste Eventual
    if (
      this.state.metadata[0].proceso === 'cuotasIMSS' &&
      this.state.metadata[0].tipo === 'Eventual' &&
      this.state.metadata[0].modo === 'Ajuste' &&
      (this.state.metadata[0].mes % 2) === 1
    ) {
      const cuentasContables = {
        99: this.state.diferenciaDataTotals[99],
        '9U': this.state.diferenciaDataTotals['9U'],
      };

      const cuentasMayor = {
        '234K4': this.state.diferenciaDataTotals['234K4'],
      };

      const result = await generateFile(cuentasContables, cuentasMayor, this.state.metadata[0]);
      if (result) {
        this.setState({ downloadFile: true, fileName: result.name });
      }
    }
    // Generate File Ajuste Eventual Bimestral
    if (
      this.state.metadata[0].proceso === 'cuotasIMSS' &&
      this.state.metadata[0].tipo === 'Eventual' &&
      this.state.metadata[0].modo === 'Ajuste' &&
      (this.state.metadata[0].mes % 2) === 0
    ) {
      const cuentasContables = {
        99: this.state.diferenciaDataTotals[99],
        '9U': this.state.diferenciaDataTotals['9U'],
        95: this.state.diferenciaData[95],
        '9E': this.state.diferenciaData['9E'],
        '9Q': this.state.diferenciaData['9Q'],
        '2X': this.state.diferenciaData['2X'],
      };

      const cuentasMayor = {
        '2342G': this.state.diferenciaDataTotals['2342G'],
        '234K4': this.state.diferenciaDataTotals['234K4'],
        '234K7': this.state.diferenciaDataTotals['234K7'],
        '2342A': this.state.diferenciaDataTotals['2342A'],
      };

      const result = await generateFile(cuentasContables, cuentasMayor, this.state.metadata[0]);
      if (result) {
        this.setState({ downloadFile: true, fileName: result.name });
      }
    }
    // Generate File Ajuste Operacion Bimestral
    if (
      this.state.metadata[0].proceso === 'cuotasIMSS' &&
      this.state.metadata[0].tipo === 'Operacion' &&
      this.state.metadata[0].modo === 'Ajuste' &&
      (this.state.metadata[0].mes % 2) === 0
    ) {
      const cuentasContables = {
        91: this.state.diferenciaDataTotals[91],
        '9G': this.state.diferenciaDataTotals['9G'],
        92: this.state.diferenciaData[92],
        '9I': this.state.diferenciaData['9I'],
        93: this.state.diferenciaData['93'],
        94: this.state.diferenciaData['94'],
        95: this.state.diferenciaData['95'],
        '9E': this.state.diferenciaData['9E'],
        '9O': this.state.diferenciaData['9O'],
      };

      const cuentasMayor = {
        '2342G': this.state.diferenciaDataTotals['2342G'],
        '234K1': this.state.diferenciaDataTotals['234K1'],
        '234K7': this.state.diferenciaDataTotals['234K7'],
      };

      const result = await generateFile(cuentasContables, cuentasMayor, this.state.metadata[0]);
      if (result) {
        this.setState({ downloadFile: true, fileName: result.name });
      }
    }
  }

  async saveResumenClickHandler() {
    const { resumen_id } = this.state.metadata[0];
    const inputData = this.state.inputNumberData;
    const { modo } = this.state.metadata[0];
    console.log('save is getting clicked!!!');
    await savePasivoResumen(inputData, resumen_id, modo);
  }

  render() {
    if (this.state.loading === true) {
      return <div>Loading data....</div>;
    }
    if (this.props.match.params.mode !== 'editar' && this.props.match.params.mode !== 'ver') {
      return (
        <div>Here should be the 404 Not Found component</div>
      );
    }
    else if (this.state.metadata.length === 0) {
      return (
        <div>El pasivo especificado no existe</div>
      );
    }

    if (this.state.downloadFile === true) {
      this.setState({ downloadFile: false });
      window.open(`${process.env.REACT_APP_API_URL || ''}/api/generatetxt?archivo=${this.state.fileName}`);
    }
    return (
      <PasivoEntry
        metadata={this.state.metadata[0]}
        mode={this.props.match.params.mode}
        provisionShouldBeDisabled={this.state.provisionShouldBeDisabled}
        liquidacionShouldBeDisabled={this.state.liquidacionShouldBeDisabled}
        diferenciaShouldBeDisabled={this.state.diferenciaShouldBeDisabled}
        inputData={this.state.inputData}
        inputDataTotals={this.state.inputDataTotals}
        provisionData={this.state.provisionData}
        provisionDataTotals={this.state.provisionDataTotals}
        diferenciaData={this.state.diferenciaData}
        diferenciaDataTotals={this.state.diferenciaDataTotals}
        inputHandleChange={this.inputHandleChange}
        inputHandleBlur={this.inputHandleBlur}
        generateFile={this.generateFile}
        saveResumenClickHandler={this.saveResumenClickHandler}
      />
    );
  }
}

export default PasivoEntryContainer;
