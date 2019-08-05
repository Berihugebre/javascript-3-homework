Understanding [reference vs. value](https://github.com/janke-learning/reference-vs-value) is critical to mastering asynchronous JavaScript. As you begin to use API's, promises and callbacks you will be updating application data by reference ("side effects").  API calls can't return values!

> paste [this markdown of exercises](https://raw.githubusercontent.com/janke-learning/function-exercises/master/reference-type-arguments.md) into this file and complete the exercises 
# Reference Type Arguments

When reference types (ie. arrays, objects) are passed as arguments to a function JavaScript simply passes a pointer to the thing in memory.  If you modify a data structure that was passed as an argument, the changes will remain in the global scope after the frame has closed.  This is a _side effect_.

These examples and exercises will help you understand _side effects_ and how to avoid them.

### Index:
* examples to study
    * [side effects with return value](#with-return-value)
    * [side effects without return value](#without-return-value)
    * [comparing objects & arrays](#comparing-objects-and-arrays)
    * [avoid S.E.'s by starting a new one](#by-starting-a-new-one)
    * [avoid S.E.'s by making a copy](#by-making-a-copy)
* exercises
    * [copy an array](#copy-an-array)
    * [start a new array](#start-a-new-array)
    * [copy an object](#copy-an-object)
    * [start a new object](#start-a-new-object)


---

## Examples to Study

## Side Effects

### with return value
[on pytut](http://www.pythontutor.com/live.html#code=function%20no_side_effects%28param%29%20%7B%0A%20%20return%20%22%22%20%2B%20param%3B%0A%7D%0A%0Aconst%20arg%20%3D%203%3B%0Aconst%20ret_val%20%3D%20no_side_effects%28arg%29%3B%0A%0A//%20----%0A%0Afunction%20side_effector%28ref_type,%20key%29%20%7B%0A%20%20ref_type%5Bkey%5D%20%3D%20'side%20effect!'%3B%0A%20%20return%20ref_type%3B%0A%7D%0A%0Aconst%20arr%20%3D%20%5B'a'%5D%3B%0Aconst%20arr_ret_val%20%3D%20side_effector%28arr,%201%29%3B%0Aconsole.assert%28arr%5B1%5D%20%3D%3D%3D%20arr_ret_val%5B1%5D%29%3B%0A%0A%0Aconst%20obj%20%3D%20%7Ba%3A%201%7D%3B%0Aconst%20obj_ret_val%20%3D%20side_effector%28obj,%20'b'%29%3B%0Aconsole.assert%28obj.b%20%3D%3D%3D%20obj_ret_val.b%29%3B&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false)
```js
{
   function no_side_effects(param) {
     return "" + param;
   }

   const arg = 3;
   const ret_val = no_side_effects(arg);

   // ----

   function side_effector(ref_type, key) {
     ref_type[key] = 'side effect!';
     return ref_type;
   }

   const arr = ['a'];
   const arr_ret_val = side_effector(arr, 1);
   console.assert(arr[1] === arr_ret_val[1]);


   const obj = {a: 1};
   const obj_ret_val = side_effector(obj, 'b');
   console.assert(obj.b === obj_ret_val.b);
}
```


### without return value   
[on pytut](http://www.pythontutor.com/live.html#code=function%20no_side_effects%28param%29%20%7B%0A%20%20const%20result%20%3D%20%22%22%20%2B%20param%3B%0A%7D%0A%0Aconst%20arg%20%3D%203%3B%0Ano_side_effects%28arg%29%3B%0A%0A%0A//%20---%0A%0Afunction%20side_effector%28ref_type,%20key%29%20%7B%0A%20%20ref_type%5Bkey%5D%20%3D%20'side%20effect!'%3B%0A%7D%0A%0Aconst%20arr%20%3D%20%5B'a'%5D%3B%0Aside_effector%28arr,%201%29%3B%0Aconsole.assert%28arr%5B1%5D%20%3D%3D%3D%20'side%20effect!'%29%3B%0A%0A%0Aconst%20obj%20%3D%20%7Ba%3A%201%7D%3B%0Aside_effector%28obj,%20'b'%29%3B%0Aconsole.assert%28obj.b%20%3D%3D%3D%20'side%20effect!'%29%3B&cumulative=false&curInstr=11&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false)
```js
{
   function no_side_effects(param) {
     const result = "" + param;
   }

   const arg = 3;
   no_side_effects(arg);


   // ---

   function side_effector(ref_type, key) {
     ref_type[key] = 'side effect!';
   }

   const arr = ['a'];
   side_effector(arr, 1);
   console.assert(arr[1] === 'side effect!');


   const obj = {a: 1};
   side_effector(obj, 'b');
   console.assert(obj.b === 'side effect!');
}
```

## Comparing Objects and Arrays

[on pytut](http://www.pythontutor.com/live.html#code=const%20arr_1%20%3D%20%5B3,2,1%5D%3B%0Aconst%20arr_2%20%3D%20%5B3,2,1%5D%3B%0A%0Aconst%20arr_1_stringified%20%3D%20JSON.stringify%28arr_1%29%3B%0Aconst%20arr_2_stringified%20%3D%20JSON.stringify%28arr_2%29%3B%0A%0Aconsole.assert%28arr_1%20%3D%3D%3D%20arr_2%29%3B%0Aconsole.assert%28arr_1_stringified%20%3D%3D%3D%20arr_2_stringified%29%3B%0A%0A%0Aconst%20obj_1%20%3D%20%7Ba%3A3,b%3A2,c%3A1%7D%3B%0Aconst%20obj_2%20%3D%20%7Ba%3A3,b%3A2,c%3A1%7D%3B%0A%0Aconst%20obj_1_stringified%20%3D%20JSON.stringify%28obj_1%29%3B%0Aconst%20obj_2_stringified%20%3D%20JSON.stringify%28obj_2%29%3B%0A%0Aconsole.assert%28obj_1%20%3D%3D%3D%20obj_2%29%3B%0Aconsole.assert%28obj_1_stringified%20%3D%3D%3D%20obj_2_stringified%29%3B&cumulative=false&curInstr=5&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false)
```js
{
  const arr_1 = [3,2,1];
  const arr_2 = [3,2,1];

  const arr_1_stringified = JSON.stringify(arr_1);
  const arr_2_stringified = JSON.stringify(arr_2);

  console.assert(arr_1 === arr_2);
  console.assert(arr_1_stringified === arr_2_stringified);


  const obj_1 = {a:3,b:2,c:1};
  const obj_2 = {a:3,b:2,c:1};

  const obj_1_stringified = JSON.stringify(obj_1);
  const obj_2_stringified = JSON.stringify(obj_2);

  console.assert(obj_1 === obj_2);
  console.assert(obj_1_stringified === obj_2_stringified);
}
```

[TOP](#reference-type-arguments)

---

## Avoid Side Effects

### by starting a new one

preferred method, the logic is usually much simpler to follow.  
[on pytut](http://www.pythontutor.com/live.html#code=//%20make%20a%20new%20empty%20array%0A//%20fill%20it%20with%20the%20new,%20correct,%20values%0Afunction%20reverse_a_new_one%28arr%29%20%7B%0A%20%20var%20new_arr%20%3D%20%5B%5D%3B%0A%20%20for%20%28let%20i%20%3D%20arr.length%20-%201%3B%20i%20%3E%3D%200%3B%20i--%29%20%7B%0A%20%20%20%20new_arr.push%28arr%5Bi%5D%29%3B%0A%20%20%7D%0A%20%20return%20new_arr%3B%0A%7D%0A%0Aconst%20backwards_1%20%3D%20%5B3,%202,%201%5D%3B%0Aconst%20reversed_1%20%3D%20reverse_a_new_one%28backwards_1%29%3B%0A%0Aconst%20reversed_strified_1%20%3D%20JSON.stringify%28reversed_1%29%3B%0Aconsole.assert%28reversed_strified_1%20%3D%3D%3D%20'%5B1,2,3%5D'%29%3B%0A%0Aconst%20backwards_2%20%3D%20%5B%22c%22,%20%22b%22,%20%22a%22%5D%3B%0Aconst%20reversed_2%20%3D%20reverse_a_new_one%28backwards_2%29%3B%0A%0Aconst%20reversed_strified_2%20%3D%20JSON.stringify%28reversed_2%29%3B%0Aconsole.assert%28reversed_strified_2%20%3D%3D%3D%20'%5B%22a%22,%22b%22,%22c%22%5D'%29%3B&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false)  
```js
{
  // make a new empty array
  // fill it with the new, correct values
  function reverse_a_new_one(arr) {
    var new_arr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      new_arr.push(arr[i]);
    }
    return new_arr;
  }

  const backwards_1 = [3, 2, 1];
  const reversed_1 = reverse_a_new_one(backwards_1);

  const reversed_strified_1 = JSON.stringify(reversed_1);
  console.assert(reversed_strified_1 === '[1,2,3]');
  
  const backwards_2 = ["c", "b", "a"];
  const reversed_2 = reverse_a_new_one(backwards_2);

  const reversed_strified_2 = JSON.stringify(reversed_2);
  console.assert(reversed_strified_2 === '["a","b","c"]');
}
```

### by making a copy
 
not the best choice, it can be much more difficult to think about and debug.   
[on pytut](http://www.pythontutor.com/live.html#code=%20%20//%20make%20a%20copy%20of%20the%20argument%0A%20%20//%20modify%20it%20direclty%0A%20%20function%20reverse_a_new_one%28arr%29%20%7B%0A%20%20%20%20var%20arr_strified%20%3D%20JSON.stringify%28arr%29%3B%0A%20%20%20%20var%20copy%20%3D%20JSON.parse%28arr_strified%29%3B%0A%20%20%20%20var%20last_index%20%3D%20copy.length%20-%201%0A%20%20%20%20for%20%28let%20i%20%3D%20last_index%3B%20i%20%3E%3D%20last_index%20/%202%3B%20i--%29%20%7B%0A%20%20%20%20%20%20const%20temp%20%3D%20copy%5Bi%5D%3B%0A%20%20%20%20%20%20copy%5Bi%5D%20%3D%20copy%5Blast_index%20-%20i%5D%3B%0A%20%20%20%20%20%20copy%5Blast_index%20-%20i%5D%20%3D%20temp%3B%0A%20%20%20%20%7D%0A%20%20%20%20return%20copy%3B%0A%20%20%7D%0A%0A%20%20const%20backwards_1%20%3D%20%5B3,%202,%201%5D%3B%0A%20%20const%20reversed_1%20%3D%20reverse_a_new_one%28backwards_1%29%3B%0A%0A%20%20const%20reversed_strified_1%20%3D%20JSON.stringify%28reversed_1%29%3B%0A%20%20console.assert%28reversed_strified_1%20%3D%3D%3D%20'%5B1,2,3%5D'%29%3B%0A%20%20%0A%20%20const%20backwards_2%20%3D%20%5B%22c%22,%20%22b%22,%20%22a%22%5D%3B%0A%20%20const%20reversed_2%20%3D%20reverse_a_new_one%28backwards_2%29%3B%0A%0A%20%20const%20reversed_strified_2%20%3D%20JSON.stringify%28reversed_2%29%3B%0A%20%20console.assert%28reversed_strified_2%20%3D%3D%3D%20'%5B%22a%22,%22b%22,%22c%22%5D'%29%3B&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false)
```js
{
  // make a copy of the argument
  // modify it direclty
  function reverse_a_new_one(arr) {
    var arr_strified = JSON.stringify(arr);
    var copy = JSON.parse(arr_strified);
    var last_index = copy.length - 1
    for (let i = last_index; i >= last_index / 2; i--) {
      const temp = copy[i];
      copy[i] = copy[last_index - i];
      copy[last_index - i] = temp;
    }
    return copy;
  }

  const backwards_1 = [3, 2, 1];
  const reversed_1 = reverse_a_new_one(backwards_1);

  const reversed_strified_1 = JSON.stringify(reversed_1);
  console.assert(reversed_strified_1 === '[1,2,3]');
  
  const backwards_2 = ["c", "b", "a"];
  const reversed_2 = reverse_a_new_one(backwards_2);

  const reversed_strified_2 = JSON.stringify(reversed_2);
  console.assert(reversed_strified_2 === '["a","b","c"]');
}
```

[TOP](#reference-type-arguments)

---

## Exercises

### copy an array

[on pytut](http://www.pythontutor.com/live.html#code=&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false)
```js
{
  function copy_array(arr) {
    // write this
  }

  const array = ['a', 'b'];
  const by_copy = copy_array(array);
  console.assert(array[0] === by_copy[0]);
  console.assert(array[1] === by_copy[1]);
  console.assert(array !== by_copy);
  
  const array_2 = [3, 'b', null];
  const by_copy_2 = copy_array(array_2);
  console.assert(array_2[0] === by_copy_2[0]);
  console.assert(array_2[1] === by_copy_2[1]);
  console.assert(array_2 !== by_copy_2);
     
}
```


### start a new array

[on pytut](http://www.pythontutor.com/live.html#code=&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false)
```js
{
  function start_new_array(arr) {
    // write this by building a new array from scratch
    // the paramenter should only be used on the right side of =
    // the new one should only be used on the left side of =
  }

  const array = ['a', 'b'];
  const new_array = start_new_array(array);
  console.assert(array[0] === new_array[0]);
  console.assert(array[1] === new_array[1]);
  console.assert(array !== new_array);
  
  const array_2 = [3, 'b', null];
  const new_array_2 = start_new_array(array_2);
  console.assert(array_2[0] === new_array_2[0]);
  console.assert(array_2[1] === new_array_2[1]);
  console.assert(array_2[2] === new_array_2[2]);
  console.assert(array_2 !== new_array_2);
}
```

### copy an object

[on pytut](http://www.pythontutor.com/live.html#code=&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false)
```js
{
  function copy_object(obj) {
    // write this
  }

  const object = {a: 1, b: 2};
  const by_copy = copy_object(object);
  console.assert(object.a === by_copy.a);
  console.assert(object['b'] === by_copy['b']);
  console.assert(object !== by_copy);
  
  const object_2 = {x: 3, z: null, it: "ti"};
  const by_copy_2 = copy_object(object_2);
  console.assert(object_2.x === by_copy_2.x);
  console.assert(object_2['z'] === by_copy_2['z']);
  console.assert(object_2['it'] === by_copy_2.ti);
  console.assert(object_2 !== by_copy_2);
}
```


### start a new object

[on pytut](http://www.pythontutor.com/live.html#code=&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false)
```js
{
  function start_new_object(obj) {
    // write this by building a new object from scratch
    // the paramenter should only be used on the right side of =
    // the new one should only be used on the left side of =
  } 
  
  const object = {a: 1, b: 2};
  const new_obj = start_new_object(object);
  console.assert(object.a === new_obj.a);
  console.assert(object['b'] === new_obj['b']);
  console.assert(object !== new_obj);
  
  const object_2 = {x: 3, z: null, it: "ti"};
  const new_obj_2 = start_new_object(object_2);
  console.assert(object_2.x === new_obj_2.x);
  console.assert(object_2['z'] === new_obj_2['z']);
  console.assert(object_2['it'] === new_obj_2.ti);
  console.assert(object_2 !== new_obj_2);
}
```



[TOP](#reference-type-arguments)

___
___
### <a href="http://janke-learning.org" target="_blank"><img src="https://user-images.githubusercontent.com/18554853/50098409-22575780-021c-11e9-99e1-962787adaded.png" width="40" height="40"></img> Janke Learning</a>

