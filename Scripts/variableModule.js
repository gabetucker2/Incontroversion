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
const constants = new Map()//of form {'c': [{}, {}, {}], 'd': [{}]}

//PREDICATE STORAGE
const predicates = new Map()//of form {'C': [{}, {}, {}], 'D': [{}]}

//SUPPOSITIONS STORAGE
const suppositions = [];//of form [{}, {}, {}]
const limitDerivations = 10000;
let workingDerivations = [];//of form [{}, {}, {}]

//SYMBOLS STORAGE
const symbols = new Map();
