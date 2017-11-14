angular.module('starter.controllers', ['sqlite'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
  Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('ListCtrl', function($scope, custosFactory) {
  $scope.sum = 0;
  var vm = this;
  vm.avengers ='';
  vm.title = 'Avengers';
  $scope.ob = [];
  $scope.message = '';
  var c = activate();
  console.log(c);
  $scope.showMsg = false;

  function activate() {
    return custosFactory.select().then(function(data) {
    console.log('dat vale no momento', data);
        if (data.rows.length===0){
          $scope.message = "Não há gastos cadastrados.";
          console.log('dentro da func', $scope.message);
          $scope.showMsg=true;
        }
        else{
          for(var iii = 0; iii < data.rows.length; iii++){
            console.log(data.rows.item(iii));
            var dataFormat = data.rows.item(iii).data.split('-').reverse().join('/');
            data.rows.item(iii).data = dataFormat;
            console.log(typeof data.rows.item(iii).valor);
            console.log(typeof $scope.sum);
            $scope.sum += Number(data.rows.item(iii).valor);
            console.log('soma é ', $scope.sum);
            $scope.ob.push(data.rows.item(iii));
            $scope.showMsg=false;
            $scope.exibe=false;
          }
        }
      });

  }
  console.log('depois da func', $scope.message);
  
  console.log(vm.avengers);

})

//controller do template que adiciona um novo custo
.controller('InputCtrl', function($scope, custosFactory){
  //inicialmente aos campos é atribuído o valor vazio
//$scope.clearFields();

  $scope.motivoCusto='';
  $scope.valor='';
  $scope.data='';
  $scope.descricao='';
  $scope.type = 'text';
  $scope.placeholder = 'Data';

  //função que limpa os campos do form
  $scope.clearFields = function(){

    $scope.motivoCusto='';
    $scope.valor='';
    $scope.data='';   
    $scope.type = 'text';
    $scope.placeholder = 'Data';  
    $scope.descricao='';
    $scope.teste='';
      
  };

  //função que adiciona um novo custo
  $scope.addCost = function(){

    if($scope.descricao === ''){
      $scope.descricao = '-';
    }

    if($scope.motivoCusto===''){
      alert("Por favor, preencha o motivo do custo");
    }
    else if($scope.valor===''){
      alert("Por favor, preencha o valor do custo");
    }else if($scope.data ===''){
      alert("Por favor, preencha a data do custo");
    }else{
      custosFactory.insert($scope.motivoCusto, $scope.valor, $scope.data, $scope.descricao);
      //motivo, valor, data, descricao
      $scope.clearFields();
    }
  };
 
});
