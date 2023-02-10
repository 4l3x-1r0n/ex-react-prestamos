import { useState, useEffect } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import {
    formatearDinero,
    calcularTotalPagar,
} from "./helpers"; /* no hay que indicar el index.js porque el lo busca por default */

function App() {
    const [cantidad, setCantidad] = useState(10000);
    const [meses, setMeses] = useState(6);
    const [total, setTotal] = useState(0);
    const [pago, setPago] = useState(0);
    //useState es una funcion que toma como argumento un valor inicial y devuelve un array con dos posiciones, en este caso lo que estamos haciendo es un destructuring al resultado de la funcion, guardando en la primera variable el valor por defecto que le pasamos a la funcion useState y la segunda variable es la funcion que nos permite modificar el valor de la primera variable(el state)  ya que por reglas de react este no se puede modificar directamente, tiene que ser a travez de una funcion, cuando se modifique el state(la primera variable que declaramos), se volvera a renderizar el componente(se ejecuta automaticamente este codigo)

    useEffect(() => {
        setTotal(calcularTotalPagar(cantidad, meses));
    }, [cantidad, meses]);

    useEffect(() => {
        setPago(total / meses);
    }, [total]);

    const MIN = 0;
    const MAX = 20000;
    const STEP = 100;

    function handleChanche(e) {
        setCantidad(+e.target.value);
    }

    function handleClickDecremento() {
        const valor = cantidad - STEP;
        if (valor < MIN) return;
        setCantidad(valor);
    }

    function handleClickIncremento() {
        const valor = cantidad + STEP;
        if (valor > MAX) return;
        setCantidad(valor);
    }

    return (
        <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
            <Header />

            <div className="flex justify-between my-6">
                <Button operador="-" handleClick={handleClickDecremento} />
                <Button operador="+" handleClick={handleClickIncremento} />
            </div>
            <input
                type="range"
                className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600 "
                onChange={handleChanche}
                min={`${MIN}`}
                max={`${MAX}`}
                step={`${STEP}`}
                value={cantidad}
            />
            <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
                {formatearDinero(cantidad)}
            </p>

            <h2 className="text-2xl font-extrabold text-gray-500 text-center">
                Elige un <span className="text-indigo-600">Plazo</span> a Pagar
            </h2>
            <select
                className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
                value={meses}
                onChange={(e) => setMeses(e.target.value)}
            >
                <option value="6">6 Meses</option>
                <option value="12">12 Meses</option>
                <option value="24">24 Meses</option>
            </select>

            <div className="my-5 space-y-3 bg-gray-50 p-5">
                <h2 className="text-2xl font-extrabold text-gray-500 text-center">
                    Resumen <span className="text-indigo-600">de pagos</span>
                </h2>
                <p className="text-xl text-gray-500 text-center font-bold">
                    {meses} Meses
                </p>
                <p className="text-xl text-gray-500 text-center font-bold">
                    {formatearDinero(total)} Total a Pagar
                </p>
                <p className="text-xl text-gray-500 text-center font-bold">
                    {formatearDinero(pago)} Mensuales
                </p>
            </div>
        </div>
    );
}

export default App;
