"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var csv_parser_1 = require("csv-parser");
function exportCsv() {
    fs_1.default.createReadStream('lugares_bsb.csv').pipe((0, csv_parser_1.default)())
        .on('data', function (row) {
        console.log(row);
    })
        .on('end', function () {
        console.log('CSV file successfully processed.');
    });
}
