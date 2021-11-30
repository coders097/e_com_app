"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// Variables
let __checkInitialization = false;
let stopWordsMap = {};
let app = null;
// Main Trie
class TrieNode {
    constructor(c, set) {
        this.c = c;
        this.set = set;
        this.children = [];
    }
}
TrieNode.addString = (root, str) => {
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
TrieNode.print_help_reccon = (root, str, numberArr, results) => {
    if (numberArr[0] == 0)
        return;
    str += root.c;
    if (root.set) {
        numberArr[0]--;
        // log(str);
        results.push(str);
    }
    Object.keys(root.children).forEach((key) => {
        TrieNode.print_help_reccon(root.children[key], str, numberArr, results);
    });
};
TrieNode.getRecommendations = (root, str, val, numberArr, results) => {
    if (val.length == 0) {
        if (str.length == 0)
            return;
        TrieNode.print_help_reccon(root, str.substring(0, str.length - 1), numberArr, results);
        return;
    }
    let key = val[0];
    if (root.children[key])
        TrieNode.getRecommendations(root.children[key], str + key, val.substring(1), numberArr, results);
};
;
let root = new TrieNode('#', false);
// Functions 
let checkInit = () => {
    if (__checkInitialization) {
        return true;
    }
    else {
        console.log("PLEASE INIT AUTOCOMPLETE FIRST!");
        return;
    }
};
let loadStopWordsMap = () => {
    let stopwords = fs_1.default.readFileSync(__dirname + '\\stopwords.txt', 'utf-8');
    let temp = "";
    for (let i = 0; i < stopwords.length; i++)
        if (stopwords[i] === '\r') {
        }
        else if (stopwords[i] === '\n') {
            temp += " ";
        }
        else
            temp += stopwords[i];
    stopwords = temp;
    stopwords = stopwords.split(" ");
    stopwords.forEach(word => stopWordsMap[word] = true);
};
let loadInitialDataProvidedToTrie = (string = "") => {
    string = string.split(" ");
    string = string.map(word => word.trim().toLowerCase());
    string = string.filter(word => !stopWordsMap[word] === true);
    string.forEach(word => (word.length > 1) ? TrieNode.addString(root, word) : null);
};
let init = (_app, valueString) => {
    __checkInitialization = true;
    app = _app;
    loadStopWordsMap();
    loadInitialDataProvidedToTrie(valueString);
    // Creating Routes
    app.get("/getRecommendations", (req, res) => {
        let { key, no } = req.query;
        if (!key) {
            res.status(404).json({
                success: false,
                error: "Search Key not present"
            });
            return;
        }
        if (no == null)
            no = '15';
        let results = [];
        TrieNode.getRecommendations(root, "", key, [parseInt(no)], results);
        res.status(200).json({
            success: true,
            data: results
        });
    });
};
let addWordToTrie = (word) => {
    checkInit();
    TrieNode.addString(root, word);
};
exports.default = {
    init, addWordToTrie
};
