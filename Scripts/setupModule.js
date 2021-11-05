//////////////
//SETUP DATA//
//////////////

globalSetup();

//bidirectional operations: `text {antecedent} text{consequent}`
symbols.set(`conjunction`, {logicHTML: `∧`, englishHTML: {antecedent: null, consequent: ` and`}});
symbols.set(`disjunction`, {logicHTML: `∨`, englishHTML: {antecedent: null, consequent: ` or`}});
symbols.set(`conditional`, {logicHTML: `⇒`, englishHTML: {antecedent: `if`, consequent: `, then`}});
symbols.set(`revconditional`, {logicHTML: `⇐`, englishHTML: {antecedent: null, consequent: ` only if`}});
symbols.set(`biconditional`, {logicHTML: `≡`, englishHTML: {antecedent: null, consequent: ` if and only if`}});
symbols.set(`xdisjunction`, {logicHTML: `⊕`, englishHTML: {antecedent: `either`, consequent: ` or`}});

//unidirectional operations
symbols.set(`negation`, {logicHTML: `¬`, englishHTML: `it is not the case that`});

//quantifiers
symbols.set(`universal`, {logicHTML: `∀`, englishHTML: `for all`});
symbols.set(`existential`, {logicHTML: `Ǝ`, englishHTML: `for some`});

//////////////////////////////
//Alter HTML event listeners//
//////////////////////////////

//disable all dragging
window.addEventListener("dragstart", function(event) {
    event.preventDefault();
}, false);
