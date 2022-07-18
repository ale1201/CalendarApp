import uno from "../../images/1.png";
import dos from "../../images/2.png";
import tres from "../../images/3.png";
import cuatro from "../../images/4.png";
import cinco from "../../images/5.png";
import seis from "../../images/6.png";
import siete from "../../images/7.png";
import ocho from "../../images/8.png";
import React , { useState, useEffect }from 'react';


export default function BodyLeft() { 

    const [point, setPoint] = useState();

    useEffect(() => {
        fetch("http://localhost:5000/api/usuario/" + localStorage.getItem('user_id') )
          .then((response) => response.json())
          .then((data) => {
            
            setPoint(
              data.puntos
            );
          });
      }, []);

    var image = '';
    var medal = ''

    if (point <= 6){
        image = ocho
        medal = 'Nivel 1'
    } else if (point > 6 && point <= 14){
        image = siete
        medal = 'Nivel 2'
    }
     else if (point > 14 && point <= 21){
    image = seis
    medal = 'Nivel 3'
    }
    else if (point > 21 && point <= 28){
        image = cinco
        medal = 'Nivel 4'
        }
    else if (point > 28 && point <= 35){
            image = cuatro
            medal = 'Nivel 5'
        }
    else if (point > 35 && point <= 42){
            image = tres
            medal = 'Nivel 6'
        }

    else if (point > 42 && point <= 48){
            image = dos
            medal = 'Nivel 7'
        }

    else {
        image = uno
        medal = 'Nivel 8'
    }

    

    return (
    <aside className="m-5 border rounded align-right p-10 background-blue" style={{background: '#D893F3',}}> 
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', fontSize: 27, fontWeight: 'bold'}}>
    <h1> ¡Descubre la imagen completa!</h1>
        </div>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', fontSize: 25}}>
    <h3> Sigue registrando estados </h3>
    <br></br>
        <br></br>
    </div>
        <img src={image} alt='gold' width={300}/> 

        <br></br>
        <br></br>

        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', fontSize: 25,}}>
    <h1> {medal} </h1>
</div>
<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', fontSize: 22,}}>
    <h1> Puntos: {point}</h1>
</div>
    </aside>

    
    );
}
