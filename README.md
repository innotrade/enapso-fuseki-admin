# enapso-fuseki-admin

enapso Apacje Jena Fuseki Administration Toolbox for Node.js

Admin client for Apacje Jena Fusekito easily perform administrative against your RDF stores, your OWL ontologies or knowledge graphs in nodes.js applications. This client supports an easy import of existing RDF stores and ontologies to fuseki by upload via file, the creation and listing of new dataset.

Get the latest version of Apache jena Fuseki for free at https://jena.apache.org/download/index.cgi.
After successfully downloading the zip folder of apache jena fuseki unzip the downloaded folder. To run the server of apache jena fuski and it work correctly you need to configure the shiro.ini file available in folder `Apache_Jena_Fuseki=> run=> shiro.ini`. Open the file comment the 26 line where it restricted to localhost `/$/** = localhostFilter` just need to add `#` in start of this line and save the file.
Now to run the apache server, you need to go to apache folder and run the batch file of apache-server.bat you will see a command prompt open and your server will be start on `localhost:3030` port.

**The following demo for fuseki require a running fuseki instance on localhost at port 3030 for which you need to a create a dataset name Test on fuseki server for which you need to go `localhost:3030` click on manage datasets=>add new dataset**

**This project is actively developed and maintained.**
To discuss questions and suggestions with the enapso and fuseki community, we'll be happy to meet you in our forum at https://www.innotrade.com/forum/.

# Installation

```
npm i @innotrade/enapso-fuseki-admin --save
```

# Example

## Instantiate an enapso fuseki admin and enapso GraphDB Client

```javascript
// require the enapso GraphDB Client and Admin packages
const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client');
const { EnapsoFusekiAdmin } = require('@innotrade/enapso-fuseki-admin');
// connection data to the running GraphDB instance
const FUSEKI_BASE_URL = 'http://localhost:3030',
    FUSEKI_DATASET = 'Test',
    FUSEKI_QUERY_PATH = `/${FUSEKI_DATASET}/sparql`,
    FUSEKI_UPDATE_PATH = `/${FUSEKI_DATASET}/update`;

// the default prefixes for all SPARQL queries
const DEFAULT_PREFIXES = [
    EnapsoGraphDBClient.PREFIX_OWL,
    EnapsoGraphDBClient.PREFIX_RDF,
    EnapsoGraphDBClient.PREFIX_RDFS,
    EnapsoGraphDBClient.PREFIX_XSD,
    EnapsoGraphDBClient.PREFIX_PROTONS,
    {
        prefix: 'enrepo',
        iri: 'http://ont.enapso.com/repo#'
    }
];
```

## Connection with Fuseki to create an Endpoint

Create an endpoint client with fuseki to perform operation:

```javascript
let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
    baseURL: FUSEKI_BASE_URL,
    repository: FUSEKI_DATASET,
    prefixes: DEFAULT_PREFIXES,
    queryPath: FUSEKI_QUERY_PATH,
    updatePath: FUSEKI_UPDATE_PATH
});
```

## Create new DataSet in your Fuseki Instance

Create a new dataset in your Fuseki for which we need to pass the type of dataset and name of dataset.

```javascript
graphDBEndpoint
    .createDataSet({
        name: 'AutomatedTest',
        type: 'tdb'
    })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

### Result

```json
Create DataSet:{
  "success": true,
  "statusCode": 200,
  "statusMessage": "OK"
}
```

## Delete DataSet in a Fuseki Instance

Delete a dataset in the connected fuseki instance:

```javascript
graphDBEndpoint
    .deleteDataSet({ name: 'AutomatedTest' })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

### Result

```json
Delete DataSet:{
  "success": true,
  "statusCode": 200,
  "statusMessage": "OK"
}

```

## List all DataSets operated in a Fuseki Instance

Get details of all datasets of the fuseki:

