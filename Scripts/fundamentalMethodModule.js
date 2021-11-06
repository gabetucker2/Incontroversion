//////////////
//EXTENSIONS//
//////////////

/**
 * TODO: FILL OUT
 */
 function variable() {

    /**
     * Additional methods for this module.
     */
     function additional() {

        /**
         * TODO: FILL OUT
         */
        function TODOFillOut() {

            //TODO: FILL OUT

        }

        return {
            TODOFillOut: TODOFillOut
        }

    }

    /**
     * Get a variable from a key.
     * 
     * @param key
     *              key for desired variable
     * @returns the variable from the key as { letter: '', index: i, universal: t/f }
     * @ensures if key is below 0, returns an error
     */
     function get(key) {

        if (key >= 0 && variables.storage.has(key)) {
            return variables.storage.get(key);
        } else {
            console.error(`ERROR: variable => invalid key in mapToSetVariable`);
        }

    }

    /**
     * Returns the next variable object.
     * 
     * @param key
     *              key of var to create (-1 => variables.size; >= 0 => key)
     * @param universal
     *              t/f for whether variable is universal (T) or existential (F)
     * @updates variables inserts new variable
     * @returns the new variable as an object { letter: '', index: i, universal: t/f }
     * @requires variable must not already exist
     * @ensures if key which would be created already exists, returns error
     */
     function create(key, universal) {

        const thisVariable = {letter: variables.letters[variables.storage.size % variables.letters.length], index: Math.floor(variables.storage.size / variables.letters.length), universal: universal};

        variables.storage.set(key === -1 ? variables.storage.size : key, thisVariable);
    
        return thisVariable;

        return main();

    }

    /**
     * Refresh variable counter; next variable is w0.
     * 
     * @updates variables are cleared
     */
     function refresh() {

        variables.storage.clear();

    }

    /**
     * Main method for this module.
     * TODO: FILL OUT
     */
     function main() {
        
        //TODO: FILL OUT

        return TODOFillOut;

    }
    
    return {
        get: get,
        create: create,
        refresh: refresh
    }

}

/////////////////////
//BOTTOM-UP METHODS//
/////////////////////

/**
 * BOTTOM-UP - STEP 1)
 * JSON file extrapolation to new `raw` object.
 * 
 * @param fileName
 *              fileName for .json file
 * @returns `raw` Object
 * @ensures if file is nonexistent in context of c/p/s folder, returns error
 */
 function JSONToRaw(fileName) {

    /**
     * Additional methods for this module.
     */
     function additional() { return { } }

    /**
     * @requires "Saves/Constants" is valid location
     */
     function constant() {

        return main(`Saves/Constants`);

    }

    /**
     * @requires "Saves/Predicates" is valid location
     */
     function predicate() {

        return main(`Saves/Predicates`);

    }

    /**
     * @requires "Saves/Suppositions" is valid location
     */
     function supposition() {

        return main(`Saves/Suppositions`);

    }

    /**
     * Converts `folder` information into an object.
     * 
     * @param {string} folder
     *              name of folder to access
     */
     function main(folder) {
        
        let XHR = new XMLHttpRequest(),
        error = false,
        errorMessage = ``,
        file = null;
    
        if (!error) {
            XHR.open(`GET`, `${ folder }/${ fileName }`, false);
            XHR.send();
            
            if (XHR.status === 200 && XHR.response !== null) {//successful XHR connection to {folderName}/{fileName.json}
                file = XHR.response;
            } else {
                error = true;
                errorMessage = `ERROR: file '${ folder }/${ fileName }' was not successfully found`;
            }
        }
    
        if (error) {
            console.error(errorMessage);
            return null;
        } else {
            return JSON.parse(file);
        }

    }
    
    return {
        constant: constant,
        predicate: predicate,
        supposition: supposition
    }

}

