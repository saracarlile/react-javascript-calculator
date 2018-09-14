import React, { Component } from 'react';
import './App.css';

function Display (props) {
    return (
    <div id="display-panel">
      <p id="display-arr">{props.memory}</p>
      <p id="display">{props.display}</p>
    </div>
    );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      memory: []
    };
    this.collectNumber = this.collectNumber.bind(this);
    this.operatorButtonClick = this.operatorButtonClick.bind(this);
    this.clearButton = this.clearButton.bind(this);
    this.equalsButtonClick = this.equalsButtonClick.bind(this);
  }

  collectNumber = (e) =>{
    let input = e.target.textContent;
    let memory = this.state.memory;
    let lastRecord =  memory.slice(-1);
    let firstRecord = memory.slice(0);
    if(memory.length === 0){ //if memory is empty
      this.setState({
        display: input, 
        memory:[input]
      })
      return;
    }
    if(memory.length > 0){
      let record = parseInt(lastRecord[0], 10);  
      let test = Number.isInteger(record); //used to test for operator
      let test2 = lastRecord[0].split('');   // prevent multiple decimals in single digit
      if(test2.includes(".")){   
        if(input === "."){
          return;
        }    
      }
      if(firstRecord[0] === "0" && input==="0") { // do not allow multiple leading zeroes in digit
        return;
      }
      if (test === true){ // if last in memory is a number
        let replace = lastRecord[0] + input;
        memory.splice(-1, 1, replace);
        this.setState({
          display: replace, 
          memory: memory
        })
      }
      if (test === false) {  // if operator found 
        memory.push(input);
        this.setState({
          display: input, 
          memory: memory
        })
      }
    }
  }

  operatorButtonClick = (e) => {  //operator button click function
    let input = e.target.textContent;
    let memory = this.state.memory;
    let lastRecord =  memory.slice(-1);
    if(memory.length > 0){
      let record = parseInt(lastRecord[0], 10);  
      let test = Number.isInteger(record); //used to test for operator
      if (test === true){ // if last in memory is a number
        memory.push(input);
        this.setState({
          display: input, 
          memory: memory
        })
      }
      if(test === false) {  // if operator found last in memory
        memory.push(input);
        this.setState({
          display: input, 
          memory: memory
        })
      }    
    }
    if(memory.length === 0){ //if memory is empty
      this.setState({
        display: input, 
        memory:[input]
      })
    }
  }

  clearButton = () => {
    this.setState({
      display: "0", 
      memory:[]
    })
  }

  equalsButtonClick = () => {
      let memory = this.state.memory;
      let test = memory.filter(record => Number.isInteger(parseInt(record, 10)));  //if you press equals with just operators
      if (test.length < 1 ){
        this.setState({
          display: "0", 
          memory: []
        })
        return;
      }
      if(!Number.isInteger(parseInt(memory[memory.length-1], 10))){  // if the last record is an operator remove it
        memory.splice(-1, 1);
      }
      if(!Number.isInteger(parseInt(memory[0], 10))){  // if the last record is an operator remove it
        memory.splice(0, 1);
      }
      //https://stackoverflow.com/questions/16217333/remove-items-from-array-with-splice-in-for-loop
      
      let i = memory.length;  //if operator found, check if previous value in memory is an operator remove previous record
      while (i--) {
        if(memory[i] === "+" || memory[i] === "/"  || memory[i] === "*" ||  memory[i] === "-"){ 
          if(memory[i-1] === "+" || memory[i-1] === "/"  || memory[i-1] === "*" ||  memory[i-1] === "-" ){
            memory.splice(i-1, 1);
          }
        }
      }
      let resultString = memory.join('');
      console.log(resultString);
      let result = eval(resultString);
      this.setState({
        display: result.toString(), 
        memory: [result.toString()]
      })
  }

  render() {
    return (
      <div id="container">
        <main id="calculator">
          <Display display={this.state.display} memory={this.state.memory}/>
          <div className="row-1">
            <button id="clear" onClick={this.clearButton}>AC</button>
            <button id="divide" onClick={this.operatorButtonClick}>/</button>
            <button id="multiply" onClick={this.operatorButtonClick}>*</button>
          </div>
          <div className="row-2">
            <button id="seven" onClick={this.collectNumber}>7</button>
            <button id="eight" onClick={this.collectNumber}>8</button>
            <button id="nine" onClick={this.collectNumber}>9</button>
            <button id="subtract" onClick={this.operatorButtonClick} >-</button>
          </div>
          <div className="row-3">
            <button id="four" onClick={this.collectNumber}>4</button>
            <button id="five" onClick={this.collectNumber}>5</button>
            <button id="six" onClick={this.collectNumber}>6</button>
            <button id="add" onClick={this.operatorButtonClick}>+</button>
          </div>
          <div className="row-4">
            <button id="one" onClick={this.collectNumber}>1</button>
            <button id="two" onClick={this.collectNumber}>2</button>
            <button id="three" onClick={this.collectNumber}>3</button>
            <button id="equals" onClick={this.equalsButtonClick}>=</button>
            <button id="zero" onClick={this.collectNumber}>0</button>
            <button id="decimal" onClick={this.collectNumber}>.</button>  
          </div>
        </main>
      </div>
    );
  }
}

export default App;
