export class Pokemon {

    id: String = '';
    name: String = '';

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    toString(){
        return this.id+' '+this.name
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getAttributes(){
        return [{attribute:'id'},{attribute:'name'}];
    }
    
}
