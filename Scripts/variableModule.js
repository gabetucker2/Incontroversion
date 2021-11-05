//////////
//IMPORT//
//////////

const fileSystem = require(`fs`);
const util = require(`util`);
//to inspect an object, use console.log(util.inspect(OBJ, showHidden = true, depth = null));

//////////////////////////////
//GENERAL INFORMATIC STORAGE//
//////////////////////////////

//UNIVERSE OF DISCOURSE STORAGE
let domainOfDiscourse = {singular: `person`, plural: `people`};//TODO: define procedurally

//VARIABLE STORAGE
const variables = {
    letters: ['w', 'x', 'y', 'z'],
    storage: new Map()//do size to get count; of form {0: {letter: c, index: i, universal: t/f}}
}

//CONSTANTS STORAGE
const constants = new Map();//of form {'c0': {}, 'd0': {}, 'd1': {}} where key == letter-index pairing and value == components
const countConstants = new Map();//of form {'c': 1, 'd': 2} where key == letter and value == letter count in constants Map

//PREDICATE STORAGE
const predicates = new Map();//of form {'A0': {}, 'R0': {}, 'R1': {}} where key == letter-index pairing and value == components
const countPredicates = new Map();//of form {'A': 1, 'R': 2} where key == letter and value == letter count in predicates Map

//SUPPOSITIONS STORAGE
const suppositions = [];

//SYMBOLS STORAGE
const symbols = new Map();