```javascript
graphDBEndpoint
    .getAllDataSet()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

### Result

```json
"success": true,
  "statusCode": 200,
  "statusMessage": "OK",
  "data": {
    "datasets": [
      {
        "ds.name": "/AutomatedTest",
        "ds.state": true,
        "ds.services": [
          {
            "srv.type": "gsp-rw",
            "srv.description": "Graph Store Protocol",
            "srv.endpoints": [
              "",
              "data"
            ]
          },
          {
            "srv.type": "query",
            "srv.description": "SPARQL Query",
            "srv.endpoints": [
              "query",
              "sparql",
              ""
            ]
          },
          {
            "srv.type": "gsp-r",
            "srv.description": "Graph Store Protocol (Read)",
            "srv.endpoints": [
              "",
              "get"
            ]
          },
          {
            "srv.type": "update",
            "srv.description": "SPARQL Update",
            "srv.endpoints": [
              "update",
              ""
            ]
          },
          {
            "srv.type": "upload",
            "srv.description": "File Upload",
            "srv.endpoints": [
              "",
              "upload"
            ]
          }
        ]
      },
      {
        "ds.name": "/Test",
        "ds.state": true,
        "ds.services": [
          {
            "srv.type": "gsp-rw",
            "srv.description": "Graph Store Protocol",
            "srv.endpoints": [
              "",
              "data"
            ]
          },
          {
            "srv.type": "query",
            "srv.description": "SPARQL Query",
            "srv.endpoints": [
              "",
              "sparql",
              "query"
            ]
          },
          {
            "srv.type": "gsp-r",
            "srv.description": "Graph Store Protocol (Read)",
            "srv.endpoints": [
              "",
              "get"
            ]
          },
          {
            "srv.type": "update",
            "srv.description": "SPARQL Update",
            "srv.endpoints": [
              "update",
              ""
            ]
          },
          {
            "srv.type": "upload",
            "srv.description": "File Upload",
            "srv.endpoints": [
              "",
              "upload"
            ]
          }
        ]
      },
      {
        "ds.name": "/testing",
        "ds.state": true,
        "ds.services": [
          {
            "srv.type": "gsp-rw",
            "srv.description": "Graph Store Protocol",
            "srv.endpoints": [
              "",
              "data"
            ]
          },
          {
            "srv.type": "query",
            "srv.description": "SPARQL Query",
            "srv.endpoints": [
              "query",
              "",
              "sparql"
            ]
          },
          {
            "srv.type": "gsp-r",
            "srv.description": "Graph Store Protocol (Read)",
            "srv.endpoints": [
              "",
              "get"
            ]
          },
          {
            "srv.type": "update",
            "srv.description": "SPARQL Update",
            "srv.endpoints": [
              "",
              "update"
            ]
          },
          {
            "srv.type": "upload",
            "srv.description": "File Upload",
            "srv.endpoints": [
              "",
              "upload"
            ]
          }
  }
}
```

## Get a specific dataset detail from a Fuseki Instance

Get a specific dataset detail by passing its name:

```javascript
graphDBEndpoint
    .getDataSet({ name: 'Test' })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

### Result

```json
"success": true,
  "statusCode": 200,
  "statusMessage": "OK",
  "data": {
    "datasets": [
      {
        "ds.name": "/Test",
        "ds.state": true,
        "ds.services": [
          {
            "srv.type": "gsp-rw",
            "srv.description": "Graph Store Protocol",
            "srv.endpoints": [
              "",
              "data"
            ]
          },
          {
            "srv.type": "query",
            "srv.description": "SPARQL Query",
            "srv.endpoints": [
              "",
              "sparql",
              "query"
            ]
          },
          {
            "srv.type": "gsp-r",
            "srv.description": "Graph Store Protocol (Read)",
            "srv.endpoints": [
              "",
              "get"
            ]
          },
          {
            "srv.type": "update",
            "srv.description": "SPARQL Update",
            "srv.endpoints": [
              "update",
              ""
            ]
          },
          {
            "srv.type": "upload",
            "srv.description": "File Upload",
            "srv.endpoints": [
              "",
              "upload"
            ]
          }
        ]
      }
          ]
      }
```

## Upload a File to Fuseki

Upload an ontology to Fuseki dataset and optional context (graph) automatically if upload was successful:

```javascript
uploadOntology
    .uploadFromFile({
        fileName: '../ontologies/EnapsoOntologyRepository.owl',
        graph: 'http://ont.enapso.com/repo'
    })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

## Download a graph from Fuseki directly to a Local File

pass a graph name and the fileName in which path and name of file given and it will export the given graph from dataset

```javascript
graphDBEndpoint
    .downloadOntology({
        graph: 'http://ont.enapso.com/repo',
        fileName: '../ontologies/test.owl'
    })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

## Clear entire DataSet of your fuseki Instance

**Caution! This removes ALL triples of the given dataset! This operation cannot be undone!**
The entire dataset will be emptied, i.e. all data of this data will be removed. The dataset remains active.

```javascript
graphDBEndpoint
    .clearDataSet()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

### Result

```json
{
    "success": true,
    "statusCode": 200,
    "message": "OK"
}
```

## Clear entire Context (Named Graph) of a given DataSet

**Caution! This removes ALL triples of the given context! This operation cannot be undone!**
The entire context will be emptied, i.e. all data from this context will be removed. The datset and other contexts remain active.

```javascript
graphDBEndpoint
    .clearSpecificGraph({
        graph: 'http://ont.enapso.com/repo'
    })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

### Result

```json
{
    "success": true,
    "statusCode": 200,
    "message": "OK"
}
```
