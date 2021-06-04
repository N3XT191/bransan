let a = [
    { title: 'Skyward 3 Copyedit Review', percentage: 100 },
    { title: 'Wax & Wayne Book 4 (Mistborn 7)', percentage: 42 },
    {
        title: 'Sunreach (Skyward Novella 1) Final Draft',
        percentage: 100
    },
    { title: 'ReDawn (Skyward Novella 2) Draft 1.0', percentage: 72 }
]
let b = [
    { percentage: 100, title: 'Skyward 3 Copyedit Review' },
    {
        title: 'Sunreach (Skyward Novella 1) Final Draft',
        percentage: 100
    },
    { title: 'Wax & Wayne Book 4 (Mistborn 7)', percentage: 42 },
    { title: 'ReDawn (Skyward Novella 2) Draft 1.0', percentage: 72 }
]

const compare = function(a, b) {
    console.log(a);
    console.log(b)
    a.sort((x, y) => { 
        return x.percentage - y.percentage;
    });
    b.sort((x, y) => { 
        return x.percentage - y.percentage;
    });
    if (a.length != b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        if ((a[i].title !== b[i].title) || (a[i].percentage !== b[i].percentage)) {
            return false;
        } 
    }
    
    return true;
}

console.log(compare(a, b));
