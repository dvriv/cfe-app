export async function generateFileCuotasIMSS(cuentasContables, cuentasMayor) {
  console.log(cuentasContables, cuentasMayor);
  const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/generatetxt`, {
    method: 'POST',
    body: JSON.stringify({
      cuentasContables,
      cuentasMayor,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  return response;
}

export async function generateFilePasivoLaboral(cuentas) {
  console.log(cuentas);
  const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/generatetxt`, {
    method: 'POST',
    body: JSON.stringify({
      cuentas,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  return response;
}

export async function generateFile(cuentasContables, cuentasMayor, metadata) {
  const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/generatetxt`, {
    method: 'POST',
    body: JSON.stringify({
      cuentasContables,
      cuentasMayor,
      metadata,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}