/**
 * BOTTOM-UP - STEP 2)
 * `raw` Object transformation to `processed` Object.
 * 
 * @param {Object} raw
 *              `raw` Object
 * @param {string} fileName
 *              fileName of JSON
 * @returns `processed` Object
 * @updates `raw`, `countConstants`
 */
 function rawToProcessed(raw, fileName) {

    /**
     * Additional methods for this module.
     */
     function additional() {

        /**
         * Iterates the `map` with raw.letter for a constant or predicate.
         * 
         * @param {Map} map
         * @requires raw.letter is the desired letter to be added
         */
         function addLetterToCountMap(map) {

            //set index property
            Object.defineProperties(raw, { index: {enumerable: true, value: map.get(raw.letter).length + 1}});

        }

        return {
            addLetterToCountMap: addLetterToCountMap
        }

    }

    /**
     * @updates `fileName` property set; letter lowercase; iterates `countConstants`; index property set
     */
     function constant() {

        raw.letter = raw.letter.toLowerCase();

        additional().addLetterToCountMap(constants);

        return main();

    }

    /**
     * @updates `fileName` property set; letter uppercase; iterates `countPredicates`; index property set
     * @requires constants Maps have been updated
     */
     function predicate() {

        raw.letter = raw.letter.toUpperCase();

        additional().addLetterToCountMap(predicates);

        return main();

    }

    /**
     * @updates `fileName` property set; transforms terms (del) property into predicate (fill) properties
     * @requires predicates Maps have been updated
     */
     function supposition() {
    
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
                
                //transfer and remove terms
                terms = JSON.parse(JSON.stringify(root.terms));
                delete root.terms;
                
                //turn them into the predicate
                const p = get(root.predicate.fileName, {components: true, logicHTML: false, englishHTML: false}).predicate().components;
                
                Object.defineProperties(root.predicate, { letter: {enumerable: true, value: p.letter} });
                Object.defineProperties(root.predicate, { index: {enumerable: true, value: p.index} });
                Object.defineProperties(root.predicate, { sentence: {enumerable: true, value: JSON.parse(JSON.stringify(p.sentence))} });
    
                termCount = 0;
    
                for (const phrase of root.predicate.sentence) {
    
                    if (phrase.type === `term`) {
    
                        phrase.term = terms[termCount];
    
                        termCount++;
    
                    } else if (phrase.type === `text`) {
                        //VOID
                    }
    
                }
    
            } else if (root.type === `expression`) {
    
                processUnit(root.operands[0]);

                if (root.operation !== `negation`) {
                    processUnit(root.operands[1]);
                }
    
            } else {
                console.error(`ERROR: rawToProcessed.supposition > processUnit invalid unit type (non-predicate/expression)`);
            }
    
        }
    
        processUnit(raw.data);

        return main();

    }

    /**
     * Defines fileName property.
     */
    function main() {
        
        //set fileName
        Object.defineProperties(raw, { fileName: {enumerable: true, value: fileName} });

        return raw;

    }
    
    return {
        constant: constant,
        predicate: predicate,
        supposition: supposition
    }

}

/**
 * BOTTOM-UP - STEP 3)
 * Create `processed` Object reference in its c/p/s Map
 * 
 * @param {Object} processed
 *              `processed` Object
 * @requires `phi` must not already exist as a Map value
 */
 function processedToMap(processed) {

    /**
     * Additional methods for this module.
     */
     function additional() {

        /**
         * Updates Maps accordingly.
         * 
         * @param {Map} map
         *              Map for `phi` to update
         */
        function setMap(map) {

            map.set(processed.letter, map.get(processed.letter).push(processed) ? map.get(processed.letter) : map.get(processed.letter));

        }

        return {
            setMap: setMap
        }

    }

    /**
     * Updates `constants` Map and `countConstants` Map.
     */
     function constant() {

        additional().setMap(constants);

    }

    /**
     * Updates `predicates` Map and `countPredicates` Map.
     */
     function predicate() {

        additional().setMap(predicates);

    }

    /**
     * Pushes `suppositions` Array.
     */
     function supposition() {

        suppositions.push(processed);

    }

    /**
     * Main method for this module.
     */
     function main() { }
    
    return {
        constant: constant,
        predicate: predicate,
        supposition: supposition
    }

}

