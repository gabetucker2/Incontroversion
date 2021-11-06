/**
 * TODO: FILL OUT
 */
 function checkSyntacticEntailment(fileName) {

    //set goal
    const goal = get(fileName, {components:true, logicHTML:false, englishHTML: false}).supposition();

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
         * Introduction derivation rules for this module.
         */
        function introduction() {

            /**
             * Universal introduction
             */
            function universal() {

                //TODO: FILL OUT

                returnTruthValue(derivation);

            }

            /**
             * TODO: FILL OUT
             */
            function existential() {

                //TODO: FILL OUT

                returnTruthValue(derivation);

            }

            /**
             * TODO: FILL OUT
             */
            function conjunction() {

                //TODO: FILL OUT

                returnTruthValue(derivation);

            }

            /**
             * TODO: FILL OUT//TODO: ASK GABE ABOUT THIS ONE
             */
            function disjunction() {

                //TODO: FILL OUT

                returnTruthValue(derivation);

            }

            /**
             * Conditional introduction.
             * 
             */
            function conditional() {

                if (workingDerivations.length >= 2) {
                    //we want to get the first index of ⇒ so that we can split it up into 2 subsets
                    //check and see if P is true and Q is false. 
                    derivation = 
                }

                //TODO: FILL OUT

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
                for (const operand of derivation.operands) {
                    if (operand.type === `predicate`) {
                        for (const term of operand.terms) {
                            if (term === `variable` && term.key === derivation.quantifiers[derivation.quantifiers.length - 1].key) {
                                //transform the term
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

                //TODO get it

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
     function returnTruthValue(derivation, deepen) {
        
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
                
                //universal


                //existential


                //conjunction & disjunction
                for (const d of workingDerivations) {
                    derive(derivation).introduction().conjunction();
                    derive(derivation).introduction().disjunction();
                }

                //conditional
                

                //revconditional


                //biconditional


                //xdisjunction


                //negation


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
                        //TODO: ensure you don't need preconditions met
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
