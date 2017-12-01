(function(win, document){
    'use strict';
    //----------------------------------------------------------------
    //Lib para manipulação do DOM
    function DOM (nodeDom){
      this.element = document.querySelectorAll( nodeDom );
      
    }
    
    //extende a função DOM para ligar o eventListener
    DOM.prototype.on = function on(event, callback){
      Array.prototype.forEach.call(this.element, function( item ){
          item.addEventListener(event, callback);
      }, false);
    }
    //extende a função DOM para desligar o eventListener
    DOM.prototype.off = function off(event, callbak){
       Array.prototype.forEach.call(this.element, function(item){
          item.removeEventListener(event, callback);
      }, false);
    }
    //Extende a função DOM para retornar os elementos do nó selecionado 
    DOM.prototype.get = function get(){
      return this.element;
    }
    
    DOM.prototype.forEach = function forEach(callback){
      return Array.prototype.forEach.call(this.element, callback);
    }
    
    DOM.prototype.map = function map(callback){
      return Array.prototype.map.call(this.element, callback);
    }
    
    DOM.prototype.filter = function filter(callback){
      return Array.prototype.filter.call(this.element, callback);
    }
    
    DOM.prototype.reduce = function reduce(callback){
      return Array.prototype.reduce.call(this.element, callback);
    }
    
    DOM.prototype.reduceRight = function reduceRight(callback){
      return Array.prototype.reduceRight.call(this.element, callback);
    }
    
    DOM.prototype.every = function every(callback){
      return Array.prototype.every.call(this.element, callback);
    }
    
    DOM.prototype.some = function some(callback){
      return Array.prototype.some.call(this.element, callback);
    }
    
    DOM.prototype.isArray = function isArray(obj){
      return Object.prototype.toString.call(obj) === '[object Array]';
    }
    
    DOM.prototype.isObject = function(obj){
      return Object.prototype.toString.call(obj) === '[object Object]';
    }
    
    DOM.prototype.isFunction = function(obj){
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
    
    DOM.prototype.isNumber = function(obj){
      return Object.prototype.toString.call(obj) === '[object Number]';
    }
    
    DOM.prototype.isString = function(obj){
      return Object.prototype.toString.call(obj) === '[object String]';
    }
    
    DOM.prototype.isBoolean = function(obj){
      return Object.prototype.toString.call(obj) === '[object Boolean]';
    }
    
    DOM.prototype.isNull = function(obj){
      return Object.prototype.toString.call(obj) === '[object Null]' ||
      Object.prototype.toString.call(obj) === '[object Undefined]';
    }
    win.dom = DOM;
  })(window, document);