/**
 * BOTTOM-UP - STEP 4)
 * Retrieve `processed` Object from Map given `fileName`.
 * 
 * @param {string} fileName
 *              fileName by which to find processed object
 * @returns `processed` Object
 * @ensures returns an error only if fails to retrieve the `processed` Object
 */
 function mapToProcessed(fileName) {

    /**
     * Additional methods for this module.
     */
     function additional() {
        
        /**
         * Returns `processed` from Map.
         * 
         * @param {Map} map
         *              map from which to get `processed` by `fileName`
         */
         function getProcessedFromMapByFileName(map) {

            return Array.from(map.values()).find(m => m.find(n => n.fileName === fileName))[0];

        }

        return {
            getProcessedFromMapByFileName: getProcessedFromMapByFileName
        }

    }

    /**
     * Returns `processed` constant.
     */
     function constant() {

        return main(additional().getProcessedFromMapByFileName(constants));

    }

    /**
     * Returns `processed` predicate.
     */
     function predicate() {

        return main(additional().getProcessedFromMapByFileName(predicates));

    }

    /**
     * Returns `processed` supposition.
     */
     function supposition() {

        return main(suppositions.find(p => p.fileName === fileName));

    }

    /**
     * Check whether `processed` has errors; if so, return.
     * 
     * @param {Object} processed
     *              this `processed` Object
     */
     function main(processed) {
        
        if (processed !== undefined) {
            return processed;
        } else {
            console.error(`ERROR: failure to retrieve processed Object in mapToProcessed`);
        }

    }
    
    return {
        constant: constant,
        predicate: predicate,
        supposition: supposition
    }

}

