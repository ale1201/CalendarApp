
import React, { useContext, useState, useEffect }from 'react';
import Pie from "./pie.js"
import GraphWeek from "./graphWeek.js"
import dayjs from "dayjs";


export default function BodyRight() { 

    const [actividades, setActividades] = useState([]);
    const [actSemana, setActSemana] = useState([])

    var hoy = new Date(dayjs());
    var h = hoy.getMilliseconds()
    var newday = hoy.setHours(0,0,0,0)

    console.log(h.valueOf())
    console.log(newday.valueOf())

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
                <Pie actividades={actividades}/>
                <GraphWeek actividades={actSemana}/>
    
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

