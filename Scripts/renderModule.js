/////////////////////////
//Fill innerHTML of ids//
/////////////////////////
const domainOfDiscourseElement = document.getElementById("DomainOfDiscourse");
domainOfDiscourseElement.innerHTML = domainOfDiscourse.plural;

/////////////////////
//Render each table//
/////////////////////

//constantsTable
const constantsTable = document.getElementById("constantsTable");

for (const letterGroup of Array.from(constants.values())) {
    for (const processed of letterGroup) {

        refreshVariables();
        
        const set = processedToSet(processed, { components: false, logicHTML: true, englishHTML: true }).constant();
        
        constantsTable.innerHTML += (
            `<tr>
                <th>${ set.logicHTML }</th>
                <td>${ set.englishHTML }</td>
            </tr>`
        );

    }
}

//predicatesTable
const predicatesTable = document.getElementById("predicatesTable");

for (const letterGroup of Array.from(predicates.values())) {
    for (const processed of letterGroup) {
    
        refreshVariables();

        const set = processedToSet(processed, { components: false, logicHTML: true, englishHTML: true }).predicate();
        
        predicatesTable.innerHTML += (
            `<tr>
                <th>${ set.logicHTML }</th>
                <td>${ set.englishHTML }</td>
            </tr>`
        );

    }
}

//suppositionsTable
const suppositionsTable = document.getElementById("suppositionsTable");

for (const processed of suppositions) {
    
    refreshVariables();

    const set = processedToSet(processed, { components: false, logicHTML: true, englishHTML: true }).supposition();
    
    suppositionsTable.innerHTML += (
        `<tr>
            <th style = "flex-grow: 1; text-align: center; margin-bottom: -0.3vh;">${ set.logicHTML }</th>
        </tr><tr style = "border-top: none;">
            <td>${ set.englishHTML }</td>
        </tr>`
    );

}
