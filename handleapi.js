

import fs from "fs";
// import apijs from './src/api/global.js';


//函数打开api.js 文件，然后
function openapijs(){
    //读取匹配export async function XXX(，将xxx放入对象，为{xxx:xxx,...}
    const apiContent = fs.readFileSync('./src/api/global.js', 'utf8');
    //将./src/api/global.js作为文本读取处理
    
    const apiObj = {};
    const apiArr = apiContent.match(/function (\w+)\(/g);
    apiArr.forEach(item => {
        const apiName = item.match(/function (\w+)\(/)[1];
        apiObj[apiName] = '';
        // apiObj[apiName] = apiName;
    })
    //将对象写入 apidoc.js文件中
    // const apiStr = JSON.stringify(apiObj);
    //需要json格式化
    const apiStr = JSON.stringify(apiObj, null, 4);
    // const apiPath = path.join(__dirname, '../src/api/apidoc.js');

    fs.writeFileSync('./src/api/apidoc.js', apiStr);
}

openapijs()


//请在package.json中添加命令： "type": "module",
//请在打包前调用命令： node handleapi.js