import React, { useState } from 'react';
import { LogIn, Home, Users } from 'lucide-react';
import { Boton } from './Comunes';

export function Entrar({ onEntrar }) {
  const [error, setError] = useState(null);

  const intentar = async () => {
    setError(null);
    try { await onEntrar(); }
    catch (e) {
      setError(e?.code === 'auth/popup-blocked'
        ? 'El navegador bloqueó la ventana de Google. Permite las ventanas emergentes para este sitio y vuelve a intentar.'
        : 'No se pudo iniciar sesión. Revisa tu conexión y vuelve a intentar.');
    }
  };

  return (
    <div className="centro-pantalla">
      <div className="acceso">
        <h2>Mi Mesa</h2>
        <p className="parrafo">
          El plan de comidas de la familia, con el registro de lo que realmente se preparó.
          Inicia sesión para que el plan quede sincronizado entre los teléfonos de la casa.
        </p>
        {error && <div className="alerta alerta-error">{error}</div>}
        <Boton bloque onClick={intentar}><LogIn size={16} />Entrar con Google</Boton>
      </div>
    </div>
  );
}

export function ElegirHogar({ onCrear, onUnirse, onSalir }) {
  const [modo, setModo] = useState(null);
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState(null);
  const [ocupado, setOcupado] = useState(false);

  const ejecutar = async (fn, valor) => {
    setError(null); setOcupado(true);
    try { await fn(valor); }
    catch (e) { setError(e.message || 'No se pudo completar la operación.'); }
    setOcupado(false);
  };

  return (
    <div className="centro-pantalla">
      <div className="acceso">
        <h2>Configura tu hogar</h2>
        <p className="parrafo">
          El hogar es el espacio compartido de la familia. Créalo una vez y comparte el código
          con tu pareja para que ambos vean el mismo plan.
        </p>
        {error && <div className="alerta alerta-error">{error}</div>}

        {modo === null && (
          <>
            <Boton bloque onClick={() => setModo('crear')}><Home size={16} />Crear un hogar nuevo</Boton>
            <div className="espacio" />
            <Boton bloque variante="secundario" onClick={() => setModo('unirse')}>
              <Users size={16} />Unirme con un código
            </Boton>
          </>
        )}

        {modo === 'crear' && (
          <>
            <label className="dato" htmlFor="nombre-hogar">Nombre del hogar</label>
            <div style={{ height: 6 }} />
            <input id="nombre-hogar" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Familia González" />
            <div className="espacio" />
            <div className="fila">
              <Boton variante="secundario" onClick={() => setModo(null)}>Volver</Boton>
              <Boton disabled={ocupado} onClick={() => ejecutar(onCrear, nombre)}>
                {ocupado ? 'Creando…' : 'Crear hogar'}
              </Boton>
            </div>
          </>
        )}

        {modo === 'unirse' && (
          <>
            <label className="dato" htmlFor="codigo-hogar">Código del hogar</label>
            <div style={{ height: 6 }} />
            <input id="codigo-hogar" value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Pégalo aquí" />
            <div className="espacio" />
            <div className="fila">
              <Boton variante="secundario" onClick={() => setModo(null)}>Volver</Boton>
              <Boton disabled={ocupado} onClick={() => ejecutar(onUnirse, codigo)}>
                {ocupado ? 'Uniendo…' : 'Unirme'}
              </Boton>
            </div>
          </>
        )}

        <div className="espacio" />
        <Boton variante="plano" bloque chico onClick={onSalir}>Cerrar sesión</Boton>
      </div>
    </div>
  );
}
