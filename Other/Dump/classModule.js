/**
 * Constant object initializer.
 * 
 * @param _letter
 *              char for letter to represent this variable; a - v
 * @param _singular
 *              string for singular object to which this variable refers
 * @param _plural
 *              string for plural object to which this variable refers
 * @updates this.phi = _phi
 * @requires the parameters match their defined requirements
 * @ensures this.phi is phi lowercase
 */
class Constant {
    constructor(_letter, _singular, _plural) {
        this.letter = _letter.toLowerCase();
        this.singular = _singular.toLowerCase();
        this.plural = _plural.toLowerCase();
    }
}

/**
 * Predicate object initializer.
 * 
 * @param _letter
 *              char for letter to represent this variable; A - Z
 * @param _sentence
 *              string for the predicate; to establish variables, write it like so:
 *              "{0} do not like {1} unless {2} like {3}" where variables are plural;
 *              must also be all lowercase unless universally mandated (e.g., do not write "I" as "i")
 * @param _constants
 *              array where i => Constant with which to substitute the respective predicate variable;
 *              i => null or _constants = null to set individual or all to a variable
 * @updates this.phi = _phi
 * @requires
 *              the parameters match their defined requirements;
 *              _constants must match the amount of {i} defined in _sentence
 * @ensures this.letter is _letter uppercase
 */
class Predicate {
    constructor(_letter, _sentence, _constants) {
        this.letter = _letter.toUpperCase();
        this.sentence = _sentence;
        this.constants = _constants;
    }
}

/**
 * Supposition object initializer.
 * 
 * @param _sentence
 *              string for the raw FOL of this supposition; to establish variables, write it like so:
 *              "(A{V0}){P0{V0}} -> {P1{C1}}";
 *              operators include: ~, &, v, ->, <->, <-, A, E
 *              additional characters include: (, )
 * @param _constants
 *              array of Constant for each {C?} in _sentence
 * @param _predicates
 *              array of Predicate for each {P?} in _sentence
 * @updates this.phi = _phi
 * @requires
 *              the parameter arrays are as long as their quantities in _sentence;
 *              _sentence is written in well-formed FOL
 * @ensures variables is set to an empty array of amount _variables; null becomes empty array in ReplaceAllForObject()
 */
class Supposition {
    constructor(_sentence, _constants, _predicates) {
        this.sentence = _sentence;
        this.constants = _constants;
        this.predicates = _predicates;
        this.variables = [];
        for (let i = 0; i < _sentence.split(`V`).length - 1; i++) {
            this.variables.push(null);
        }
    }
}
