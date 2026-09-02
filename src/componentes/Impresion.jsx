import React from 'react';
import { DIAS, iso, fechaCorta } from '../utiles';
import { describirPorciones } from '../datos/pauta';

/* ---------------- póster semanal para pegar en el refrigerador ---------------- */
function PosterSemana({ fechas, plan, porId, tipos, objetivo, titulo, pie }) {
  return (
    <div className="hoja-impresa hoja-horizontal">
      <header className="impresion-cabecera">
        <div>
          <h1>Mi minuta familiar</h1>
          <p>{titulo}</p>
        </div>
        <div className="impresion-rango">
          {fechaCorta(fechas[0])} al {fechaCorta(fechas[6])} de {fechas[6].getFullYear()}
        </div>
      </header>

      <table className="tabla-semana">
        <thead>
          <tr>
            <th className="col-tiempo"> </th>
            {fechas.map((f, i) => (
              <th key={iso(f)}>
                <span className="dia-nombre">{DIAS[i]}</span>
                <span className="dia-fecha">{f.getDate()}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tipos.map((t) => (
            <tr key={t.k}>
              <th className="col-tiempo">
                <span className="tiempo-nombre">{t.corto}</span>
                {objetivo?.(t.k) && <span className="tiempo-meta">{objetivo(t.k)}</span>}
              </th>
              {fechas.map((f) => {
                const r = porId[plan[iso(f)]?.[t.k]?.id];
                return (
                  <td key={iso(f) + t.k}>
                    {r ? (
                      <>
                        <span className="plato">{r.n}</span>
                        {r.leg === 'oculta' && <span className="marca-legumbre">legumbre</span>}
                      </>
                    ) : <span className="vacio-celda">—</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="impresion-pie">
        <span><strong>Sin lactosa</strong> · <strong>Sin maní</strong></span>
        <span>{pie}</span>
        <span>La marca «legumbre» indica preparación con legumbre camuflada</span>
      </footer>
    </div>
  );
}

/* ------------------------- ficha individual de receta ------------------------- */
function FichaReceta({ receta, etiqueta }) {
  return (
    <div className="hoja-impresa">
      <header className="impresion-cabecera">
        <div>
          <h1>{receta.n}</h1>
          <p>{etiqueta}{receta.origen ? ` · ${receta.origen}` : ''}</p>
        </div>
        <div className="impresion-rango">{receta.min} min</div>
      </header>

      <div className="ficha-meta">
        <span>Sin lactosa</span>
        <span>Sin maní</span>
        {receta.leg === 'oculta' && <span>Legumbre camuflada</span>}
        {receta.p && <span>{describirPorciones(receta.p)}</span>}
      </div>

      {receta.al?.length > 0 && (
        <p className="ficha-alerta">
          Contiene {receta.al.join(', ')}. No es para el plato de la hija.
        </p>
      )}

      <div className="ficha-columnas">
        <section>
          <h2>Ingredientes</h2>
          <ul>{receta.ing.map((x, i) => <li key={i}>{x}</li>)}</ul>
          <p className="ficha-nota-porcion">
            Cantidades por adulto. Para los tres, multiplica por dos y sirve a la hija cerca de un
            tercio del plato adulto.
          </p>
        </section>

        <section>
          <h2>Preparación</h2>
          <ol>{receta.pasos.map((x, i) => <li key={i}>{x}</li>)}</ol>
        </section>
      </div>

      <div className="ficha-truco">
        <strong>Truco</strong>
        <span>{receta.truco}</span>
      </div>
    </div>
  );
}

/* ------------------- lista de compras para llevar al súper ------------------- */
// El orden sigue la guía de la nutricionista: primero lo no perecible y al final
// lo refrigerado, para no cortar la cadena de frío.
const RECORRIDO = [
  'Despensa',
  'Panadería',
  'Verduras y frutas',
  'Refrigerados y bebidas vegetales',
  'Carnes, pescados y huevos',
];

// Las columnas CSS no se comportan igual en todos los motores de impresión, así
// que el reparto en dos columnas se hace acá, balanceando por cantidad de líneas.
function repartir(cats, porCategoria) {
  const alto = (c) => porCategoria[c].length + 2; // el título ocupa un par de líneas
  const totalAlto = cats.reduce((n, c) => n + alto(c), 0);
  const izquierda = [], derecha = [];
  let acumulado = 0;
  for (const c of cats) {
    if (acumulado + alto(c) / 2 <= totalAlto / 2) izquierda.push(c);
    else derecha.push(c);
    acumulado += alto(c);
  }
  return [izquierda, derecha];
}

function ListaCompras({ porCategoria, titulo, rango, raciones }) {
  const cats = [
    ...RECORRIDO.filter((c) => porCategoria[c]?.length),
    ...Object.keys(porCategoria).filter((c) => !RECORRIDO.includes(c)),
  ];
  const total = cats.reduce((n, c) => n + porCategoria[c].length, 0);
  const [izquierda, derecha] = repartir(cats, porCategoria);

  const columna = (lista) => (
    <div className="compras-columna">
      {lista.map((cat) => (
        <section key={cat} className="compras-grupo">
          <h2>{cat}</h2>
          <ul>
            {porCategoria[cat].map((it) => (
              <li key={it.clave}>
                <span className="casilla-papel" />
                <span className="compra-nombre">{it.nombre}</span>
                <span className="compra-cantidad">{it.cantidad || 'a gusto'}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );

  return (
    <div className="hoja-impresa">
      <header className="impresion-cabecera">
        <div>
          <h1>Lista de compras</h1>
          <p>{titulo} · {total} productos · cantidades para {raciones}</p>
        </div>
        <div className="impresion-rango">{rango}</div>
      </header>

      <div className="compras-columnas">
        {columna(izquierda)}
        {columna(derecha)}
      </div>

      <footer className="impresion-pie">
        <span>Recorrido: primero lo no perecible, al final lo refrigerado y congelado</span>
        <span>Revisa siempre el etiquetado buscando <strong>maní</strong></span>
      </footer>
    </div>
  );
}

export default function Impresion(props) {
  return (
    <div className="impresion">
      {props.modo === 'semana' && <PosterSemana {...props} />}
      {props.modo === 'receta' && <FichaReceta {...props} />}
      {props.modo === 'compras' && <ListaCompras {...props} />}
    </div>
  );
}
