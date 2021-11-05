/**
 * Set default values.
 */

let constants = [
    new Constant(`c`, `cat`, `cats`),
    new Constant(`d`, `dog`, `dogs`),
    new Constant(`f`, `fish`, `fish`),
    new Constant(`d`, `deer`, `deer`)
], predicates = [
    new Predicate(`A`, `{0} attack {1}`, [null, null]),
    new Predicate(`D`, `{0} defend {1}`, [null, constants[3]]),
    new Predicate(`F`, `{0} and {1} are friends`, [constants[1], constants[2]]),
    new Predicate(`H`, `{0} are happy`, [null])
], suppositions = [
    new Supposition(`(~{P0}{C1}{C0}&(A{V0})({P0}{V0}{C0}->(E{V1})(~{P1}{C0}{V1}~v{P2}{V0}{C0})))`, [constants[2], constants[3]], [predicates[3], predicates[2]]),
    new Supposition(`(E{V0})(A{V1})({P0}{V1}&{P1}{V0}{V1})`, null, [predicates[1], predicates[0]])
];

//do stuff here to fill arrays/////////////

let lettersVariables = [//reference for setting variable letters
    `w`, `x`, `y`, `z`
], globalVarKeys = [],//[ {letter: a, globalKey: 0}, {letter: a, globalKey: 1}, {letter: b, globalKey: 2} ]
constantIndexes = InitializeLetterIndexArray(constants),//[ {object: constants[0], index: 0}, {object: constants[1], index: 0}, {object: constants[2], index: 1}... ]
predicateIndexes = InitializeLetterIndexArray(predicates);// ^ but for predicates

let universeOfDiscourse = `things`;
