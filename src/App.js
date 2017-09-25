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

    this.state = {
        ghostPosX: -1000,
        ghostPosY: -1000
    };
  }

  render() {

    const draggable = this._isDraggable();
    const ghostStyle = this._ghostStyle();

    return (
      <div className="App"
        ref={el=> {this._app = el;}}
        onClick={ this.handleClick }
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onDragStart={ this.handleDragStart }
        onDragOver={ this.handleDragOver }
        onDragEnd={ this.handleDragEnd }
        >
        <div className="App-header">
          <div id="drag" className="drag" style={ ghostStyle }></div>
          <img src="https://images.unsplash.com/photo-1428550443830-190057dc8098?dpr=1&auto=compress,format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop="
            alt="unsplash-1"
            draggable={ draggable }
            width="458"
            height="305"/>
          <img src="https://images.unsplash.com/photo-1475759697283-38cc56e4455a?dpr=1&auto=compress,format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop="
            alt="unsplash-2"
            draggable={ draggable }
            width="458"
            height="305"/>
        </div>
      </div>
    );
  }

  _isDraggable() {
      const isDraggable = 'function' === typeof DataTransfer.prototype.setDragImage;

      // console.log("isDraggable ", isDraggable);

      return isDraggable;
  }

  _ghostStyle() {
      const ghostPosX = this.state.ghostPosX;
      const ghostPosY = this.state.ghostPosY;

      return Object.assign({}, {
          "left": ghostPosX + "px",
          "top": ghostPosY + "px"
      })
  }

  _defineMouseEvent() {
      this.handleClick = this.handleClick.bind(this);
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
      this.handleDragStart = this.handleDragStart.bind(this);
      this.handleDragOver = this.handleDragOver.bind(this);
      this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleClick(e) {
    
  }

  handleMouseDown(e) {
      if (this._isDraggable()) {
          return;
      }

      document.body.addEventListener("mousemove", this.handleMouseMove);
      e.preventDefault();

      const drag = document.getElementById("drag");

      const target = e.target;
      this._img.src = target.src;
      this._img.width = Math.round(target.width*(25/100));
      this._img.height = Math.round(target.height*(25/100));

      drag.appendChild(this._img);
  }

  handleMouseMove(e) {
      // const drag = document.getElementById("drag");
      // drag.style.top = Math.round(e.pageY) + "px";
      // drag.style.left = Math.round(e.pageX) + "px";
      this.setState({
          "ghostPosX": Math.round(e.pageX),
          "ghostPosY": Math.round(e.pageY)
      });
  }

  handleMouseUp(e) {
      if (this._isDraggable()) {
          return;
      }

      document.body.removeEventListener("mousemove", this.handleMouseMove);

      const drag = document.getElementById("drag");
      drag.innerHTML = "";
  }

  handleDragStart(e) {
      const drag = document.getElementById("drag");

      const target = e.target;
      this._img.src = target.src;
      this._img.width = Math.round(target.width*(25/100));
      this._img.height = Math.round(target.height*(25/100));

      drag.appendChild(this._img);

      e.dataTransfer.setDragImage(drag, 5, 5);
  }

  handleDragOver(e) {
    
  }

  handleDragEnd(e) {
    
  }
}

export default App;
