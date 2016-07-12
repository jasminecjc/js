//数组拷贝

//浅复制，双向改变,指向同一片内存空间
let arr = [1, 2, 3];
let arr1 = arr;
arr1[1] = 'test';
console.log('shallow copy: ' + arr + " " + arr1);

//深复制，开辟新的内存区

//方法一：slice,原理：slice返回一个新数组
let deepArr = [1, 2, 3];
let deepArr1 = deepArr.slice(0);
deepArr1[1] = 'test';
console.log('deep copy: ' + deepArr + " " + deepArr1);

//方法二：concat，原理：concat返回一个新数组
let deepArr2 = [1, 2, 3];
let deepArr3 = deepArr2.concat();
deepArr3[1] = 'test';
console.log('deep copy: ' + deepArr2 + " " + deepArr3);

//知乎看到的深复制方法，这个函数可以深拷贝 对象和数组
deepCloneObj = obj => {
    let str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object') {
        return;
    }else if(JSON) {
        /*
        好处是非常简单易用，但是坏处也显而易见，这会抛弃对象的constructor，
        也就是深复制之后，无论这个对象原本的构造函数是什么，在深复制之后都会变成Object。另外诸如RegExp对象是无法通过这种方式深复制的。
        */
        str = JSON.stringify(obj);
        newobj = JSON.parse(str);
    }else {
        for(let i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? deepCloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
}

let deepArr4 = {
    a: 1,
    b: 'test',
    c: [1, 2, 3],
    d: {
        'a': 'd:a',
        'b': 'd:b'
    }
}
deepArr5 = deepCloneObj(deepArr4);
deepArr5['a'] = 'testa';
console.log('deep copy: ' + JSON.stringify(deepArr4) + " " + JSON.stringify(deepArr5));
