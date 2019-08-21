class BasicModel {
  
  constructor(_name) {
    if (!BasicModel.isValidName(_name)) {
      throw new Error("CANNOT INSTANTIATE: name must be a string - "+ _name);
    }

    this._name = _name;
    this._DB = {};
    this._nextID = 0;
  }
  get name() {
    return this._name;
  }
  get DB() {
    return JSON.parse(JSON.stringify(this._DB));
  }
  get activeIds() {
    const id_strings = Object.keys(this._DB);
    const id_numbers = id_strings.map(x => Number(x));
    return id_numbers;
  }

  // all return true or false
  static isValidName(name) {
    return typeof name === "string"
  }
  static isValidId(id) {
    return typeof id === "number"
  }
  static entryExists(id, DB) {
    return DB[id] !== undefined
  }
  static isAnObject(thing) { 
    let isObject = true;

    if (thing === null) { // it is null
      isObject = false; 

    } else if (typeof thing !== 'object') { // it's a primitive other than null
      isObject = false;

    } else if (thing instanceof Array) { // it is an array
      isObject = false;

    } else if (typeof thing === "function") { // it is a function
      isObject = false;

    };

    return isObject;
  }

  create(new_entry) { 
    if (!BasicModel.isAnObject(new_entry)) {
      throw new TypeError("CANNOT CREATE "+this._name+": entry is not an object - "+ new_entry);
    }

    const current_id = this._nextID;
    this._nextID++;

    const copy_to_save = JSON.parse(JSON.stringify(new_entry));
    copy_to_save._id = current_id;
    this._DB[current_id] = copy_to_save;
    const copy_to_return = JSON.parse(JSON.stringify(copy_to_save));
    return copy_to_return;
  }
  read(id) { 
    if (!BasicModel.isValidId(id)) {
      throw new TypeError("CANNOT READ "+this._name+": id must be a number - "+ id);
    }
    if (!BasicModel.entryExists(id, this._DB)) {
      throw new ReferenceError("CANNOT READ "+this._name+": no entry with id - "+ id);
    }

    const entry_by_id = this._DB[id];
    const entry_copy = JSON.parse(JSON.stringify(entry_by_id));
    return entry_copy;
  }
  update(id, new_entry) { 
    if (!BasicModel.isValidId(id)) {
      throw new TypeError("CANNOT UPDATE "+this._name+": id must be a number - "+ id);
    }
    if (!BasicModel.entryExists(id, this._DB)) {
      throw new ReferenceError("CANNOT UPDATE "+this._name+": no entry with id - "+ id);
    }
    if (!BasicModel.isAnObject(new_entry)) {
      throw new TypeError("CANNOT UPDATE "+this._name+": entry is not an object - "+ new_entry);
    }

    const old_entry = this._DB[id];

    const new_copy = JSON.parse(JSON.stringify(new_entry));
    new_copy._id = id;
    this._DB[id] = new_copy;
    
    return old_entry;
  }
  remove(id) { 
    if (!BasicModel.isValidId(id)) {
      throw new TypeError("CANNOT DELETE "+this._name+": id must be a number - "+ id);
    }
    if (!BasicModel.entryExists(id, this._DB)) {
      throw new ReferenceError("CANNOT DELETE "+this._name+": no entry with id - "+ id);
    };

    const deleted_item = this._DB[id];
    delete this._DB[id];
    return deleted_item;
  }

}
