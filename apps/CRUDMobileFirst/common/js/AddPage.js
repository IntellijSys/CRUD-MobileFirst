currentPage={};
 
currentPage.init = function() {
    WL.Logger.debug("AddPage :: init");
};
 
currentPage.back = function(){
    WL.Logger.debug("AddPage :: back");
    $("#pagePort").load(path + "pages/ListPage.html", function(){
        $.getScript(path + "js/ListPage.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
};
 
currentPage.add = function(){
    WL.Logger.debug("AddPage :: add");
    busyIndicator = new WL.BusyIndicator('AppBody');
    var name = $("#name").val();
    var officeNumber = $("#officeNumber").val();
    var phoneNumber = $("#phoneNumber").val();
    var email = $("#email").val();
    if(name == ""){
        WL.SimpleDialog.show("Alert","Please enter name",[{text:'OK'}]);
    } else if(officeNumber == ""){
        WL.SimpleDialog.show("Alert","Please enter office number",[{text:'OK'}]);
    } else if(phoneNumber == ""){
        WL.SimpleDialog.show("Alert","Please enter phone number",[{text:'OK'}]);
    } else if(email == ""){
        WL.SimpleDialog.show("Alert","Please enter email",[{text:'OK'}]);
    } else{
        createUser(name,officeNumber,phoneNumber,email);
    }
};
 
function createUser(name,officeNumber,phoneNumber,email){
    busyIndicator.show();
    var invocationData = {
            adapter : 'USERAdapter',
            procedure : 'addUser',
            parameters : [name,officeNumber,phoneNumber,email]
        };
 
    WL.Client.invokeProcedure(invocationData,{
        onSuccess : addUserSuccess,
        onFailure : addUserFailure
    });
}
 
function addUserSuccess(result){
    WL.Logger.debug("Add user success");
    WL.SimpleDialog.show("Success","Add user success",[{text:'OK'}]);
    busyIndicator.hide();
    currentPage.back();
}
 
function addUserFailure(result){
    WL.Logger.error("Add user failure");
    busyIndicator.hide();
}