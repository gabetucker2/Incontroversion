/**
 * TODO: FILL OUT
 */
 function checkSyntacticEntailment(fileName) {

    //set goal
    const goal = get(fileName, {components:true, logicHTML:false, englishHTML: false}).supposition().data;

    //add starting suppositions into the workingDerivations (all except for the fileName Object)
    for (const supposition of suppositions) {
        if (supposition.fileName !== fileName) {
            workingDerivations.push(supposition);
        }
    }

    /**
     * Passes derivation into main method.
     * 
     * @param derivation
     *              derivation from which to derive
     */
     function derive(derivation) {

        /**
         * Additional methods for this module.
         */
         function additional() {
            /////////////////////////////////////////////////////////////TODO: CREATE OUTLINE FOR SUBDERIVATION METHOD since they do not derive from `derivation` (part of it for EI since even tho premise isnt proven, it needs a subderivation)
            /**
             * 
             */
                function generateNonProvenSuppositions() {
                    //TODO: implement
                }

                /**
                 * Get the rate of change in commonality given a start and a new supposition.
                 * update TODO: Returns current percent in common between two `suppositions`
                 * 
                 * @param {Object} startSup
                 *              the start supposition
                 * @param {Object} newSup
                 *              the new supposition
                 * @return ROC %
                 */
                 function getPercentCommon(startSup, newSup) {
                    
                    const startSupUnits = [];
                    const newSupUnits = [];

                    let currentCommon = 0, totalFactors = 0;

                    /**
                     * 
                     * 
                     * @param {Object} root
                     *              TODO: fill
                     * @param {Object} currentArray
                     *              TODO: fill
                     * @updates currentArray with all of root's units
                     */
                     function processUnit(root, currentArray) {

                        if (root.type === `predicate`) {

                            currentArray.push(root.predicate);

                        } else {

                            currentArray.push(root);

                            processUnit(root.operands[0]);

                            if (root.operation !== `negation`) {
                                processUnit(root.operands[1]);
                            }

                        }

                    }

                    processUnit(startSup, startSupUnits);
                    processUnit(newSup, newSupUnits);

                    for (const unit of startSupUnits) {
                        if ((unit.type === `expression` && newSupUnits.find(u => u == unit)) || (unit.type === `predicate` && newSupUnits.find(u => u.fileName == unit.fileName))) {

                            const otherUnit = newSupUnits.find(u => u == unit);

                            //predicate => +0.5 - +1
                            if (unit.type === `predicate`) {
                                currentCommon += 0.5;

                                for (let i = 0; i < unit.terms.length; i++) {
                                    const uTerm = unit.terms[i];
                                    const oTerm = otherUnit.terms[i];

                                    //for each term that one unit has in common w/ the other unit
                                    //if it's a variable and they point to the same quantifier, then the count is common
                                    //alternatively, if they're constants and share the same type of constant and it's common
                                    //then current common variable += 0.5/unit.terms.length
                                    if ((uTerm.type === oTerm.type) && (uTerm.type === `variable` && (unit.quantifiers.find(q => q.key === uTerm.key).type === otherUnit.quantifiers.find(q => q.key === oTerm.key).type)) || (uTerm.type === `constant` && (uTerm.fileName === oTerm.fileName))) {
                                        currentCommon += 0.5 / unit.terms.length;
                                    }
                                }
                            }

                            //expression => +1
                            if (unit.type === `expression`) {
                                currentCommon += 1;
                            }

                            //increment
                            totalFactors += 1;

                        }
                    }

                    //calculate percent
                    //input previous percent common
                    //percent common rn = (common / total)
                    //ROC % = previousPercentCommon + (common / total) ISH????? return this ROC %
                    
                    return currentCommon / totalFactors;
                }

                /**
                 * Get ROC/magnitude in change between start and end percent in common between suppositions.
                 * 
                 * TODO: fill out
                 * @param {float} startPercentCommon
                 *              0-1 float for starting percent in common
                 * @param {float} endPercentCommon
                 *              0-1 float for ending percent in common
                 */
                function ROC(startPercentCommon, endPercentCommon) {

                    return endPercentCommon / startPercentCommon;

                }

                /**
                 * Returns whether, given depth and ROC, transformation is within continuation threshold.
                 * 
                 * @param {int} depth
                 * @param {float} ROC
                 * @return {boolean} t/f for whether within threshold 
                 */
                function returnWithinThreshold(depth, ROC) {
                    
                    const xTrans = -3;
                    return 0.5 * ( Math.pow(depth + xTrans, 3) + (depth + xTrans) ) <= ROC;

                }

            return {
                generateNonProvenSuppositions: generateNonProvenSuppositions,
                getPercentCommon: getPercentCommon,
                ROC: ROC,
                returnWithinThreshold: returnWithinThreshold
            }
         }

        /**
         * Introduction derivation rules for this module.
         */
        function introduction() {

            /**
             * Universal introduction
             * 
             * @param {int} key
             *        possible values for "key" key in Object map
             */
            function universal(key) {

                //recursively iterate through the supposition

                //TODO: make additional method to shorten repeat code in ui and ei

                /**
                 * Recursive loop to initialize a predicate unit in a supposition.
                 * 
                 * @param root
                 *              Unit object
                 * @updates root
                 * @requires root is valid
                 * @ensures invalid values return an error
                 */
                 function processUnit(root) {
                    if (root.type === `predicate`) {
                        for (const term of root.terms) {
                            if (term.type === `constant` && term.key === key) {
                                //convert found constant into var
                                term.type = "variable";
                                //del fileName
                                delete term.fileName;
                                //define key
                                Object.defineProperties(term, { key: {enumerable: true, value: key} });
                            }
                        }
                    } else {
                        processUnit(root.operands[0]);
                        processUnit(root.operands[1]);
                    }
                }

                processUnit(derivation);

                derivation.quantifiers.push({type: `universal`, key: key});

                main(derivation);

            }

            /**
             * Existential introduction
             * 
             * @param {int} key
             *              possible values for "key" key in Object map
             * @requires precondition is met of constant existing
             */
            function existential(key) {

                //recursively iterate through the supposition

                /**
                 * Recursive loop to initialize a predicate unit in a supposition.
                 * 
                 * @param root
                 *              Unit object
                 * @updates root
                 * @requires root is valid
                 * @ensures invalid values return an error
                 */
                 function processUnit(root) {
                    if (root.type === `predicate`) {
                        for (const term of root.terms) {
                            if (term.type === `constant` && term.key === key) {
                                //convert found constant into var
                                term.type = "variable";
                                //del fileName
                                delete term.fileName;
                                //define key
                                Object.defineProperties(term, { key: {enumerable: true, value: key} });
                            }
                        }
                    } else {
                        processUnit(root.operands[0]);
                        processUnit(root.operands[1]);
                    }
                }

                processUnit(derivation);

                derivation.quantifiers.push({type: `existential`, key: key});

                main(derivation);

            }

            /**
             * Initialize a conjunction operation in a supposition.
             */
             function conjunction() {

                for (const other of workingDerivations) {
                    //make a method such that if a and b, then b and a (return true or false depending on expression equality)

                        //a => b === b <= a
                    
                    //make sure that given our new variables, we're not running extraneous operations just because of what we wanted to avoid
                    //with what this method will solve TODO TODO TODO

                    //TODO; go through mains and update

                    if (other != derivation) {
                        const expression = {type: `expression`, quantifiers: [], operation: `conjunction`, operands: []};
                        expression.operands.push(Object.assign({}, dervation));
                        expression.operands.push(Object.assign({}, other));

                        main(expression);
                    }
                }

            }

            /**
             * Inititalize a disjunction operation in a supposition
             * TODO:converge with conjunction
             */
             function disjunction() {

                for (const other of workingDerivations) {
                    if (other != derivation) {
                        const expression = {type: `expression`, quantifiers: [], operation: `disjunction`, operands: []};
                        expression.operands.push(Object.assign({}, dervation));
                        expression.operands.push(Object.assign({}, other));

                        main(expression);
                    }
                }

            }

            /**
             * Conditional introduction.
             * @param {int} first
             *      0 => the first operand is antecedent in =>E
             *      1 => the second operand is antecendent in =>E
             *
             * @param {Object} nonProvenSupposition
             *      the antecedent
             */
             function conditional(first, nonProvenSupposition) {

                if (first === 0 || first === 1) {

                    main(nonProvenSupposition); //performing each operation on the antecedent//todo fix
                    
                    //otherwise we ignore the other operations and say the supposition is contradictory

                } else {
                    error.console("ERROR: Bad argument!");
                }

                main(derivation);

            }

            /**
             * Biconditional introduction
             * 
             * @param {Object} supp1
             *              first unresolved sub-supposition
             * @param {Object} supp2
             *              second unresolved sub-supposition
             */
             function biconditional(supp1, supp2) {

                //TODO: fill

            }

            /**
             * Exclusive disjunction introduction
             * @param {Object} supp1
             *              first unresolved sub-supposition
             * @param {Object} supp2
             *              second unresolved sub-supposition
             */
             function xdisjunction(supp1, supp2) {

                //TODO fill

            }

            /**
             * Negation introduction
             * 
             * @param {Object} supp1
             *              the first unproven supposition in the disjunction
             */
             function negation(supp1) {

                //TODO: FILL OUT

                main(derivation);

            }

            return {
                universal: universal,
                existential: existential,
                conjunction: conjunction,
                disjunction: disjunction,
                conditional: conditional,
                biconditional: biconditional,
                xdisjunction: xdisjunction,
                negation: negation
            }

        }

        /**
         * Elimination derivation rules for this module.
         */
        function elimination() {

            /**
             * Universal elimination
             *          eliminates the last element of the working derivations
             * 
             * @param {Object} constant
             *              constant with which to substitute the predicate
             */
            function universal(constant) {
                
                //replace this quantifier with constant
                for (const operand of Object.assign({}, derivation.operands)) {
                    if (operand.type === `predicate`) {
                        for (const term of operand.terms) {
                            if (term === `variable` && term.key === derivation.quantifiers[derivation.quantifiers.length - 1].key) {
                                //convert found var into constant
                                term.type = "constant";
                                //del key
                                delete term.key;
                                //define fileName
                                Object.defineProperties(term, { fileName: {enumerable: true, value: constant.fileName} });
                                break;
                            }
                        }
                    }
                }
                
                derivation.quantifiers.pop();

                main(derivation);

            }

            /**
             * Existential elimination
             *          eliminates the last element of the working derivations
             * 
             * @param {Object} constant
             *              constant with which to substitute the predicate
             */
            function existential(constant) {

                //TODO: 

                main(derivation);

            }

            /**
             * Conjunction elimination
             * 
             * @param {int} selection
             *              0 => antecendent returned
             *              1 => consequent returned
             */
            function conjunction(selection) {

                if (selection === 0 || selection === 1) {
                    main(Object.assign({}, derivation.operand[selection]))
                } else {
                    console.error(`ERROR: Conjunction elimination invalid argument selection`);
                }

            }

            /**
             * Inclusive disjunction elimination
             * @param {int} selection  
             *      0 => antecendent returned
             *      1 => consequent returned
             */
            function disjunction(selection) {

                if (selection === 0 || selection === 1) {
                    main(Object.assign({}, derivation.operand[selection]))
                } else {
                    console.error('ERROR: Disjunction elimination invalid argument selection');
                }

                main(derivation);

            }

            /**
             * Conditional and revconditional elimination
             * 
             * @param first
             *              0 => the first operand is antecedent in =>E
             *              1 => the second operand is antecendent in =>E
             * 
             */
            function conditional(first) {

                antecedent = first === 0 ? derivation.operands[0] : derivation.operands[1];
                consequent = first === 0 ? derivation.operands[1] : derivation.operands[0];

                if (workingDerivations.length >= 2) {
                    for (const workDer of workingDerivations) {
                        if (workDer == antecedent) {
                            main(Object.assign({}, consequent));
                            break;
                        }
                    }
                }

            }

            /**
             * Biconditional elimination
             */
            function biconditional() {

                conditional(0);
                conditional(1);
                
            }

            /**
             * Exclusive disjunction elimination
             */
            function xdisjunction() {

                introduction().negation();
                biconditional();

            }

            /**
             * Negation elimination
             */
            function negation() {

                main(Object.assign({}, derivation.operands[0]));

            }

            return {
                universal: universal,
                existential: existential,
                conjunction: conjunction,
                disjunction: disjunction,
                conditional: conditional,
                biconditional: biconditional,
                xdisjunction: xdisjunction,
                negation: negation
            }

        }

        return {
            introduction: introduction,
            elimination: elimination
        }
     }
    
    /**
     * Adds the derivation to `workingDerivations` Array and returns t/f based on syntactic entailment after sufficient iterations
     *              derivation == goal => return T
     *              (derivation != goal && |`workingDerivations`| === limitDerivations) => return F
     * 
     * @param {Object} derivation
     *              transformed components with which to check against `goal` for syntactic equivalence, and thus, validity
     * @param {int} depth
     *              whether or not to iterate through `workingDerivations` for more transformations
     * @param {float} previousPercentCommon
     *              0-1 percent common that the previous depth of this derivation had with goal
     * @updates workingDerivation with non-repeat derivations found and refreshes it at the end
     * @returns boolean value to represent whether there is syntactic entailment
     * @ensures error is returned if invalid result
     */
     function main(derivation, depth, previousPercentCommon) {//todo: implement deepen

        //TODO: optimize by having array for all operations performed as string saves so you dont repeatedly run same operation for repeats and just be halted at last minute by precondition inside of returTruthValue method
        let result = null;
        if (goal == derivation) {
            result = true;
        } else if (derivation != goal && workingDerivations.length === limitDerivation) {
            result = false;
        } else if (!workingDerivations.find(d => d == derivation) && additional().returnWithinThreshold(depth, additional().ROC(previousPercentCommon, additional().getPercentCommon(derivation, goal)))) {

            //add representation to Array iff it is not already therein
            workingDerivations.push(derivation);

            //deepen
            if (derivation.type === `expression`) {
                
                //INTRODUCTION

                //TODO: add workingDerivations.length >= 2 precondition for non-subderivation introduction operations

                //DO FOR EACH CONSTANT SUCH THAT ANY CONSTANT DOES NOT EXCLUSE CONSTANT BEING INTRODUCED FOR UNIVERSAL AND EXISTENTIAL
                let canAddQuantifier = false;
                function processUnit(root) {
                    
                    if (root.type === `predicate`) {
                        for (const term of root.terms) {
                            if (term.type === `constant`) {
                                canAddQuantifier = true;
                                break;
                            }
                        }
                    } else {
                        processUnit(root.operands[0]);
                        processUnit(root.operands[1]);
                    }

                }

                processUnit(derivation);
                
                if (canAddQuantifier) {

                    //universal
                    canAddQuantifier = false;
                    for (const supposition of suppositions) {
                        processUnit(supposition.data);
                        if (canAddQuantifier) {
                            break;
                        }
                    }

                    if (canAddQuantifier) {
                        derive(derivation).introduction().universal(derivation.indexOf(`universal`));
                    }
    
                    //existential
                    derive(derivation).introduction().existential(derivation.indexOf(`existential`));

                }


                for (const d of workingDerivations) {
                    
                    //conjunction
                    derive(derivation).introduction().conjunction(d);
                
                }

                //disjunction
                for (const nonProvenSupposition of additional().generateNonProvenSuppositions()) {
                    derive(derivation).introduction().disjunction(nonProvenSupposition);
                }

                //conditional
                for (const nonProvenSupposition of additional().generateNonProvenSuppositions()) {
                    derive(derivation).introduction().conditional(nonProvenSupposition);
                }
                
                //biconditional
                for (const nonProvenSupposition1 of additional().generateNonProvenSuppositions()) {
                    for (const nonProvenSupposition2 of additional().generateNonProvenSuppositions()) {
                        if (nonProvenSupposition1 != nonProvenSupposition2) {
                            derive(derivation).introduction().biconditional(nonProvenSupposition1, nonProvenSupposition2);
                        }
                    }
                }


                //xdisjunction
                for (const nonProvenSupposition1 of additional().generateNonProvenSuppositions()) {
                    for (const nonProvenSupposition2 of additional().generateNonProvenSuppositions()) {
                        if (nonProvenSupposition1 != nonProvenSupposition2) {
                            derive(derivation).introduction().xdisjunction(nonProvenSupposition1, nonProvenSupposition2);
                        }
                    }
                }
                
                //negation
                for (const nonProvenSupposition of additional().generateNonProvenSuppositions()) {
                    derive(derivation).introduction().negation(nonProvenSupposition);
                }


                //ELIMINATION

                switch (derivation.operation) {
                    case `universal`:
                        for (const constantsOfLetter of Array.from(constants.values())) {
                            for (const constant of constantsOfLetter) {
                                derive(derivation).elimination().universal(constant);
                            }
                        }
                        break;
                    case 'exisistential':
                        //TODO: ensure none of the constants are in open assumptions
                        derive(derivation).elimination().existential();
                        break;
                    case 'conjunction':
                        derive(derivation).elimination().conjunction(0);
                        derive(derivation).elimination().conjunction(1);
                        break;
                    case 'disjunction':
                        derive(derivation).elimination().disjunction(0);
                        derive(derivation).elimination().disjunction(1);
                        break;
                    case 'conditional':
                        derive(derivation).elimination().conditional(0);
                        break;
                    case 'revconditional':
                        derive(derivation).elimination().conditional(1);
                        break;
                    case 'biconditional':
                        derive(derivation).elimination().biconditional();
                        break;
                    case 'xdisjunction':
                        derive(derivation).elimination().xdisjunction();
                        break;
                    case 'negation':
                        derive(derivation).elimination().negation();
                        break;
                    default:
                        break;
                }

            }

        } else {
            result = false;
        }

        if (result !== null) {
            workingDerivations = [];
            return result;
        } else {
            console.error(`ERROR: syntacticEntailmentMethodModule > main has invalid result boolean value`);
        }

    }
    
    return {
        derive: derive,
        main: main
    }

}
