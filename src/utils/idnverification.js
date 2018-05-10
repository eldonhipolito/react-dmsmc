$(function(){


    App.poll(
       //Main function...
        function(){
            let Idns = App.contractInstances.Identities;
             console.log("hello world!");
            Idns.requestsCount.call().then(function(rqCount){
                console.log("hello world!");
                for(let ndx = 0; ndx < rqCount; ndx++) {
                    getIdentity(Idns, ndx);
                }

            });


            });


$("#verTbody").on("click",".verifyBtn", function(){
    let ndx = $(this).attr("id").charAt($(this).attr("id").length - 1);
   let userAdd = $("#colUserAdd" + ndx).text();
   let identity = $("#colIdn" + ndx).text();

   App.contractInstances.Identities.verifyIdentity(userAdd, identity).then(function(result){
        alert("identity verified!");
   });

});




function getIdentity(idns, ndx) {
idns.singleVerRequest(ndx).then(function(res){

                let userAddress = res[0];
                let identity = res[1];
                let timestamp = res[2];

           App.contractTemplates.Identity.at(identity).then(function(inst){
            inst.userId.call().then(function(userId){

                inst.name.call().then(function(name){
                    let $row = $("<tr> </tr>");
                    $row.append("<td>" + userId + "</td>").append("<td>" + name + "</td>").append("<td id='colIdn" + ndx + "'>" + identity + "</td>").append("<td id='colUserAdd" + ndx + "'>" + userAddress + "</td>").append("<td>" + "<button id='btnVerify" + ndx + "' class='verifyBtn btn btn-success'>Verify</button> </td>");
                    $("#verTbody").append($row);
                });

            });



           });




          });

}




});