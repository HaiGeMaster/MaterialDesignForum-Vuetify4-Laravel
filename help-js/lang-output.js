







//请在打包前调用命令： node lang-output.js
//生成的文件在public/language/目录下，供php调用
//请在package.json中添加命令：
// "type": "module",

//Please call the command before packaging: node lang-output.js
//The generated file is in the public/language/ directory for php to call
//Please add the command in package.json: "type": "module",

// var phpDataFolder = './public/src/Language/json/pack/';//php语言包目录
// var jsDataFolder = './src/assets/language/';//js语言包目录
import fs from "fs";
import localization from "./src/assets/language/localization.js";//引入localization.js
// import localization from "./newlang.js";//引入localization.js
//localization = JSON.stringify(localization, null, 0);

var a = localization//JSON.parse(fs.readFileSync("./public/src/Language/json/language.json", "utf8"));
var b = '';
var c = [];//保存语言代码

var d = 0;
Object.keys(a).forEach((key) => {

  fs.writeFileSync(
    // `./public/public/locale/json/${key}.json`,
    `../MaterialDesignForum-Server/public/locale/json/${key}.json`,
    JSON.stringify(a[key], null, 0),
    "utf8"
  );//写出php调用的语言包
  

  // fs.writeFileSync(
  //   `./src/assets/language/${key}.js`,
  //   `export default${JSON.stringify(a[key], null, 0)}`,
  //   "utf8"
  // );//写出js调用的js语言包



  // 写出完整的还是简介的语言包
  
  //   fs.writeFileSync(
  //     `../MaterialDesignForum-Vuetify3/src/locales/${key}.json`,
  //     `${JSON.stringify(a[key], null, 0)}`,
  //     "utf8"
  // );//写出js调用的 完整json语言包 到../MaterialDesignForum-Vuetify3
  
  //7
  // if(d==0||d==1){//写出中文和英文的语言包
  if(d==1){//写出中文和英文的语言包
  // if(1){
    fs.writeFileSync(
      `./src/assets/language/${key}.js`,
      `export default${JSON.stringify(a[key], null, 0)}`,
      "utf8"
    );//写出js调用的 完整js语言包 到本项目
    fs.writeFileSync(
      `../MaterialDesignForum-MDUI2/src/assets/language/${key}.js`,
      `export default${JSON.stringify(a[key], null, 0)}`,
      "utf8"
    );//写出js调用的 完整js语言包 到../MaterialDesignForum-MDUI2
    fs.writeFileSync(
      `../MaterialDesignForum-Vuetify2/src/assets/language/${key}.js`,
      `export default${JSON.stringify(a[key], null, 0)}`,
      "utf8"
    );//写出js调用的 完整js语言包 到../MaterialDesignForum-Vuetify2
  }else{
    const langInfo = {
      Message:{
        langInfo:a[key]['Message']['langInfo']
      }
    }
    fs.writeFileSync(
      `./src/assets/language/${key}.js`,
      `export default${JSON.stringify(langInfo, null, 0)}`,
      "utf8"
    );//写出js调用的 js语言简介包 到本项目
    fs.writeFileSync(
      `../MaterialDesignForum-MDUI2/src/assets/language/${key}.js`,
      `export default${JSON.stringify(langInfo, null, 0)}`,
      "utf8"
    );//写出js调用的 js语言简介包 到../MaterialDesignForum-MDUI2
    fs.writeFileSync(
      `../MaterialDesignForum-Vuetify2/src/assets/language/${key}.js`,
      `export default${JSON.stringify(langInfo, null, 0)}`,
      "utf8"
    );//写出js调用的 js语言简介包 到../MaterialDesignForum-Vuetify2
  }



  d++;
  

  if (fs.existsSync(`./src/assets/language/${key}.js`)) {
    console.log(`JS语言简介包写出成功: ./src/assets/language/${key}.js`);
  }//判断是否写出成功 到本项目

  if (fs.existsSync(`../MaterialDesignForum-MDUI2/src/assets/language/${key}.js`)) {
    console.log(`JS语言简介包写出成功: ../MaterialDesignForum-MDUI2/src/assets/language/${key}.js`);
  }//判断是否写出成功 到../MaterialDesignForum-MDUI2

  if (fs.existsSync(`../MaterialDesignForum-Vuetify2/src/assets/language/${key}.json`)) {
    console.log(`JS语言简介包写出成功: ../MaterialDesignForum-Vuetify2/src/assets/language/${key}.json`);
  }//判断是否写出成功 到../MaterialDesignForum-Vuetify2

  if (fs.existsSync(`../MaterialDesignForum-Server/public/locale/json/${key}.json`)) {
    console.log(`PHP语言包写出成功: ./public/public/locale/json/${key}.json`);
  }//判断是否写出成功



  // fs.writeFileSync(
  //   `./src/assets/language/${key}.json`,
  //   `${JSON.stringify(a[key], null, 0)}`,
  //   "utf8"
  // );//写出js调用的json语言包

  

  b = b + `import ${key} from './${key}.js';\n`;
  // b = b + `const ${key} = () => import('./${key}.js');\n`;

  // node lang-output.js


  //b = b + `import ${key.replace('_','')} from './${key}.js';\n`;
  c.push(key);
  //c.push(`"${key}":import("./${key}.js")`);
  ///c.push(`${key}:require("@/assets/language/${key}.js")`);
});

fs.writeFileSync(
  `./src/assets/language/language.js`,
  //`export default{${c.join(",")}}`,
  `${b}export default{${c.join(",")}}`,
  ///`export default{${c.join(",")}}`,
  "utf8"
);//写出js语言引用js 到本项目

fs.writeFileSync(
  `../MaterialDesignForum-MDUI2/src/assets/language/language.js`,
  //`export default{${c.join(",")}}`,
  `${b}export default{${c.join(",")}}`,
  ///`export default{${c.join(",")}}`,
  "utf8"
);//写出js语言引用js 到../MaterialDesignForum-MDUI2

fs.writeFileSync(
  `../MaterialDesignForum-Vuetify2/src/assets/language/language.js`,
  //`export default{${c.join(",")}}`,
  `${b}export default{${c.join(",")}}`,
  ///`export default{${c.join(",")}}`,
  "utf8"
);//写出js语言引用js 到../MaterialDesignForum-Vuetify2

// fs.writeFileSync(
//   "./public/src/Language/json/languagelist.json",
//   JSON.stringify(c, null, 0), 
//   "utf8"
// );//写出php语言列表


// //fs.writeFileSync("./public/src/Language/json/language.json", localization, "utf8");
// // if (localization) {
// //   console.log("Language output completed:language.json");
  
// // }
