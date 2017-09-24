import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this._defineMouseEvent();

    this._img = document.createElement("img");
    // this._img.src = "https://unsplash.it/100/100";
    // this._img.width = 100;
    // this._img.height = 100;
  }

  render() {
    return (
      <div className="App"
        ref={el=> {this._app = el;}}
        onMouseDown={this._mousedown}
        onMouseUp={this._mouseup}>
        <div className="App-header">
          <div id="drag" className="drag"></div>
          <img src="https://images.unsplash.com/photo-1428550443830-190057dc8098?dpr=1&auto=compress,format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop="
            alt="unsplash-1"
            width="458"
            height="305"/>
          <img src="https://images.unsplash.com/photo-1475759697283-38cc56e4455a?dpr=1&auto=compress,format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop="
            alt="unsplash-2"
            width="458"
            height="305"/>
        </div>
      </div>
    );
  }

  _defineMouseEvent() {
    this._mousedown = this._mousedown.bind(this);
    this._mousemove = this._mousemove.bind(this);
    this._mouseup = this._mouseup.bind(this);
  }

  _mousedown(e) {
    document.body.addEventListener("mousemove", this._mousemove);
    e.preventDefault();

    const drag = document.getElementById("drag");

    const target = e.target;
    this._img.src = target.src;
    this._img.width = Math.round(target.width*(25/100));
    this._img.height = Math.round(target.height*(25/100));

    drag.appendChild(this._img);
  }

  _mousemove(e) {
    const drag = document.getElementById("drag");
    drag.style.top = Math.round(e.pageY) + "px";
    drag.style.left = Math.round(e.pageX) + "px";
  }

  _mouseup(e) {
    document.body.removeEventListener("mousemove", this._mousemove);

    const drag = document.getElementById("drag");
    drag.innerHTML = "";
  }
}

export default App;
