import axios from 'axios';

let url= "https://covid19.mathdro.id/api";

const fetchData= async (country)=>{
    let changeableUrl = url;
    if (country) {
        changeableUrl = `${url}/countries/${country}`;
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
        return { confirmed, recovered, deaths, lastUpdate };

    } catch (error) {
        return error;
    }
    };


export default fetchData;

