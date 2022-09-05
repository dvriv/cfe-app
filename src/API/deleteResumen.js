export default async function deleteResumen(resumen_id) {
  try {
    const response = await fetch(`/api/deleteResumen?resumen_id=${resumen_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'text/html; charset=UTF-8',
      },
    });
    return response;
  }
  catch (err) {
    console.log('error on getPasivoByID', err);
    return false;
  }
}