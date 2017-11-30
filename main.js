(function(window, document){
  'use strict';
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
  
   /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."
  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */
  var ajax = new XMLHttpRequest();
  var $input = new DOM('[data-input="cep"]');
  var $enviar = new DOM('[data-btn="enviar"]');
  var $status = new DOM('[data-status="status"]')
  
  

  // Função que limpa o cep digitado deixando apenas numeros
  function limparCep(cep){
    return cep.replace(/\D/g, '');   //limpando cep
  }
  //função que verifica se a requisição deu certo
  function isRequest(){
    return ajax.readyState === 4 && ajax.status === 200;
  }
  //função que seta os valores dos campos no documento de acordo com a busca.
  function setDisplay(obj){
    var $endereco = new DOM('[data-end]');
    $endereco.get()[0].textContent = obj.logradouro;
    $endereco.get()[1].textContent = obj.bairro;
    $endereco.get()[2].textContent = obj.uf;
    $endereco.get()[3].textContent = obj.localidade;
    $endereco.get()[4].textContent = obj.cep;
    if (obj.cep)
      return true
    
    return false;

  }
  //função que faz a requisição no servidor
  function getAdress(url){
    
    ajax.open('get', url);
    ajax.send();
    ajax.addEventListener('readystatechange', function(){
      $status.get()[0].textContent = 'Buscando informações para o CEP ' + $input.element[0].value;
     
        if(isRequest()){
          var data = JSON.parse(ajax.responseText);
          var ok = setDisplay(data);
          if (ok)
            $status.get()[0].textContent = 'Endereço referente ao CEP ' + $input.element[0].value + ':';
          else
            $status.get()[0].textContent = 'Não encontramos o endereço para o CEP ' + $input.element[0].value;
        } else{
          $status.get()[0].textContent = 'Endereço de CEP não é válido ' 
          $endereco.get()[0].textContent = '';
          $endereco.get()[1].textContent = '';
          $endereco.get()[2].textContent = '';
          $endereco.get()[3].textContent = '';
          $endereco.get()[4].textContent = '';
        }
     
        $input.element[0].value = '';
     

    }
    );
  }
  //capturando o click submit
  $enviar.on('click', function(event){
    event.preventDefault();
    var cepLimpo = limparCep($input.element[0].value);
    var url = 'https://viacep.com.br/ws/'+cepLimpo+'/json/'
    getAdress(url);


  });

})(window, document);  