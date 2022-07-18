import React, { useState, useEffect }from 'react';
//import { colors } from 'react-select/dist/declarations/src/theme';
import * as d3 from 'd3';
import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";


export default function GraphWeek(props) { 

    const [graph, setGraph] = useState([]);

    var tiposEstados = ["end_on_time", "end_before_time", "end_after_time", "started_not_finalized", "not_started"]
    let listaPorTipo = [];
    useEffect(() => {
      let datos = props.actividades
      if( (props.prioridad === "all") && (props.categoria !== "all")){
        datos = props.actividades.filter((el) => (el.label === props.categoria) );
      }
      else if ((props.prioridad !== "all") && (props.categoria === "all")){
        datos = props.actividades.filter((el) => (el.priority === props.prioridad));
      }
      else if ((props.prioridad !== "all") && (props.categoria !== "all")){
        datos = props.actividades.filter((el) => (el.priority === props.prioridad) && (el.label === props.categoria));
      }
        tiposEstados.forEach((actual) => {
          listaPorTipo.push({ estado: actual, contador: 0 });
        });
        
        datos.forEach((actual) => {
          for (let i = 0; i < listaPorTipo.length; i++) {
            let tipoActual = listaPorTipo[i].estado;
            if (tipoActual === actual.estado) {

              listaPorTipo[i].contador += 1;
            }
          }
        });
    
        let nuevaLista = [];
        for (let i = 0; i < listaPorTipo.length; i++) {
          if (listaPorTipo[i].contador !== 0) {
            listaPorTipo[i].contador =
              (listaPorTipo[i].contador / datos.length) * 100;
            nuevaLista.push(listaPorTipo[i]);

          }
        }
        pieChart(nuevaLista);
        setGraph(nuevaLista);
      }, [props.actividades, listaPorTipo]);

    var traduccion = 
        {
        "end_on_time": "Finalizada a tiempo",
        "end_before_time": "Finalizada antes de tiempo",
        "end_after_time": "Finalizada después de tiempo",
        "started_not_finalized": "Se empezó pero no se finalizó",
        "not_started": "No se empezó",
        }


    function pieChart(data) {
        d3.select("#canvasOtro").select("svg").remove();
    
        const width = 900;
        const height = 400;
        const margin = 0;
        var radius = Math.min(width, height) / 2 - margin;
    
        const canvas = d3.select("#canvasOtro");
    
        const svg = canvas
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
        const colorScale = d3
          .scaleSequential()
          .interpolator(d3.interpolateCool)
          .domain([0, data.length]);
    
        const arcGenerator = d3.arc().innerRadius(100).outerRadius(radius);
        const pieGenerator = d3
          .pie()
          .padAngle(0)
          .value((d) => d.contador);
    
        var dataReady = pieGenerator(data);
    
        let arc = svg.selectAll().data(pieGenerator(data)).enter();
    
        arc
          .append("path")
          .attr("d", arcGenerator)
          .style("fill", (_, i) => colorScale(i))
          .style("stroke", "#ffffff")
          .style("stroke-width", 4);
    
        svg
          .selectAll()
          .data(dataReady)
          .enter()
          .append("text")
          .text(function (d) {
            return Math.round(d.data.contador) + "%";
          })
          .attr("transform", function (d) {
            return "translate(" + arcGenerator.centroid(d) + ")";
          })
          .style("text-anchor", "middle")
          .style("font-size", 18);
    
        arc = d3
          .arc()
          .innerRadius(radius * 0.5)
          .outerRadius(radius * 0.8);
    
        const outerArc = d3
          .arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius * 0.9);
    
        svg
          .selectAll("allPolylines")
          .data(dataReady)
          .enter()
          .append("polyline")
          .attr("stroke", "gray")
          .style("fill", "none")
          .attr("stroke-width", 1)
          .attr("points", function (d) {
            var posA = arc.centroid(d);
            var posB = outerArc.centroid(d);
            var posC = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
            return [posA, posB, posC];
          });
    
        svg
          .selectAll("allLabels")
          .data(dataReady)
          .enter()
          .append("text")
          .text(function (d) {
            return traduccion[d.data.estado];
          })
          .attr("transform", function (d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return "translate(" + pos + ")";
          })
          .style("text-anchor", function (d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return midangle < Math.PI ? "start" : "end";
          });
      }
    

    if (graph.length === 0) {
        console.log(graph)
        return(
            <div className="m-5 flex-1">
                <h1>Aun no hay registros de actividades finalizadas con estas características, registra la finalización de tus actividades para ver tus estadísticas</h1>
            </div>
        );
    }
    else{
        console.log(graph)
    return (

      
        <Card {...props} sx={{ width: 900, marginTop: 5 }}>
      <CardHeader
        title={
          "Estadísticas últimos 7 días"
        }
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "center",
          }}
        >
          <div id="canvasOtro"> </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 5,
          }}
        ></Box>
      </CardContent>
    </Card>
    );
    }
}