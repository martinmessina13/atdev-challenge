
## How to install

1. If you haven't already done so, authorize your hub org and provide it with an alias (**myhuborg** in the command below):

    ```
    sf org login web -d -a myhuborg
    ```

1. Clone the atdev-challenge repository:

    ```
    git clone https://github.com/martinmessina13/atdev-challenge
    cd lwc-recipes
    ```

1. Create a scratch org and provide it with an alias (**lwc-recipes** in the command below):

    ```
    sf org create scratch -d -f config/project-scratch-def.json -a lwc-recipes
    ```

1. Push the app to your scratch org. Alternatively install it from an unmanaged package clicking here:

    ```
    sf project deploy start
    ```

1. Assign the **recipes** permission set to the default user:

    ```
    sf org assign permset -n recipes
    ```

1. Run node.js script to create sample data (don't forget to add your credentials in scripts/js/locations_sfdc_creator.js where indicated):

    ```
    npm start
    ```

1. Import sample data:

    ```
    sf data tree import -plan ./data/SiteLocation-plan.json
    ```

1. Open the scratch org:

    ```
    sf org open
    ```

In App Launcher, click View All then select the Sales app. After that click on the Opportunity Tab, and start from there.