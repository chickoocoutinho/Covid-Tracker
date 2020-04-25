import React, {useState, useEffect} from 'react';
import { Line, Bar } from 'react-chartjs-2';
import styles from './charts.module.css';
import axios from 'axios';

const Charts = ( {data:{confirmed, recovered, deaths}, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(()=>{
        axios.get('https://covid19.mathdro.id/api/daily')
        .then((response)=>{
            console.log(response)
            setDailyData(response.data);
        })
        .catch((error)=> console.log(error) );
    }, []);

    const lineChart = (
        dailyData.length ?
        (<Line 
            data={{
                labels: dailyData.map(({ reportDate })=> reportDate),
                datasets: [{
                    data: dailyData.map(({confirmed})=> confirmed.total),
                    label: "Infected",
                    borderColor: "#3333ff",
                    fill: true
                },
                {
                    data: dailyData.map(({deaths})=> deaths.total),
                    label: "Deaths",
                    borderColor: "red",
                    backgroundColor: "rgba(255,0,0,0.5)",
                    fill: true
                }],
                
            }}
        />): null
    );
    
    const barChart = (
        confirmed ?(
            <Bar 
                data={{
                    labels:['Infected', 'Recovered' , 'Deaths'],
                    datasets:[{
                        label:'People',
                        backgroundColor:[
                            'rgba(0,0,255,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)',
                        ],
                        data:[confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legends: false,
                    title: {display:true, text: `Current State in ${country}`}
                }}
            />
        ):null
    );


    return (
        <div className= {styles.container}>
            {country? barChart: lineChart}
        </div>
    );
}

export default Charts;