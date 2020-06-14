class Test {
    #name
    morename
    constructor(v) {
        this.#name = v
    }
    // start custome propery
    get name() {
        return this.#name;
    }
    set name(v) {
        this.#name = v

    }
    //end  custome propery

    getInfo() {
        return "Lala";
    }
}

var nn = new Test("Pick");

console.log(nn.name)
nn.name = "Danny"
console.log(nn.name)
nn.