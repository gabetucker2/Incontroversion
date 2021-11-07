

/*
 * EXTENSION - FRONTEND - DD HANDLING)
 * Update variables by Domain of Discourse change.
 *
 * @param {string} plurality
 *              whether the DD updated was plural
 */
function updateDD(plurality) {
     
    const domainOfDiscourseSingularElement = document.getElementById("DomainOfDiscourseSingular");
    const domainOfDiscoursePluralElement = document.getElementById("DomainOfDiscoursePlural");

    //set domainOfDIscourseSingularElement to domainOfDiscourse.singular, and do same for plural in here
    if (plurality === `singular`) {
        domainOfDiscourse.singular = domainOfDiscourseSingularElement.value;
    } else if (plurality === `plural`) {
        domainOfDiscourse.plural = domainOfDiscoursePluralElement.value;
    }

    //reset up the maps
    setup().type().predicate();
    setup().type().supposition();

}

/**
 * EXTENSION - FRONTEND - TABLE HANDLING)
 * Sets up the table of c/p/s on the frontend.
 */
 function setupTable() {

    function constant() {

        const table = document.getElementById("constantsTable");
        table.innerHTML = "";

        for (const letterGroup of Array.from(constants.values())) {
            for (const processed of letterGroup) {
    
                variable().refresh();
                
                const set = processedToSet(processed, { components: false, logicHTML: true, englishHTML: true }).constant();
                
                table.innerHTML += (
                    `<tr>
                        <th>${ set.logicHTML }</th>
                        <td>${ set.englishHTML }</td>
                    </tr>`
                );
    
            }
        }
    }

    function predicate() {
        
        const table = document.getElementById("predicatesTable");
        table.innerHTML = "";

        for (const letterGroup of Array.from(predicates.values())) {
            for (const processed of letterGroup) {
            
                variable().refresh();
        
                const set = processedToSet(processed, { components: false, logicHTML: true, englishHTML: true }).predicate();
                
                table.innerHTML += (
                    `<tr>
                        <th>${ set.logicHTML }</th>
                        <td>${ set.englishHTML }</td>
                    </tr>`
                );
        
            }
        }
    }

    function supposition() {
        
        const table = document.getElementById("suppositionsTable");
        table.innerHTML = "";

        for (const processed of suppositions) {
    
            variable().refresh();
        
            const set = processedToSet(processed, { components: true, logicHTML: true, englishHTML: true }).supposition();
            
            table.innerHTML += (
                `<tr>
                    <th name = "suppositionTitle" draggable = "true" ondragstart = "event.dataTransfer.setData('text/plain', '${ set.components.fileName }')" style = "flex-grow: 1; text-align: center; margin-bottom: -0.3vh;">${ set.logicHTML }</th>
                </tr><tr style = "border-top: none;">
                    <td>${ set.englishHTML }</td>
                </tr>`
            );
        
        }
    }

    return {
        constant: constant,
        predicate: predicate,
        supposition: supposition
    }

}
