import qs from 'qs';

export async function getPasivoBy(proceso, tipo, modo, mes, año) {
  const request = {
    proceso,
    tipo,
    modo,
    mes,
    año,
  };

  const queryString = qs.stringify(request);
  console.log(`/api/pasivos?${queryString}`);

  try {
    const response = await fetch(`/api/pasivos?${queryString}`, {
      method: 'GET',
      headers: {
        'content-type': 'text/html; charset=UTF-8',
      },
    });
    return response.json();
  }
  catch (err) {
    console.log('error on getPasivo', err);
    return false;
  }
}

export async function getPasivoById(id) {
  try {
    const response = await fetch(`/api/pasivos?id=${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'text/html; charset=UTF-8',
      },
    });
    return response.json();
  }
  catch (err) {
    console.log('error on getPasivoByID', err);
    return false;
  }
}
