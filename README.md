# the-medicine-task

## Prerequisities
* `browserify`
* A `MongoDB` instance listening on port `27017`.
* Note that this has been developed and tested on `Node.js 5.0`.

## Starting the server
From the main folder, run `npm start`. This will invoke the following commands:

```
mkdir -p client/dist
browserify -o client/dist/app.js -e client/js/app.js
node .
```
