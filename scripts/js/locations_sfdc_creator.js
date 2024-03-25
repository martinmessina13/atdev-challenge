// Importing data
const data = require('../../data/locations_sfdc.json');
const fs = require('fs');
const jsforce = require('jsforce');

// jsforce Connection object
const conn = new jsforce.Connection();

// Set object name as a constant
const OBJECT_NAME = 'SiteLocation__c';

conn.login('username', 'password+token', (error, result) => {
    if(error){
        return console.error(error);
    }
    // Query the RecordType object
    conn.query('SELECT ID, Name, DeveloperName, SobjectType FROM RecordType', (error, result) => {
        if(error){
            return console.error(error);
        }
        const recordTypes = result.records;
        createSiteLocationData(recordTypes);
    })
});

function createSiteLocationData(recordTypes){
    // Modify the array from locations_sfdc.json file to meet Salesforce import criteria
    const modifiedDataArray = data.map((location, index) => (
        {
            attributes: {
                type: OBJECT_NAME,
                referenceId: OBJECT_NAME.slice(0, -3) + (index + 1)
            },
            POP__C: location.pop,
            Region__c: location.region,
            Market__c: location.market,
            MarketDescription__c: location.market_description,
            Vendor__c: location.vendor,
            Site__c: location.site,
            Name: location.site,
            ExternalId__c: location.site_code,
            RecordTypeId: location.type === 'primary' ? recordTypes.find(rt => rt.DeveloperName === 'Primary').Id : recordTypes.find(rt => rt.DeveloperName === 'MetroExtension').Id,
            Status__c: location.status,
            Coordinates__latitude__s: location.latitude,
            Coordinates__longitude__s: location.longitude,
            Timezone__c: location.timezone,
            Notes__c: location.notes,
            PCode__c: location.pcode,
            LeadTime__c: location.lead_time,
            SingleArmed__c: location.single_armed,
            Address1__c: location.address1,
            Address2__c: location.address2,
            City__c: location.city,
            State__c: location.state,
            Postal__c: location.postal,
            Country__c: location.country,
            NetworkProvider__c: location.network_provider,
            NetworkProviderSiteId__c: location.network_provider_site_id,
            ExternalTimeCreated__c: location.time_created
        }
    ));
    
    const modifiedDataFirstBatch = {
        records: modifiedDataArray.slice(0, 200)
    };
    
    const modifiedDataSecondBatch = {
        records: modifiedDataArray.slice(200)
    };
    
    const modifiedData = [modifiedDataFirstBatch, modifiedDataSecondBatch];
    
    let siteLocationFiles = []
    
    for(let i = 0; i < 2; i++){
        // Convert js object to a JSON string
        let modifiedDataJsonString = JSON.stringify(modifiedData[i], null, 2) // The '2' argument adds space for readibility
        let siteLocationFile = `SiteLocation${i+1}.json`;
        siteLocationFiles.push(siteLocationFile);
        // Exporting new json file ready for import
        fs.writeFile(`./data/${siteLocationFile}`, modifiedDataJsonString, (error) => 
            {
                if(error) {
                    console.error('An error ocurred:', error);
                    return;
                }
                console.log(`The JSON file ${siteLocationFile} was successfully created.`);
            }
        )
    }
    
    // A data plan to import the records is created
    const dataPlan = [
        {
            'sobject': OBJECT_NAME,
            'saveRefs': true,
            'resolveRefs': true,
            'files': siteLocationFiles
        }
    ];
    
    let dataPlanJsonString = JSON.stringify(dataPlan, null, 2) // The '2' argument adds space for readibility
        
    // Exporting new json file ready for import
    fs.writeFile(`./data/SiteLocation-plan.json`, dataPlanJsonString, (error) => 
        {
            if(error) {
                console.error('An error ocurred:', error);
                return;
            }
            console.log('The JSON file SiteLocation-plan.json was successfully created.');
        }
    )
}