/**
 * BOTTOM-UP - STEP 5)
 * `processed` Object to `set` Object.
 * 
 * @param {Object} processed
 *              `processed` Object
 * @param {Object} selection
 *              `set` Object with three components used to decide which data to process and return: { components: t/f, logicHTML: t/f, englishHTML: t/f }
 * @returns filtered `set` Object { components: t/f, logicHTML: t/f, englishHTML: t/f }
 * @ensures if processed is null, an error will be returned
 */
 function processedToSet(processed, selection) {

    let logicHTML = ``;
    let englishHTML = ``;

    /**
     * Additional methods for this module.
     */
     function additional() {

        /**
         * Returns an HTML-friendly FOL string for a type.
         * 
         * @param type
         *              string type for this logic HTML (i.e., "constant", "variable", "predicate", "parenthesis", "quantifier", "operator")
         * @param string
         *              string for this logic HTML
         * @param index
         *              index for this string
         * @returns HTML-friendly version of string for letter; int for index
         * @ensures if type is not defined, returns error
         */
        function processedToLogicHTML(type, string, index) {//TODO: add logic type classes to css

            if (index !== 0 && (type === `constant` || type === `variable` || type === `predicate`)) {
                //INCLUDE INDEX
                return `<span class = "logic ${ type }">${ string }<span class = "subText">${ index }</span></span>`;
            } else if (index === 0 || type === `parenthesis` || type === `quantifier` || type === `operator`) {
                //DO NOT INCLUDE INDEX
                return `<span class = "logic ${ type }">${ string }</span>`;
            } else {
                console.error(`ERROR: processedToLogicHTML type input is other than allowed`);
            }

        }

        /**
         * Returns an HTML-friendly english string for a type.
         * 
         * @param type
         *              string type for this logic HTML (i.e., "constant", "variable", "predicate", "parenthesis", "quantifier", "operator")
         * @param component
         *              ~VARIABLE => string; VARIABLE => {string: "", index: ""}
         * @returns HTML-friendly version of string for sentence
         * @ensures if type is not defined, returns error
         */
        function processedToEnglishHTML(type, component) {//TODO: add english type classes to css

            if (type === `variable`) {
                //JUST GRAB LOGICHTML
                return component.index !== 0 ? `<span class = "english ${ type }">${ component.string ?? component.letter }<span class = "subText">${ component.index }</span></span>` : `<span class = "english ${ type }">${ component.string ?? component.letter }</span>`;
            } else if (type === `constant` || type === `predicate` || type == `parenthesis` || type == `quantifier` || type === `operator`) {
                //RETURN ENGLISHHTML
                return `<span class = "english ${ type }">${ component }</span>`;
            } else {
                console.error(`ERROR: processedToEnglishHTML type input is other than allowed`);
            }

        }

        return {
            processedToLogicHTML: processedToLogicHTML,
            processedToEnglishHTML: processedToEnglishHTML
        }

    }

    /**
     * Fill out `logicHTML` and `englishHTML` from constant `processed` Object.
     */
     function constant() {

        //GET HTML LOGIC SYNTAX
        if (selection.logicHTML) {

            logicHTML = additional().processedToLogicHTML(`constant`, processed.letter, processed.index);

        }
        
        //GET HTML ENGLISH SYNTAX
        if (selection.englishHTML) {

            englishHTML = additional().processedToEnglishHTML(`constant`, processed.text);

        }

        return main();

    }

    /**
     * Fill out `logicHTML` and `englishHTML` from predicate `processed` Object.
     * 
     * @ensures if grabbing logicHTML or englishHTML in selection, then returns an error only if type is other than variable or text
     */
     function predicate() {

        //GET HTML LOGIC SYNTAX AND HTML ENGLISH SYNTAX IN ONE STROKE
        if (selection.logicHTML || selection.englishHTML) {

            let isFirst = true;
            let previousIsPlural = false;

            //add predicate
            logicHTML = additional().processedToLogicHTML(`predicate`, processed.letter, processed.index);

            //add variables
            for (const phrase of processed.sentence) {
                
                englishHTML += isFirst ? `` : ` `;
                isFirst = false;

                if (phrase.type === `term`) {

                    let termIsPlural = false;

                    const term = phrase.term;

                    if (term.type === `variable`) {

                        let v;

                        if (variables.storage.has(term.key)) {

                            //variable already exists; thus defined quantifier
                            v = variable().create(term.key);
                            termIsPlural = v.universal;

                        } else {

                            //variable does not exist; thus no quantifiers since quantifiers section creates variable representation
                            v = variable().create(term.key, false);
                            termIsPlural = v.universal;

                        }

                        logicHTML += additional().processedToLogicHTML(`variable`, v.letter, v.index);
                        englishHTML += `${termIsPlural ? domainOfDiscourse.plural : domainOfDiscourse.singular} ${additional().processedToEnglishHTML(`variable`, v)}`;
                    
                    } else if(term.type === `constant`) {
                        
                        const c = get(term.fileName, {components: true, logicHTML: true, englishHTML: true}).constant();
                        logicHTML += c.logicHTML;
                        //only add `the` before non-capitalized text names for constants
                        englishHTML += (c.components.text.slice(0, 1) === c.components.text.slice(0, 1).toUpperCase() ? `` : `the `) + `${c.englishHTML}`;
                        
                    } else {
                        console.error(`ERROR: processedToSet > predicate predicate term has invalid type value (non-variable/constant)`);
                    }
                    
                    previousIsPlural = termIsPlural;

                } else if (phrase.type === `text`) {

                    const text = phrase.text;
                    
                    englishHTML += additional().processedToEnglishHTML(`predicate`, previousIsPlural ? text.plural : text.singular);

                } else {
                    console.error(`ERROR: processedToSet > predicate predicate JSON has invalid type value (non-term/text)`);
                }

            }

        }

        return main();

    }

    /**
     * Fill out `logicHTML` and `englishHTML` from predicate `processed` Object.
     * 
     * @ensures if grabbing logicHTML or englishHTML in selection, then returns an error only if type is other than variable or text
     */
     function supposition() {

        //GET HTML LOGIC SYNTAX AND HTML ENGLISH SYNTAX IN ONE STROKE
        if (selection.logicHTML || selection.englishHTML) {

            depth = 0;

            /**
             * Recursive loop to process a unit into HTML.
             * 
             * @param root
             *              Unit object
             * @updates logicHTML, englishHTML
             * @returns [logicHTML, englishHTML]
             * @requires root is valid
             * @ensures invalid values return an error
             */
             function processUnit(root) {

                let workingLogicHTML = ``, workingEnglishHTML = ``;

                if (root.operation === `negation`) {

                    //add negation stuff then process its inner
                    const negationHTML = symbols.get(`negation`);
                    workingLogicHTML += negationHTML.logicHTML;
                    workingEnglishHTML += `${negationHTML.englishHTML} `;
                    
                    const unit = processUnit(root.operands[0]);
                    workingLogicHTML += unit[0];
                    workingEnglishHTML += unit[1];

                } else {
                    
                    //add non-negated stuff

                    workingEnglishHTML += root.type === `predicate` || depth === 0 ? `` : `(`;

                    //quantifiers
                    for (const quantifier of root.quantifiers.slice().reverse()) {//just to render outer-most first (since top of stack is end of array)
                        
                        workingLogicHTML += `(`;

                        if (quantifier.type === `universal`) {
                            const quantifierHTML = symbols.get(`universal`);
                            workingLogicHTML += quantifierHTML.logicHTML;
                            workingEnglishHTML += `${quantifierHTML.englishHTML} `;
                        } else if (quantifier.type === `existential`) {
                            const quantifierHTML = symbols.get(`existential`);
                            workingLogicHTML += quantifierHTML.logicHTML;
                            workingEnglishHTML += `${quantifierHTML.englishHTML} `;
                        } else {
                            console.error(`ERROR: processedToSet > supposition > processUnit caught supposition ${ processed.fileName } having invalid quantifier (non-universal/existential)`);
                        }

                        const quantifiedVar = variable().create(quantifier.key, quantifier.type === `universal`);

                        workingLogicHTML += additional().processedToLogicHTML(`variable`, quantifiedVar.letter, quantifiedVar.index);
                        workingLogicHTML += `)`;

                        workingEnglishHTML += `${quantifier.type === `universal` ? domainOfDiscourse.plural : domainOfDiscourse.singular} `;
                        workingEnglishHTML += additional().processedToEnglishHTML(`variable`, {string: quantifiedVar.letter, index: quantifiedVar.index});
                        workingEnglishHTML += `, `;

                    }

                    if (root.type === `predicate`) {

                        //predicate
                        const predicate = processedToSet(root.predicate, {components: false, logicHTML: true, englishHTML: true}).predicate();
                        workingLogicHTML += predicate.logicHTML;
                        workingEnglishHTML += predicate.englishHTML;

                    } else if (root.type === `expression`) {

                        //expression
                        depth++;

                        workingLogicHTML += depth === 1 ? `` : `(`;

                        //operation 1
                        const operationHTML = symbols.get(root.operation);
                        workingEnglishHTML += operationHTML.englishHTML.antecedent != null ? `${ operationHTML.englishHTML.antecedent } ` : ``;

                        //operand 1
                        const operand1Results = processUnit(root.operands[0]);
                        workingLogicHTML += operand1Results[0];
                        workingEnglishHTML += operand1Results[1];

                        //operation 2
                        workingLogicHTML += ` ${ operationHTML.logicHTML } `;
                        workingEnglishHTML += operationHTML.englishHTML.consequent != null ? `${ operationHTML.englishHTML.consequent } ` : ``;

                        //operand 2
                        const operand2Results = processUnit(root.operands[1]);
                        workingLogicHTML += operand2Results[0];
                        workingEnglishHTML += operand2Results[1];
                        
                        workingLogicHTML += depth === 1 ? `` : `)`;
                        workingEnglishHTML += depth === 1 ? `` : `)`;

                        depth--;
                        
                    } else {
                        console.error(`ERROR: processedToSet > supposition > processUnit caught supposition ${ processed.fileName } having invalid unit type (non-predicate/expression)`);
                    }

                }
                
                return [workingLogicHTML, workingEnglishHTML];

            }

            if (processed.data !== undefined) {
                const processUnitResults = processUnit(processed.data);
                logicHTML = processUnitResults[0];
                englishHTML = processUnitResults[1];
            } else {
                console.error(`ERROR: processedToSet > supposition requires that supposition ${ processed.fileName } has data property inside its root`)
            }

        }

        return main();

    }

    /**
     * Creates and returns `set` object from `processed`, `logicHTML`, and `englishHTML`.
     */
     function main() {

        //create set
        const set = {};
        if (selection.components) {
            Object.defineProperties(set, { components: {enumerable: true, value: processed}});
        } if (selection.logicHTML) {
            Object.defineProperties(set, { logicHTML: {enumerable: true, value: logicHTML}});
        } if (selection.englishHTML) {
            Object.defineProperties(set, { englishHTML: {enumerable: true, value: englishHTML}});
        }
    
        //return set
        return set;

    }
    
    if (processed != null) {
        return {
            constant: constant,
            predicate: predicate,
            supposition: supposition
        }
    } else {
        console.error(`ERROR: processedToSet nullish processed argument`);
    }
    

}

