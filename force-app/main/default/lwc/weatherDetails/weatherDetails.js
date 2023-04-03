import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import COUNT_UPDATED_CHANNEL from '@salesforce/messageChannel/Count_Updated__c';
import getWeatherByCity from '@salesforce/apex/Weather.getWeatherByCity';
import gettemperature from '@salesforce/apex/Weather.gettemperature';
 
export default class weatherDetails extends LightningElement {
    cityName;
    weather;
    temp;
 
    @wire(MessageContext)
    messageContext;
 
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
 
    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            COUNT_UPDATED_CHANNEL,
            (message) => {
                this.handleMessage(message);
            }
        );
    }
 
    handleMessage(message) {
        this.cityName = message.cityName;
        this.loadWeatherData();
    }
 
    loadWeatherData() {
        getWeatherByCity({ cityName: this.cityName })
            .then((result) => {
                this.weather = result;
            })
            .catch((error) => {
                console.error(error);
            });


            gettemperature({ cityName: this.cityName })
            .then((result) => {
                this.temp = result;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}