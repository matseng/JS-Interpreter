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

function stepButton() {
  if (myInterpreter.stateStack[0]) {
    var node = myInterpreter.stateStack[0].node;
    var start = node.start;
    var end = node.end;
    console.log(node.type);

    for (var i = 0; i < myInterpreter.stateStack.length; i++) {
      // if (myInterpreter.stateStack[i].scope) {
        if(myInterpreter.stateStack[i].scope && myInterpreter.stateStack[i].scope.properties && !(myInterpreter.stateStack[i].scope.properties.Infinity)) {
          console.log(myInterpreter.stateStack[i].scope);
      }
    }

  } else {
    var start = 0;
    var end = 0;
  }
  createSelection(start, end);

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
  console.log(isNewLine(field, start, end));
}

var isNewLine = function(textField, start, end){
  //check for a new line character before and after the select
    //if non-white space is found, then return false
  var str = textField.textContent;
  for(var i = end; i < str.length; i++){
    var char = str[i];
    // console.log(char);
    if(!(/\s/.test(char)))  //character is NOT a white space
      return false;
    if(/\r|\n/.test(char)){  //new line found (good)
      // debugger
      break;
    }
  }
  for(var j = start - 1 ; j >= 0; j--){
    var char = str[j];
    // console.log(char);
    if(!(/\s/.test(char)))
      return false;  //return false bc character is NOT a white space
    if(/\r|\n/.test(char)){
      // debugger;
      break;
    }
  }
  console.log('start: ' + start + ', end: ' + end);
  console.log(str.substring(start, end));
  return true;
}
