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
     * Passes derivation into returnTruthValue method.
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

            return {
                generateNonProvenSuppositions: generateNonProvenSuppositions
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

                returnTruthValue(derivation);

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

                returnTruthValue(derivation);

            }

            /**
             * Initialize a conjunction operation in a supposition.
             * 
             * @param {Object} otherUnit
             *              the unit being conjoined with `derivation`
             */
             function conjunction(otherUnit) {

                //TODO: FILL OUT create new expression NEXT STEP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! easy
                //TODO: also make sure all introductions use Object.assign such that old derivation is not overridden

                const expression = Object.assign({}, {type : `expression`, quantifiers: [], operation: `conjunction`, operands: []});

                //simply an assumption => feel free to revise
                derivation.operation.push(expression);

                returnTruthValue(derivation);

            }

            /**
             * Inititalize a disjunction operation in a supposition
             * @param {Object} otherUnit
             *                  the unit being disjoined with `derivation`
             * 
             */
             function disjunction(otherUnit) {

                //TODO: FILL OUT

                const expression = Object.assign({}, {type : `expression`, operation: `disjunction`, operands: []});
                
                //simply an assumption => feel free to revise
                derivation.operation.push(expression);

                returnTruthValue(derivation);

            }

            /**
             * Conditional introduction.
             * @param {int} first
             *      0 => the first operand is antecedent in =>E
             *      1 => the second operand is antecendent in =>E
             *
             * @param {Object} nonProvenSupposition
             *      the consequent object???
             */
             function conditional(first, nonProvenSupposition) {

                if (first === 0 || first === 1) {
                    //do something teehee
                } else {
                    error.console("ERROR: Bad argument!");
                }

                returnTruthValue(derivation);

            }

            /**
             * TODO: FILL OUT
             */
             function biconditional() {

                if (workingDerivations.length >= 2){
                    
                }

                //TODO: FILL OUT

                returnTruthValue(derivation);

            }

            /**
             * TODO: FILL OUT
             */
             function xdisjunction() {

                //TODO: FILL OUT

                returnTruthValue(derivation);

            }

            /**
             * TODO: FILL OUT
             */
             function negation() {

                //TODO: FILL OUT

                returnTruthValue(derivation);

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

                returnTruthValue(derivation);

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

                returnTruthValue(derivation);

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
                    returnTruthValue(Object.assign({}, derivation.operand[selection]))
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
                    returnTruthValue(Object.assign({}, derivation.operand[selection]))
                } else {
                    console.error('ERROR: Disjunction elimination invalid argument selection');
                }

                returnTruthValue(derivation);

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
                            returnTruthValue(Object.assign({}, consequent));
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

                returnTruthValue(Object.assign({}, derivation.operands[0]));

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
     * @param {boolean} deepen
     *              whether or not to iterate through `workingDerivations` for more transformations (i.e., deepen)
     * @updates workingDerivation with non-repeat derivations found and refreshes it at the end
     * @returns boolean value to represent whether there is syntactic entailment
     * @ensures error is returned if invalid result
     */
     function returnTruthValue(derivation, deepen) {//todo: implement deepen
        //TODO: optimize by having array for all operations performed as string saves so you dont repeatedly run same operation for repeats and just be halted at last minute by precondition inside of returTruthValue method
        let result = null;
        if (goal == derivation) {
            result = true;
        } else if (derivation != goal && workingDerivations.length === limitDerivation) {
            result = false;
        } else if (!workingDerivations.find(d => d == derivation)) {

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
                    derive(derivation).introduction().conditional(0, nonProvenSupposition);
                }
                
                //revconditional
                for (const nonProvenSupposition of additional().generateNonProvenSuppositions()) {
                    derive(derivation).introduction().biconditional(1, nonProvenSupposition);
                }
                
                //biconditional
                for (const nonProvenSupposition1 of additional().generateNonProvenSuppositions()) {
                    for (const nonProvenSupposition2 of additional().generateNonProvenSuppositions()) {
                        if (nonProvenSupposition1 != nonProvenSupposition2) {
                            introduction().biconditional(nonProvenSupposition1, nonProvenSupposition2);
                        }
                    }
                }


                //xdisjunction
                for (const nonProvenSupposition1 of additional().generateNonProvenSuppositions()) {
                    for (const nonProvenSupposition2 of additional().generateNonProvenSuppositions()) {
                        if (nonProvenSupposition1 != nonProvenSupposition2) {
                            introduction().xdisjunction(nonProvenSupposition1, nonProvenSupposition2);
                        }
                    }
                }
                
                //negation
                for (const nonProvenSupposition of additional().generateNonProvenSuppositions()) {
                    introduction().negation(1, nonProvenSupposition);
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
            //VOID so that it can break the recursive derivations
        }

        if (result !== null) {
            workingDerivations = [];
            return result;
        } else {
            console.error(`ERROR: syntacticEntailmentMethodModule > returnTruthValue has invalid result boolean value`);
        }

    }
    
    return {
        derive: derive,
        returnTruthValue: returnTruthValue
    }

}