////////////////////
//TOP-DOWN METHODS//
////////////////////

/**
 * TOP-DOWN - SETUP)
 * Sets up JSON save for given scope.
 * 
 * @updates all things from STEP 1) to STEP 3)
 * @requires one, type, or all is specified in method call
 */
 function setup() {

    /**
     * Additional methods for this module.
     */
     function additional() { return { } }

    /**
     * Sets up JSON save for a given fileName.
     */
     function one(fileName) {

        function constant() {

            //STEP 1)
            components = JSONToRaw(fileName).constant();//raw

            //STEP 2)
            rawToProcessed(components, fileName).constant();//raw => processed

            //STEP 3)
            processedToMap(components).constant();//processed

        }

        function predicate() {

            //STEP 1)
            components = JSONToRaw(fileName).predicate();//raw

            //STEP 2)
            rawToProcessed(components, fileName).predicate();//raw => processed

            //STEP 3)
            processedToMap(components).predicate();//processed

        }

        function supposition() {

            //STEP 1)
            components = JSONToRaw(fileName).supposition();//raw

            //STEP 2)
            rawToProcessed(components, fileName).supposition();//raw => processed

            //STEP 3)
            processedToMap(components).supposition();//processed

        }
        
        return {
            constant: constant,
            predicate: predicate,
            supposition: supposition
        }

    }

    /**
     * Sets up all JSON saves for a given type.
     */
     function type() {

         function constant() {
    
            const typeFolder = `Saves/Constants`;
            for (const fileName of fileSystem.readdirSync(typeFolder)) {
                one(fileName).constant();
            }
    
        }
    
         function predicate() {
    
            const typeFolder = `Saves/Predicates`;
            for (const fileName of fileSystem.readdirSync(typeFolder)) {
                one(fileName).predicate();
            }
    
        }
    
         function supposition() {
    
            const typeFolder = `Saves/Suppositions`;
            for (const fileName of fileSystem.readdirSync(typeFolder)) {
                one(fileName).supposition();
            }
    
        }
        
        return {
            constant: constant,
            predicate: predicate,
            supposition: supposition
        }

    }

    /**
     * Sets up all JSON saves.
     */
     function all() {

        type().constant();
        type().predicate();
        type().supposition();

    }

    /**
     * Main method for this module.
     */
     function main() { }
    
    return {
        one: one,
        type: type,
        all: all
    }

}

/**
 * TOP-DOWN - GET)
 * Gets `set` from storage of type.
 * 
 * @param fileName
 *              fileName to get
 * @param selection
 *              Object with three components which is used to decide which data to process and return: { components: t/f, logicHTML: t/f, englishHTML: t/f }
 * @returns `set`
 */
 function get(fileName, selection) {

    /**
     * Additional methods for this module.
     */
     function additional() { return { } }

    /**
     * TODO: FILL OUT
     */
     function constant() {

        //STEP 4)
        const processed = mapToProcessed(fileName).constant();
        
        //STEP 5)
        return processedToSet(processed, selection).constant();

    }

    /**
     * TODO: FILL OUT
     */
     function predicate() {

        //STEP 4)
        const processed = mapToProcessed(fileName).predicate();
        
        //STEP 5)
        return processedToSet(processed, selection).predicate();

    }

    /**
     * TODO: FILL OUT
     */
     function supposition() {

        //STEP 4)
        const processed = mapToProcessed(fileName).supposition();
        
        //STEP 5)
        return processedToSet(processed, selection).supposition();

    }

    /**
     * Main method for this module.
     */
     function main() { }
    
    return {
        constant: constant,
        predicate: predicate,
        supposition: supposition
    }

}
