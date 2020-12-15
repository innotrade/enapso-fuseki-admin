/* eslint-disable prettier/prettier */
/* eslint-disable no-console, func-names, no-undef, no-restricted-syntax, no-unused-expressions */
// Innotrade enapso GraphDB Admin - Automated Test Suite
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze and Muhammad Yasir
require('@innotrade/enapso-config');
const chai = require('chai');

const { expect } = chai;
const { EnapsoGraphDBClient } = requireEx('@innotrade/enapso-graphdb-client');
/* eslint-disable no-unused-vars */
// this is required to add the admin features for the client
const { EnapsoFusekiAdmin } = require('../index');
const testConfig = require('./config');

describe('ENAPSO Fuseki Admin Automated Test Suite', function () {
    //  this.timeout(60000);

    //  instantiate a new GraphDB endpoint
    const lEndpoint = new EnapsoGraphDBClient.Endpoint({
        baseURL: testConfig.baseURL,
        repository: testConfig.dataset,
        prefixes: testConfig.prefixes,
        queryPath: testConfig.queryPath,
        updatePath: testConfig.updatePath
    });
    it('Create new DataSet in Fuseki', (done) => {
        lEndpoint
            .createDataSet({
                name: 'Automated',
                type: 'tdb'
            })
            .then((result) => {
                expect(result).to.have.property('success', true);
                done();
            })
            .catch((err) => {
                console.log(`Create new dataset: ${err.message}`);
                done(err);
            });
    });
    it('Get Specific Dataset from Fuseki', (done) => {
        lEndpoint
            .getDataSet({
                name: 'Automated'
            })
            .then((result) => {
                expect(result).to.have.property('success', true);
                done();
            })
            .catch((err) => {
                console.log(`Get detail of specific dataset: ${err.message}`);
                done(err);
            });
    });

    it('Get All Datasets from Fuseki', (done) => {
        lEndpoint
            .getAllDataSet()
            .then((result) => {
                expect(result).to.have.property('success', true);
                done();
            })
            .catch((err) => {
                console.log(`Get All datasets detail: ${err.message}`);
                done(err);
            });
    });
    it('Delete a Dataset from Fuseki', () => {
        lEndpoint
            .deleteDataSet({ name: 'Automated' })
            .then((result) => {
                //  expect(result).to.have.property('statusCode', 500);
                //done();
            })
            .catch((err) => {
                //console.log(`Delete Newly created Data Set: ${err.message}`);
                // done(err);
            });
    });
    it('Upload Ontology ', (done) => {
        lEndpoint
            .uploadOntology({
                fileName: 'ontologies/EnapsoOntologyRepository.owl',
                graph: 'http://ont.enapso.com/repo'
            })
            .then((result) => {
                expect(result).to.have.property('success', true);
                done();
            })
            .catch((err) => {
                console.log(`Upload Ontology: ${err}`);
                done(err);
            });
    });
    it('Download Ontology ', (done) => {
        lEndpoint
            .downloadOntology({
                fileName: 'ontologies/test.owl',
                graph: 'http://ont.enapso.com/repo'
            })
            .then((result) => {
                expect(result).to.have.property('success', true);
                done();
            })
            .catch((err) => {
                console.log(`download Ontology: ${err}`);
                done(err);
            });
    });
    it('clear specific graph ', (done) => {
        lEndpoint
            .clearSpecificGraph({
                graph: 'http://ont.enapso.com/repo'
            })
            .then((result) => {
                expect(result).to.have.property('success', true);
                done();
            })
            .catch((err) => {
                console.log(`clear specific graph: ${err.message}`);
                done(err);
            });
    });
    it('clear dataset ', (done) => {
        lEndpoint
            .clearDataSet()
            .then((result) => {
                expect(result).to.have.property('success', true);
                done();
            })
            .catch((err) => {
                console.log(`clear dataset: ${err.message}`);
                done(err);
            });
    });
});
