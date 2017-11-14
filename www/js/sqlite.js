var db = null;
var sqlite = angular.module('sqlite', ['ionic', 'ngCordova']);

sqlite.run(function($ionicPlatform, $cordovaSQLite){
    $ionicPlatform.ready(function(){
        db = $cordovaSQLite.openDB({name:"banco.db",location: 'default'});
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS gastos (motivo text primary key, valor decimal(8, 2), data text, descricao text)");        
    });
});

sqlite.factory('custosFactory', function($cordovaSQLite){
    return {
        insert: function(motivo, valor, data, descricao){
            var query = "INSERT INTO gastos (motivo, valor, data, descricao) VALUES (?,?,?,?)";
            var values= [motivo, valor, data, descricao];

            $cordovaSQLite.execute(db,query,values).then(
                function(res){
                    console.log('Success', values);
                    alert('Gasto adicionado com sucesso!');
                },
                function(err){
                    alert('Gasto adicionado com sucesso!');                    
                    console.log('erro');
                    console.log(err);
                    console.log(err +' erro');
                }
            );

        },
        select: function(){
            var query = "SELECT * FROM gastos";
            
            var teste = $cordovaSQLite.execute(db, query).then(
                function(res){
                    if(res.rows.length>0){

                        for(var iii = 0; iii < res.rows.length; iii++){
                            console.log(res.rows.item(iii));
                        }
                        var response = res.rows;
                        console.log('response', response);
                        
                        

                        //var first = res.row.item(0);
                        var first = res.rows.item(0);
                        console.log('Sucesso');
                        //console.log(first);
                        console.log('uguyguyg');
                        //return res;
                       // console.log(res.rows.item["[[Scopes]]"]["0"].rows[1].data);
                    }   else{
                        console.log('error');
                        //return 'err';
                    }
                    return res;
                } 
                
            );

            console.log('ijfowiejfwoiefjwoeifwef ', teste);
            return teste;
        }
    }
});
//.rows.item["[[Scopes]]"]["0"].rows["0"]

