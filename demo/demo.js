// Innotrade enapso - GraphDB Admin Example
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author(s): Alexander Schulze and Muhammad Yasir

// require the enapso GraphDB Admin Demo module
require('@innotrade/enapso-config');
const fsPromises = require('fs').promises,
    { EnapsoGraphDBClient } = requireEx('@innotrade/enapso-graphdb-client'),
    { EnapsoFusekiAdmin } = require('../index'),
    { EnapsoLogger, EnapsoLoggerFactory } = require('@innotrade/enapso-logger');
EnapsoLoggerFactory.createGlobalLogger('enLogger');

// connection data to the running GraphDB instance
const FUSEKI_BASE_URL = encfg.getConfig(
        'enapsoDefaultFuseki.baseUrl',
        'http://localhost:3030'
    ),
    FUSEKI_DATASET = encfg.getConfig('enapsoDefaultFuseki.repository', 'Test'),
    FUSEKI_QUERY_PATH = `/${FUSEKI_DATASET}/sparql`,
    FUSEKI_UPDATE_PATH = `/${FUSEKI_DATASET}/update`,
    DEFAULT_PREFIXES = [
        EnapsoGraphDBClient.PREFIX_OWL,
        EnapsoGraphDBClient.PREFIX_RDF,
        EnapsoGraphDBClient.PREFIX_RDFS,
        EnapsoGraphDBClient.PREFIX_XSD,
        EnapsoGraphDBClient.PREFIX_PROTONS,
        {
            prefix: encfg.getConfig('enapsoDefaultFuseki.prefix', 'enrepo'),
            iri: encfg.getConfig(
                'enapsoDefaultFuseki.iri',
                'http://ont.enapso.com/repo#'
            )
        }
    ];

console.log(
    'ENAPSO GraphDB Admin Demo\n(C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany'
);

const EnapsoGraphDBAdminDemo = {
    graphDBEndpoint: null,

    createEndpoint() {
        try {
            // instantiate a new GraphDB endpoint
            return new EnapsoGraphDBClient.Endpoint({
                baseURL: FUSEKI_BASE_URL,
                repository: FUSEKI_DATASET,
                prefixes: DEFAULT_PREFIXES,
                queryPath: FUSEKI_QUERY_PATH,
                updatePath: FUSEKI_UPDATE_PATH
            });
        } catch (err) {
            console.log(err);
        }
    },
    async demoCreateDataSet(options) {
        try {
            let resp = await this.graphDBEndpoint.createDataSet(options);
            enLogger.info('Create DataSet:' + JSON.stringify(resp, null, 2));
        } catch (err) {
            console.log(err);
        }
    },
    async demoDeleteDataSet(options) {
        try {
            let resp = await this.graphDBEndpoint.deleteDataSet(options);
            enLogger.info('Delete DataSet:' + JSON.stringify(resp, null, 2));
        } catch (err) {
            console.log(err);
        }
    },
    async demoGetDataSet(options) {
        try {
            let resp = await this.graphDBEndpoint.getDataSet(options);
            enLogger.info('Get DataSet:' + JSON.stringify(resp, null, 2));
        } catch (err) {
            console.log(err);
        }
    },
    async demoGetAllDataSets() {
        try {
            let resp = await this.graphDBEndpoint.getAllDataSet();
            enLogger.info('Get All DataSets:' + JSON.stringify(resp, null, 2));
        } catch (err) {
            console.log(err);
        }
    },
    async demoUploadOntology(options) {
        try {
            let resp = await this.graphDBEndpoint.uploadOntology(options);
            enLogger.info('upload ontology:' + JSON.stringify(resp, null, 2));
        } catch (err) {
            console.log(err);
        }
    },
    async demoDownloadOntology(options) {
        try {
            let resp = await this.graphDBEndpoint.downloadOntology(options);
            enLogger.info(
                'download ontology:' + JSON.stringify(resp.statusCode, null, 2)
            );
        } catch (err) {
            console.log(err);
        }
    },
    async demoClearDataSet() {
        try {
            let resp = await this.graphDBEndpoint.clearDataSet();
            enLogger.info('Clear Repository:' + JSON.stringify(resp, null, 2));
        } catch (err) {
            console.log(err);
        }
    },
    async democlearSpecifcGraph(options) {
        try {
            let resp = await this.graphDBEndpoint.clearSpecificGraph(options);
            enLogger.info(
                'Clear Specific Graph:' + JSON.stringify(resp, null, 2)
            );
        } catch (err) {
            console.log(err);
        }
    },
    async demo() {
        this.graphDBEndpoint = await this.createEndpoint();
        await this.demoCreateDataSet({
            name: 'AutomatedTest',
            type: 'tdb'
        });
        await this.demoGetDataSet({ name: 'Test' });
        await this.demoGetAllDataSets();
        await this.demoDeleteDataSet({ name: 'AutomatedTest' });
        await this.demoUploadOntology({
            fileName: '../ontologies/EnapsoOntologyRepository.owl',
            graph: 'http://ont.enapso.com/repo'
        });
        await this.demoDownloadOntology({
            graph: 'http://ont.enapso.com/repo',
            fileName: '../ontologies/test.owl'
        });
        await this.democlearSpecifcGraph({
            graph: 'http://ont.enapso.com/repo'
        });
        await this.demoClearDataSet();
    }
};

EnapsoGraphDBAdminDemo.demo();
