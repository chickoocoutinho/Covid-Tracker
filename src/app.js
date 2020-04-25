import React, {Component} from 'react';
import styles from './app.module.css';
import { Cards, CountryPicker, Charts} from './components';
import fetchData from './api';
import coronaImage from './images/corona-virus-image.png';
import loadingGif from './images/loading.gif';

class App extends Component {

    state={
        data: {}, 
        country: '',
        loading: false
    };

    countryChange = async (value) =>{
        this.setState({loading:true});
        const data= await fetchData(value);
        this.setState( {data, country:value ,loading:false} );               
    };

    async componentDidMount(){
        this.setState({loading:true})
        const data = await fetchData();
        this.setState({data , loading:false});
    }

    render() {
        return (
            this.state.loading?(
                <div className={styles.loading}>
                    <img src={loadingGif} alt="webpage is loading"/>
                </div>
                
            ):
            (<div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="Corona-virus" />
                <Cards data={this.state.data} />
                <CountryPicker handleCountryChange={this.countryChange} />
                <Charts data={this.state.data} country={this.state.country}/>
            </div>)
        );
    }
}

export default App;