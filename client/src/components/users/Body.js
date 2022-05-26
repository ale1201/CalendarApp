import silver from "../../images/silverMedal.png";
import bronce from "../../images/bronzeMedal.png";
import gold from "../../images/goldMedal.png";
import React , { useContext, useState, useEffect }from 'react';


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

    var points = 50;
    var image = '';
    var medal = ''

    if (point <= 10){
        image = bronce
        medal = 'Bronce'
    } else if (point > 10 && point <= 30){
        image = silver
        medal = 'Plata'
    }
    else {
        image = gold
        medal = 'Oro'
    }

    

    return (
    <aside className="m-5 border rounded align-right p-10 background-blue" style={{background: '#D893F3',}}> 
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', fontSize: 27, fontWeight: 'bold'}}>
    <h1> Tu medalla actual </h1>
</div>
        <img src={image} alt='gold' width={300}/> 

        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', fontSize: 25,}}>
    <h1> {medal} </h1>
</div>
<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', fontSize: 22,}}>
    <h1> Puntos: {point}</h1>
</div>
    </aside>

    
    );
}
