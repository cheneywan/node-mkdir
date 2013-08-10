var fs = require('fs');
 
function mkdir(url,mode,cb){
    var arr = url.split("/");
    mode = mode || 0755;
    cb = cb || function(){};
    if(arr[0]==="."){//dispose: ./aa
        arr.shift();
    }
    if(arr[0] == ".."){//dispose: ../aa/bb
        arr.splice(0,2,arr[0]+"/"+arr[1])
    }
    function handle(cur){
        if(!fs.existsSync(cur)){//examine current directory
            fs.mkdirSync(cur, mode)
        }
        if(arr.length){
            arguments.callee(cur + "/"+arr.shift());//recursion
        }else{
            cb();
        }
    }
    arr.length && handle(arr.shift());
}

exports.mkdir = mkdir;
//test
mkdir('../aaaaa')