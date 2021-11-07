//this is the demonstration method that will display the proof if true
function demonstrationModule(goalFileName, premiseFileNames) {

    const goalUnit = get(goalFileName, {components: true, logicHTML: false, englishHTML: false}).supposition();
    let workingDerivations = [];
    let currentUnit = null;

    function derive() {
        function elimination() {
            /**
             * Universal elimination
             *          eliminates the last element of the working currentUnit
             * 
             * @param {Object} constant
             *              constant with which to substitute the predicate
             */
            function universal(constant) {
                            
                //replace this quantifier with constant
                newUnit = Object.assign({}, currentUnit);
                if (newUnit.type === `predicate`) {
                    for (const phrase of newUnit.predicate.sentence) {
                        if (phrase.type == `term` && phrase.term.type === `variable` && phrase.term.key === currentUnit.quantifiers[newUnit.quantifiers.length - 1].key) {
                            console.log(`found`);
                            //convert found var into constant
                            phrase.term.type = "constant";
                            //del key
                            delete phrase.term.key;
                            //define fileName
                            Object.defineProperties(phrase, { fileName: {enumerable: true, value: constant.fileName} });
                            break;
                        }
                    }
                }
                
                newUnit.quantifiers.pop();

                main(newUnit);

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
                    main(Object.assign({}, currentUnit.operand[selection]))
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
                    main(Object.assign({}, currentUnit.operand[selection]))
                } else {
                    console.error('ERROR: Disjunction elimination invalid argument selection');
                }

                main(currentUnit);

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

                antecedent = first === 0 ? currentUnit.operands[0] : currentUnit.operands[1];
                consequent = first === 0 ? currentUnit.operands[1] : currentUnit.operands[0];

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

                main(Object.assign({}, currentUnit.operands[0]));

            }

            return {
                universal: universal,
                conjunction: conjunction,
                disjunction: disjunction,
                conditional: conditional,
                biconditional: biconditional,
                xdisjunction: xdisjunction,
                negation: negation
            }

        }

        return {
            elimination: elimination
        }
    }
        
    //figure out whether to pass a global variable or not
    //so if this is the first thing that runs as soon as demonstratedModule is called then we need to figure out
    //what to do with PremiseFileName
    function main(cu) {
        
        console.log(JSON.parse(JSON.stringify(cu)));

        currentUnit = cu;
        let returnVal = false;
        if (goalUnit == currentUnit) {
            //SUCCESS!
            returnVal = true;
        } else if (workingDerivations.length >= limitDerivations) {
            //remain false
        } else {
            if (currentUnit.quantifiers.find(q => q.type === `universal`)) {
                for (const constantsOfLetter of Array.from(constants.values())) {
                    for (const constant of constantsOfLetter) {
                        derive(currentUnit).elimination().universal(constant);
                    }
                }
            }

            switch (currentUnit.operation) {
                case 'conjunction':
                    derive(currentUnit).elimination().conjunction(0);
                    derive(currentUnit).elimination().conjunction(1);
                    break;
                case 'disjunction':
                    derive(currentUnit).elimination().disjunction(0);
                    derive(currentUnit).elimination().disjunction(1);
                    break;
                case 'conditional':
                    derive(currentUnit).elimination().conditional(0);
                    break;
                case 'revconditional':
                    derive(currentUnit).elimination().conditional(1);
                    break;
                case 'biconditional':
                    derive(currentUnit).elimination().biconditional();
                    break;
                case 'xdisjunction':
                    derive(currentUnit).elimination().xdisjunction();
                    break;
                case 'negation':
                    derive(currentUnit).elimination().negation();
                    break;
            }
        }
        return returnVal;
    }

    function init() {

        workingDerivations = [];

        for (const premiseFileName of premiseFileNames) {
            if (premiseFileName !== ``) {
                workingDerivations.push(get(premiseFileName, {components: true, logicHTML: false, englishHTML: false}).supposition().components.data);
            }
        }
        
        for (const sup of workingDerivations) {
            if (main(sup)) {
                //real true todo update
                return false;
            }
        }

        //real false todo update
        return true;

    }

    return {
        main: main,
        derive: derive,
        init: init
    }
}
