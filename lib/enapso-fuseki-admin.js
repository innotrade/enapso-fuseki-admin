// Innotrade enapso GraphDB Admin
// (C) Copyright 2019 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author(s):  Alexander Schulze and Muhammad Yasir
// For further detalils please also refer to the GraphDB admin documentation at: http://localhost:7200/webapi
// http://graphdb.ontotext.com/documentation/free/devhub/workbench-rest-api/location-and-repository-tutorial.html

const fs = require('fs');
const request = require('request-promise');

require('@innotrade/enapso-config');

// require the enapso GraphDB Client package
const { EnapsoGraphDBClient } = requireEx('@innotrade/enapso-graphdb-client');

const EnapsoFusekiAdmin = {
    execRequest(options) {
        return new Promise(async (resolve, reject) => {
            var res;
            try {
                options.resolveWithFullResponse = true;
                res = await request(options);
                // success is OK (200) and ACCEPTED (202) and CREATED (201)
                let success =
                    200 === res.statusCode ||
                    202 === res.statusCode ||
                    201 === res.statusCode ||
                    204 === res.statusCode;
                res = {
                    success: success,
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage
                        ? res.statusMessage
                        : success
                        ? 'OK'
                        : 'ERROR ' + res.statusCode,
                    data: res.body
                };
                resolve(res);
                // console.log("OK: " + JSON.stringify(res));
            } catch (err) {
                res = {
                    success: false,
                    statusCode: err.statusCode ? err.statusCode : -1,
                    statusMessage:
                        err.error && err.error.message
                            ? err.error.message
                            : err.message
                };
                reject(res);
            }
        });
    },
    createDataSet(aOptions) {
        aOptions = aOptions || {};
        return new Promise(async (resolve, reject) => {
            let config = {
                dbName: aOptions.name,
                dbType: aOptions.type
            };
            let options = {
                method: 'POST',
                uri: this.getBaseURL() + '/$/datasets',
                form: config, //formurlencoded(config),
                json: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            try {
                let resp = await this.execRequest(options);
                resolve(resp);
            } catch (err) {
                reject(err);
            }
        });
    },
    getDataSet(aOptions) {
        aOptions = aOptions || {};
        return new Promise(async (resolve, reject) => {
            let options = {
                method: 'GET',
                uri: this.getBaseURL() + '/$/datasets/' + aOptions.name,
                json: true,
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };
            try {
                let resp = await this.execRequest(options);
                resolve(resp);
            } catch (err) {
                reject(err);
            }
        });
    },
    getAllDataSet(aOptions) {
        aOptions = aOptions || {};
        return new Promise(async (resolve, reject) => {
            let options = {
                method: 'GET',
                uri: this.getBaseURL() + '/$/datasets',
                json: true,
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };
            try {
                let resp = await this.execRequest(options);
                resolve(resp);
            } catch (err) {
                reject(err);
            }
        });
    },
    deleteDataSet(aOptions) {
        aOptions = aOptions || {};
        return new Promise(async (resolve, reject) => {
            let options = {
                method: 'Delete',
                uri: this.getBaseURL() + '/$/datasets/' + aOptions.name,
                json: true,
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };
            try {
                let resp = await this.execRequest(options);
                resolve(resp);
            } catch (err) {
                reject(err);
            }
        });
    },
    uploadOntology(aOptions) {
        aOptions = aOptions || {};
        return new Promise(async (resolve, reject) => {
            let config = {
                fileName: fs.createReadStream(aOptions.fileName),
                graph: aOptions.graph
            };
            let options = {
                method: 'POST',
                uri: this.getBaseURL() + '/' + this.getRepository() + '/upload',
                formData: config,
                json: true,
                headers: {
                    Accept: 'application/redf+xml',
                    'Content-Type': 'multipart/form-data'
                }
            };
            //     console.log(options);
            try {
                let resp = await this.execRequest(options);
                resolve(resp);
            } catch (err) {
                reject(err);
            }
        });
    },
    downloadOntology(aOptions) {
        aOptions = aOptions || {};
        return new Promise(async (resolve, reject) => {
            let config = {
                graph: aOptions.graph
            };
            let options = {
                method: 'GET',
                uri: this.getBaseURL() + '/' + this.getRepository() + '/data',
                body: config,
                json: true,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };
            // console.log(options);
            try {
                let resp = await this.execRequest(options);
                fs.writeFileSync(aOptions.fileName, resp.data);

                resolve(resp);
            } catch (err) {
                reject(err);
            }
        });
    },
    clearDataSet() {
        return new Promise(async (resolve, reject) => {
            try {
                let lRes = await this.update(`CLEAR ALL`);
                resolve(lRes);
            } catch (err) {
                reject(err);
            }
        });
    },
    clearSpecificGraph(aOptions) {
        return new Promise(async (resolve, reject) => {
            try {
                let lRes = await this.update(`CLEAR graph <${aOptions.graph}>`);
                resolve(lRes);
            } catch (err) {
                reject(err);
            }
        });
    }
};

// extend the enapso GraphDB client by the additional Fuseki Admin features
for (let key in EnapsoFusekiAdmin) {
    EnapsoGraphDBClient.Endpoint.prototype[key] = EnapsoFusekiAdmin[key];
}

module.exports = EnapsoFusekiAdmin;
