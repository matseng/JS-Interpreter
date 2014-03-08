//myController.js

var myInterpreter;
function initAlert(interpreter, scope) {
  var wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(alert(text));
  };
  interpreter.setProperty(scope, 'alert',
      interpreter.createNativeFunction(wrapper));
};

function parseButton() {
  var code = document.getElementById('code').value
  myInterpreter = new Interpreter(code, initAlert);
  disable('');
}

function biggerStepButton() {
  if (myInterpreter.stateStack[0]) {
    var node = myInterpreter.stateStack[0].node;
    var start = node.start;
    var end = node.end;

/* completED statement if the completeStatement has been saved in the global object
    if (!myInterpreter.completedStatement){
      myInterpreter.completedStatement = {};
    }
    var completeStatement = isCompleteStatment(start, end);
    if(completeStatement){
      var field = document.getElementById('code')
      var str = field.textContent;
      if(myInterpreter.completedStatement[start, end] === undefined){
        myInterpreter.completedStatement[start, end] = false;
      } else{
        myInterpreter.completedStatement[start, end] = !myInterpreter.completedStatement[start, end];
      }
    }
*/
    var completeStatement = isCompleteStatement(start, end);
    if(completeStatement){
      stepButton();
    } else {
      while(completeStatement === false){
        var field = document.getElementById('code')
        var str = field.textContent;
        console.log('start: ' + start + ', end: ' + end);
        console.log(str.substring(start, end));
        var node = myInterpreter.stateStack[0].node;
        var start = node.start;
        var end = node.end;
        completeStatement = isCompleteStatement(start, end);
        stepButton();
      }
    }
  }
}

function stepButton() {
  
  if (myInterpreter.stateStack[0]) {
    var node = myInterpreter.stateStack[0].node;
    var start = node.start;
    var end = node.end;

    // for (var i = 0; i < myInterpreter.stateStack.length; i++) {
    //   // if (myInterpreter.stateStack[i].scope) {
    //     if(myInterpreter.stateStack[i].scope && myInterpreter.stateStack[i].scope.properties && !(myInterpreter.stateStack[i].scope.properties.Infinity)) {
    //       console.log(myInterpreter.stateStack[i].scope);
    //   }
    // }

  } else {
    var start = 0;
    var end = 0;
  }

  createSelection(start, end);
  if(isCompleteStatement(start, end)){
    var field = document.getElementById('code')
    var str = field.textContent;
    console.log('start: ' + start + ', end: ' + end);
    console.log(str.substring(start, end));
  }

  // var gate = isNewLine(start, end);
  // console.log(gate);
  // if (gate){
  //   console.log(myInterpreter.stateStack[0].node);
  //   var scope = myInterpreter.getScope();
  //   console.log(scope);
  // }

  try {
    var ok = myInterpreter.step();
  } finally {
    if (!ok) {
      disable('disabled');
    }
  }
}

function runButton() {
  try {
    myInterpreter.run();
  } finally {
    disable('disabled');
  }
}

function disable(disabled) {
  document.getElementById('stepButton').disabled = disabled;
  document.getElementById('biggerStepButton').disabled = disabled;
  document.getElementById('runButton').disabled = disabled;
}

function createSelection(start, end) {
  var field = document.getElementById('code')
  if (field.createTextRange) {
    var selRange = field.createTextRange();
    selRange.collapse(true);
    selRange.moveStart('character', start);
    selRange.moveEnd('character', end);
    selRange.select();
  } else if (field.setSelectionRange) {
    field.setSelectionRange(start, end);
  } else if (field.selectionStart) {
    field.selectionStart = start;
    field.selectionEnd = end;
  }
  field.focus();
  //console.log(isNewLine(field, start, end));
}

var isCompleteStatement = function(start, end){
  //check for a new line character before and after the select
    //if non-white space is found, then return false
  var field = document.getElementById('code')
  var str = field.textContent;
  // var subStr = str.substring(start, end);
  // var matches = subStr.match(/\r|\n/g);
  // if(matches !== null && matches.length > 1)
  //   return false;
  for(var i = end; i < str.length; i++){
    var char = str[i];
    if(!(/\s/.test(char)))  //character is NOT a white space
      return false;
    if(/\r|\n/.test(char)){  //new line found (good)
      break;
    }
  }
  for(var j = start - 1 ; j >= 0; j--){
    var char = str[j];
    if(!(/\s/.test(char)))
      return false;  //return false bc character is NOT a white space
    if(/\r|\n/.test(char)){
      break;
    }
  }
  // console.log('start: ' + start + ', end: ' + end);
  // console.log(str.substring(start, end));
  return true;
}
