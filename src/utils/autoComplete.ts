// Imports
import express from 'express';
import path from 'path';
import fs from 'fs';


// Variables
let __checkInitialization=false;
let stopWordsMap:any={};
let app:any=null;



// Main Trie
class TrieNode{
    set: boolean;
    c:string;
    children:TrieNode[]
    constructor(c:string, set:boolean) {
        this.c = c;
        this.set = set;
        this.children = [];
    }
    static addString = (root:TrieNode , str:any)=>{
        if (str.length == 1) {
            if (root.children[str])
                root.children[str].set = true;
            else
                root.children[str] = new TrieNode(str, true);
            return;
        }
        if (!root.children[str[0]])
            root.children[str[0]] = new TrieNode(str[0], false);
        TrieNode.addString(root.children[str[0]], str.substring(1));
    };
    static print_help_reccon = (root:TrieNode,str:any,numberArr:any,results:any)=>{
        if(numberArr[0]==0) return;
        str+=root.c;
        if(root.set){
            numberArr[0]--;
            // log(str);
            results.push(str);
        }
        Object.keys(root.children).forEach((key:any)=>{
            TrieNode.print_help_reccon(root.children[key], str,numberArr,results);
        });
    };
    static getRecommendations = (root:TrieNode,str:any,val:any,numberArr:any,results:any)=>{
        if(val.length==0) {
            if(str.length==0) return;
            TrieNode.print_help_reccon(root,str.substring(0,str.length-1),numberArr,results);
            return;
        }
        let key=val[0];
        if(root.children[key]) TrieNode.getRecommendations(root.children[key],str+key,val.substring(1),numberArr,results);
    };
};


let root=new TrieNode('#', false);

// Functions 
let checkInit=()=>{
    if(__checkInitialization){
        return true;
    }else {
        console.log("PLEASE INIT AUTOCOMPLETE FIRST!");
        return;
    }
}
let loadStopWordsMap=()=>{
    let stopwords:(string | string[])=fs.readFileSync(__dirname+'\\stopwords.txt','utf-8');
    let temp="";
    for(let i=0;i<stopwords.length;i++)
        if(stopwords[i]==='\r'){
        }else if(stopwords[i]==='\n'){
            temp+=" ";
        } else temp+=stopwords[i];
    stopwords=temp;
    stopwords=stopwords.split(" ");
    stopwords.forEach(word=>stopWordsMap[word]=true);
}
let loadInitialDataProvidedToTrie=(string:(string | string[])="")=>{
    string=(string as string).split(" ");
    string=string.map(word=>word.trim().toLowerCase());
    string=string.filter(word=>!stopWordsMap[word]===true);
    string.forEach(word=>(word.length>1)?TrieNode.addString(root,word):null);
}

let init=(_app:any,valueString:string)=>{
    __checkInitialization=true;
    app=_app;
    loadStopWordsMap();
    loadInitialDataProvidedToTrie(valueString);

    // Creating Routes
    app.get("/getRecommendations",(req:express.Request,res:express.Response)=>{
        let {key,no}=req.query;
        if(!key){
            res.status(404).json({
                success:false,
                error:"Search Key not present"
            });
            return;
        }
        if(no==null) no='15';
        let results:string[]=[];
        TrieNode.getRecommendations(root,"",key,[parseInt(no as string)],results);
        res.status(200).json({
            success:true,
            data:results
        });
    });
}
let addWordToTrie=(word:string)=>{
    checkInit();
    TrieNode.addString(root,word);
}


export default {
    init,addWordToTrie
};


