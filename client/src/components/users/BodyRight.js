import React, { useState, useEffect }from 'react';
import Pie from "./pie.js"
import GraphWeek from "./graphWeek.js"
import dayjs from "dayjs";


export default function BodyRight() { 

    const [actividades, setActividades] = useState([]);
    const [actSemana, setActSemana] = useState([])

    const [prioridad, setPrioridad] = useState("all");
    const [categoria, setCategoria] = useState("all");
    const [tiempo, setTiempo] = useState("all");

    var hoy = new Date(dayjs());
    var newday = hoy.setHours(0,0,0,0);

    useEffect(() => {
        fetch("http://localhost:5000/api/usuario/" + localStorage.getItem('user_id') + "/actividades")
          .then((response) => response.json())
          .then((data) => {
            setActividades(
              data.filter((el) => (el.estado !== null))
            );
            setActSemana(
                 data.filter((el) => (el.estado !== null)&&(newday.valueOf()-el.day) <= 604800000 ),
             )
          });
      }, []);
    if (actividades.length !== 0){
        return (
            <div className="m-5 flex-1">
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', fontSize: 27, fontWeight: 'bold'}}>
                    <h1> El manejo del tiempo es vital </h1>
                </div>
                <br></br>
                <h4> Entre mas puntos acumules, los cuales obtendrás a medida que completes el informe de tus actividades,
                    obtendrás un mayor rango. </h4>
                <br>
                </br>
                <div className='row'>
                    <div className="col">
                        <div className='row'>
                            <p>Prioridad:</p>
                        </div>
                        <div className='row'>
                            <select onChange={(e) => setPrioridad(e.target.value)} value={prioridad}>
                            <option value="alta">Alta</option>
                            <option value="media">Media</option>
                            <option value="baja">Baja</option>
                            <option value="all">Todas</option>
                            </select>
                        </div>
                    </div>

                    <div className="col">
                        <div className='row'>
                            <p>Categoria:</p>
                        </div>
                        <div className='row'>
                            <select onChange={(e) => setCategoria(e.target.value)} value={categoria}>
                            <option value="indigo">Examen</option>
                            <option value="gray">Ejercicio</option>
                            <option value="green">Proyecto</option>
                            <option value="blue">Amigos</option>
                            <option value="red">Reunión Academica</option>
                            <option value="purple">Trabajo</option>
                            <option value="all">Todas</option>
                            </select>
                        </div>
                    </div>

                    <div className="col">
                        <div className='row'>
                            <p>Tiempo:</p>
                        </div>
                        <div className='row'>
                            <select onChange={(e) => setTiempo(e.target.value)} value={tiempo}>
                            <option value="all">General</option>
                            <option value="week">Últimos 7 días</option>
                            </select>
                        </div>
                    </div>



                </div>

                <br></br>

                {tiempo === "all" && <Pie actividades={actividades} prioridad={prioridad} categoria={categoria}/>}
                {tiempo === "week" && <GraphWeek actividades={actSemana} prioridad={prioridad} categoria={categoria}/>}

           </div>
        );
    }
    else{
    
    
    return (
        <div className="m-5 flex-1">
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', fontSize: 27, fontWeight: 'bold'}}>
                <h1> El manejo del tiempo es vital </h1>
            </div>
            <br></br>
            <h4> Entre mas puntos acumules, los cuales obtendrás a medida que completes el informe de tus actividades,
                obtendrás un mayor rango. </h4>
            <br>
            </br>
            <br>
            </br>
            <div className="m-5 flex-1">
                <h1>Registra la completitud de tus actividades para ver tus estadisticas</h1>
            </div>

       </div>
    );
    }
}

