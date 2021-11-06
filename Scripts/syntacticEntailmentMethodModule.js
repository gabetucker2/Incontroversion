/**
 * TODO: FILL OUT
 */
 function checkSyntacticEntailment(fileName) {

    const goal = ...;//TODO: define

    //TODO: add to workingDerivations all suppositions except the goal

    /**
     * Additional methods for this module.
     */
     function additional() {

        /**
         * Returns "expression" or "predicate".
         */
        function returnType() {

            //TODO: FILL OUT

        }

        /**
         * Returns the operation type as a string.
         */
        function returnOperation() {

            //TODO: FILL OUT

        }

        return {
            returnType: returnType,
            returnOperation: returnOperation
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
         * Reiteration derivation rule for this module.
         */
        function reiteration() {
                
            //TODO: FILL OUT

            returnTruthValue(derivation);
            
        }

        /**
         * Introduction derivation rules for this module.
         */
        function introduction() {

            /**
             * TODO: FILL OUT
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
             * TODO: FILL OUT
             */
            function universal() {

                //

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
             * TODO: FILL OUT
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
            reiteration: reiteration,
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
     * @param {bool} deepen
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
            
            //REITERATION
            
            
            //INTRODUCTION
            

            //ELIMINATION
            if (additional().checkType() === `expression`) {

                switch (additional().returnOperation()) {
                    case `universal`:
                        derive(derivation).elimination().universal();
                        break;
                    case 'exisistential':
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

            //deepen existential

            //deepen .... through each one, fill this out

        } else {
            //VOID
        }

        if (result !== null) {
            workingDerivations = [];
            return result;
        } else {
            console.error(`ERROR: syntacticEntailmentMethodModule > returnTruthValue has invalid result boolean value`);
        }

    }
    
    return {
        introduction: introduction,
        elimination: elimination,
        returnTruthValue: returnTruthValue
    }

}
