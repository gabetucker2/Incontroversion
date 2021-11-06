//////////////
//SETUP DATA//
//////////////

for (const letter of Array.from({ length: 26 - 4 }, (_, i) => String.fromCharCode('a'.charCodeAt(0) + i))) {
    constants.set(letter, []);
}

for (const letter of Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i))) {
    predicates.set(letter, []);
}

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

setup().all();

//////////////////////////////
//Alter HTML event listeners//
//////////////////////////////

//disable all dragging
window.addEventListener("dragstart", function(event) {
    event.preventDefault();
}, false);
