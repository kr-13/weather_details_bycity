public with sharing class Getville {
    @AuraEnabled(cacheable=true)
    public static List<String> getvilles() {

        //to avoid the  duplication in the data we used set 
           Set<String> villes = new Set<String>();
           List<String> villes2=new List<String>();
           List<Account> accounts=[SELECT BillingCity FROM Account WHERE BillingCity != null];
           for(Account account : accounts) {
               villes.add(account.BillingCity);
           }
   
           //conversion to list so i can return the list of cities
           for(String v: villes){
                 villes2.add(v);
   
           }

           //test to see the cities in console
            System.debug(villes2);
         
           return villes2;  
       }
}