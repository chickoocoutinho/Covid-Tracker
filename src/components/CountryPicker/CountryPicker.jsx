import React, {useEffect , useState} from 'react';
import {NativeSelect , FormControl } from '@material-ui/core';
import axios from 'axios';
import styles from './CountryPicker.module.css';

const CountryPicker = ({handleCountryChange}) => {

    const [fetchedCountries, setFetchedCountries]= useState([]);
     
    useEffect(()=>{
        axios.get('https://covid19.mathdro.id/api/countries')
        .then(( { data:{countries} } )=>{
            setFetchedCountries(countries.map((country)=> country.name));
        })
        .catch((error)=>console.log(error));
    }, [setFetchedCountries]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e)=> handleCountryChange(e.target.value)} >
                <option value="">Global</option>
                {fetchedCountries.map((country,i)=> <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;