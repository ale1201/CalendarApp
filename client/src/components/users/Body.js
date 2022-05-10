import silver from "../../images/silverMedal.png";
import bronce from "../../images/bronzeMedal.png";
import gold from "../../images/goldMedal.png";
import React from 'react';


export default function BodyLeft() { 
    var points = 50;
    var image = '';
    var medal = ''

    if (points <= 10){
        image = bronce
        medal = 'Bronce'
    } else if (points > 10 && points <= 30){
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
    <h1> Puntos: {points}</h1>
</div>
    </aside>

    
    );
}
