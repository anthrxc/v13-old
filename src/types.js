function None(type) {
    this.type = type;
};
function Unique(type) {
    this.type = type;
    this.unique = true;
};
function Required(type) {
    this.type = type;
    this.required = true;
};
function Unireq(type) {
    this.type = type;
    this.unique = true;
    this.required = true;
};

module.exports = {
    string: {
        none: new None(String),
        unique: new Unique(String),
        required: new Required(String),
        unireq: new Unireq(String)
    },
    number: {
        none: new None(Number),
        unique: new Unique(Number),
        required: new Required(Number),
        unireq: new Unireq(Number)
    },
    boolean: {
        none: new None(Boolean),
        unique: new Unique(Boolean),
        required: new Required(Boolean),
        unireq: new Unireq(Boolean)
    }
};