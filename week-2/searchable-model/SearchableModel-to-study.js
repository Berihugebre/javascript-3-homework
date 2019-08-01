// broadens the BasicModel's functionality
class SearchableModel extends BasicModel {

  constructor(_name) {
    super(_name);
  }

  // notice this: the static methods are all pure functions! no "this"

  // this method works, you just need to use it
  static entriesMatch(obj1, obj2) { 
    // try adding your own error handling in here!
    //  are they both objects?

    const obj1_keys = Object.keys(obj1);
    const obj2_keys = Object.keys(obj2);
    if (obj1_keys.length !== obj2_keys.length) {
      return false;
    };

    let they_match = true;
    for (const key in obj1) {
      if ( obj1[key] !== obj2[key] ) {
        they_match = false;
        break;
      }
    }

    return they_match;
  }

  // this method works, you just need to use it
  static entryArraysMatch(arr1, arr2) {
    // try adding your own error handling in here!
    //  are they both arrays of objects?

    if (arr1.length !== arr2.length) {
      return false; 
    }

    const arr1_obj = {};
    for (const entry of arr1) {
      arr1_obj[entry._id] = entry;
    }

    const arr2_obj = {};
    for (const entry of arr2) {
      arr2_obj[entry._id] = entry;
    }

    let they_match = true;
    for (const key in arr1_obj) {
      if ( !SearchableModel.entriesMatch(arr1_obj[key], arr2_obj[key]) ) {
        they_match = false;
        break;
      }
    }
    
    return they_match;
  }

  static valuesMatch(x, y) {
    // this method assumes all values are primitives
    //  challenge: rewrite it to compare any type!

    if ( x !== x ) {    // are they both NaN?
      return y !== y;
    } else {            // are they matching not-NaNs?
      return x === y;
    };
  }

  static removeEntryId(entryObj) {
    // write some type checking if you've got the time

    const copy = JSON.parse(JSON.stringify(entryObj));
    delete copy._id;
    return copy;
  }

  get allEntries() {
    const all_in_array = [];
    const DB = this.DB;
    for (let key in DB) {
      all_in_array.push(DB[key]);
    }
    return all_in_array;
  }

  static isValidKey(key) {
    return typeof key === "string";
  }

  verifyEntry(findMe) {
    if (!BasicModel.isAnObject(findMe)) {
      throw new TypeError("can only verify objects")
    }

    let is_in = false;
    for (let entry of this.allEntries) {
      if (SearchableModel.entriesMatch(entry, findMe)) {
        is_in = true;
        break;
      }
    }

    return is_in;
  }

  findOneKeyValue(key, value) {
    if (!SearchableModel.isValidKey(key)) {
      throw new TypeError("key is not a string");
    }

    let found = null;
    for (const entry of this.allEntries) {
      if ( SearchableModel.valuesMatch(entry[key], value) ) {
        found = entry;
        break;
      }
    }

    return found;
  }

  findAllKeyValue(key, value) {
    if (!SearchableModel.isValidKey(key)) {
      throw new TypeError("key is not a string");
    }

    let found = [];
    for (const entry of this.allEntries) {
      if ( SearchableModel.valuesMatch(entry[key], value) ) {
        found.push(entry);
      }
    }

    return found;
  }

  findOneMatching(findMe) {
    if (!BasicModel.isAnObject(findMe)) {
      throw new TypeError("argument is not an object");
    }

    const cleanFindMe = SearchableModel.removeEntryId(findMe);
    let found = null;
    for (const entry of this.allEntries) {
      const cleanEntry = SearchableModel.removeEntryId(entry);
      if ( SearchableModel.entriesMatch(cleanEntry, cleanFindMe) ) {
        found = entry;
        break;
      }
    }

    return found;
  }
 
  findAllMatching(findMe) {
    if (!BasicModel.isAnObject(findMe)) {
      throw new TypeError("argument is not an object");
    }

    const cleanFindMe = SearchableModel.removeEntryId(findMe);
    let found = [];
    for (const entry of this.allEntries) {
      const cleanEntry = SearchableModel.removeEntryId(entry);
      if ( SearchableModel.entriesMatch(cleanEntry, cleanFindMe) ) {
        found.push(entry);
      }
    }

    return found;
  }

  // --- !! challenge !! ---
  //      sorry, no help here :(

  static isValidQuery(query) {
    // check if the arg is an array of objects
    // you do not need to look inside the objects
      // that will happen in the findByQuery method after calling this check
    // do not modify the query!
    // return true or false
  }

  findByQuery(query) {
    // make sure the query is an array of objects
      // instanceof will be helpful to check if query is an array
      // and BasicModel.isAnObject will helpful for checking it contains objects
    // return an array of copies of all entries matching the query

    /* more info:
      write a method that searches for entries matching multiple criteria
      all criteria must match in order for an object to be returned
      criteria are defined as a an array of objects like this:
        [ 
          {key: {value: "a value", matches: Boolean}}, 
          {key: {value: "a value", matches: Boolean}}, 
        ]
      you can look for positive and negative results
      {chair: {value: "wood", matches: false}}
        indicates all entries without a property chair: "wood"
      {table: {value: "metal", matches: true}}
        indicates all entries with a property table: "metal"
      [
        {chair: {value: "wood", matches: false}},
        {table: {value: "metal", matches: true}}
      ]
        indicates all properties without a wood chair and with a metal table
      if no such properties exist, you can simply return an empty array
    */
  }

}