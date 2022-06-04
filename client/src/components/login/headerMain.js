import React from "react";
import './style_header.css';
import timetable from "./img/timetable.png"
import medal from "./img/time.png"
import { useAuth0 } from '@auth0/auth0-react';

export default function HeaderMain() {
    const { loginWithRedirect } = useAuth0();
    return(
        <div>
            <header>
                <div className="wrap">
                    <img src={medal} alt="" class="header-img"/>
                    <element class="ml-8">
                        <br></br>
                        <h1 style={{paddingLeft: 3.2 + 'em', paddingRight: 2 + 'em'}}>CalendApp <span>Helper</span></h1>
                        <p style={{paddingLeft: 8 + 'em', paddingRight: 27 + 'em'}}>Con esta aplicación podrás ayudar a llevar registro de tus actividades y hacer registro de la completitud de cada una. </p>
                        <br></br>
                        <br></br>
                        <element class="buttons-wrapper"  style={{paddingLeft: 8 + 'em'}}>
                            <a href="" class="button" onClick={() => loginWithRedirect({redirectUri:'http://localhost:3000/main'})}>Pruebalo ahora!</a>
                        </element>
                    </element>
                </div>
            </header>

            <div className="spanning">
            <div className="promo clearfix"style={{paddingLeft: 3+ 'em', paddingRight: 3 + 'em'}}>
                <div className="wrap" >
                    <div className="promo-wrapper clearfix" >
                        <div className="promo-column">
                            <img src="https://tympanus.net/Freebies/WalkRideTemplate/upload/saturn.png" height="32" width="24" alt=""/>
                            <h5>Actividades</h5>
                            <p>Registra tus actividades con hora, nombre, descripcion, importancia, para llevar un registro.</p>
                        </div>
                        <div class="promo-column">
                            <img src="https://tympanus.net/Freebies/WalkRideTemplate/upload/easy.png" height="32" width="33" alt=""/>
                            <h5>Desarrollo</h5>
                            <p>Una vez finalizada cada actividad, tendras la oportunidad de completar tu desarrollo de esta. </p>
                        </div>
                        <div class="promo-column">
                            <img src="https://tympanus.net/Freebies/WalkRideTemplate/upload/settings.png" height="32" width="33" alt=""/>
                            <h5>Estadísticas</h5>
                            <p>Podrás ver estadísticas del desarrollo de las diferentes actividades planeadas en tu catálogo. </p>
                        </div>
                        <div class="promo-column">
                            <img src="https://tympanus.net/Freebies/WalkRideTemplate/upload/pin.png" height="32" width="33" alt=""/>
                            <h5>Análisis</h5>
                            <p>Podrás analizar tu manejo del tiempo, perfeccionarlo y poder desarrollar todo lo que deseas. </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="discover clearfix">
                <div className="wrap">
                    <div className="discover-content clearfix">
                        <h2>Maneja tu tiempo</h2>
                        <p style={{paddingRight: 4+ 'em'}}>El manejo del tiempo es muy importante, especialmente para los estudiantes. Reconociendo como cada uno maneja su tiempo, se tiene un autoconocimiento para saber el proceso propio.</p>
                    </div>
                    <div className="discover-img" style={{paddingLeft: 10+ 'em'}}>
                        <div className="discover-img-inside"><img src="https://tympanus.net/Freebies/WalkRideTemplate/upload/discover.png" height="486" width="634" alt=""/></div>
                    </div>
                </div>
            </div>

            </div>

            <footer>
                <div className="wrap">
                <p>© 2022 <strong>CalendApp</strong>, Alejandra Pabón &amp; Sara Acosta</p>
                </div>
       
            </footer>
        </div>
    )
    
}