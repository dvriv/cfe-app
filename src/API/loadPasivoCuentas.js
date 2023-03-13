export default async function loadPasivoResumen(resumen_id) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/resumenconcepto?resumen_id=${resumen_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'text/html; charset=UTF-8',
      },
    });
    const result = await response.json();
    console.log('this is the response', result);
    return result;
  }
  catch (err) {
    console.log('error on getPasivoByID', err);
    return false;
  }
}
