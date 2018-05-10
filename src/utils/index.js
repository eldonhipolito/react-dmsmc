$(function(){

    $("#registration").submit(function(e){
        e.preventDefault();

        let username = $("#r_username").val();
        let name = $("#name").val();
        let idnContract = web3.eth.contract(App.contractTemplates.Identity.abi);
        /*
        idnContract.new(username, name, {from: accounts[0]}, function(err, newCon){
            if(!err) {


            }

        });
        */

        App.contractTemplates.Identity.new(username, name).then(function(result){
            console.log("Here!!");
            $("#regAddress").css("display","block");
            $("#regAddress").text(result.address);
        });

    });


    $("#reqVerification").submit(function(e){
            e.preventDefault();

            let idnAddress = $("#idnAddress").val();

            App.contractInstances.Identities.reqIdnVerification(idnAddress).then(function(result){
                $("#reqNotif").css("display","block");
                $("#reqNotif").text("Identity verification requested. Your tx id : " + result.tx);

            });

        });



});