import { LightningElement, wire } from 'lwc';
import getvilles from '@salesforce/apex/Weather.getvilles';
import { publish, MessageContext } from 'lightning/messageService';
import COUNT_UPDATED_CHANNEL from '@salesforce/messageChannel/Count_Updated__c';
 
export default class pickListville extends LightningElement {
    selectedCity= '';
    cityoptions;
    

   @wire(getvilles)
   wiredGetVille({ error, data }) {
       if (data) {
          
           this.cityoptions = data.map(city => {
               return { label: city, value: city }; });

                     //only to test this is not in the code as i had errors
                      //this.cities=data.map(city => {
                       //return { label: city, value: city }; });
                      //finished test

               console.log('selected are : ',data);


            } else if (error) {
                console.error(error);
            }
   
           }   
           
 
    handleChange(event) {
        this.selectedCity = event.detail.value;
        const payload = { cityName: this.selectedCity };
        publish(this.messageContext, COUNT_UPDATED_CHANNEL, payload);
        const selectEvent = new CustomEvent('cityselected', { detail: this.selectedCity });
        this.dispatchEvent(selectEvent);
    }
 
    @wire(MessageContext)
    messageContext;
}