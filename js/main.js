(function(DOM){
  'use strict';
  
  function app(){
   
    var ajax = new XMLHttpRequest();
    var $input = new DOM('[data-input="cep"]');
    var $enviar = new DOM('[data-btn="enviar"]');
    var $status = new DOM('[data-status="status"]')
    var $endereco = new DOM('[data-end]');
    

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
  }
  app();
})(window.dom);  
