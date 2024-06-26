
## How to install

1. Clone the atdev-challenge repository:

    ```
    git clone https://github.com/martinmessina13/atdev-challenge
    cd atdev-challenge
    ```

1. Authorize and set as default your Trailhead Playground or Developer Edition organization and provide it with an alias (atdev-challenge-org in the command below):

    ```
    sf org login web -d -a atdev-challenge --set-default
    ```

1. Install the app from the unmanaged package:

    ```
    sf package install --package "04tbm0000000B1t"
    ```

1. Assign the **Access_All_Record_Types** permission set to the default user:

    ```
    sf org assign permset -n Access_All_Record_Types
    ```

1. Create sample data (don't forget to add your credentials in scripts/js/locations_sfdc_creator.js where indicated):

    ```
    npm install jsforce
    npm start
    ```

1. Import sample data:

    ```
    sf data tree import --plan ./data/SiteLocation-plan.json
    ```

1. Open the scratch org:

    ```
    sf org open --target-org atdev-challenge
    ```

1. [Set the Page Assignment](https://help.salesforce.com/s/articleView?id=sf.layouts_assigning.htm&type=5) of the Opportunity Product Site Location Layout and the Opportunity Site Location Layout for the Opportunity Product and the Opportunity object, respectively, to the System Administrator.:

In App Launcher, click View All then select the Sales app. After that click on the Opportunities Tab, and start from there.