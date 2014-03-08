//isNewLine.js
var text = document.getElementById('code').textContent;
// var start = 69;
// var end = 79;
var start = 24;
var end = 34;

var isNewLine = function(str, start, end){
  //check for a new line character before and after the select
    //if non-white space is found, then return false
  for(var i = end + 1; i < str.length; i++){
    var char = str[i];
    console.log(char);
    if(!(/\s/.test(char)))  //character is NOT a white space
      return false;
    if(/\n/.test(char)){  //new line found (good)
      debugger
      break;
    }
  }
  for(var j = start - 1 ; j >= 0; j--){
    var char = str[j];
    console.log(char);
    if(!(/\s/.test(char)))
      return false;  //return false bc character is NOT a white space
    if(/\n/.test(char)){
      debugger;
      break;
    }
  }
  return true
}

console.log(text);
console.log(text.match(/\r|\n/g).length);
var subStr = text.substring(start, end);
console.log(subStr);
console.log(isNewLine(text, start, text.length));
