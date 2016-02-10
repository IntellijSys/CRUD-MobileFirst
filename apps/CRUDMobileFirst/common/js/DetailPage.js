currentPage={};
 
currentPage.init = function() {
    WL.Logger.debug("DetailPage :: init");
    detailUser();
};
 
currentPage.back = function(){
    WL.Logger.debug("DetailPage :: back");
    $("#pagePort").load(path + "pages/ListPage.html", function(){
        $.getScript(path + "js/ListPage.js", function() {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
};
 
currentPage.edit = function() {
    WL.Logger.debug("DetailPage :: edit");
    busyIndicator = new WL.BusyIndicator('AppBody');
 
    var userId = sessionStorage.userId;
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
        editUser(userId,name,officeNumber,phoneNumber,email);
    }
 
};
 
currentPage.remove = function() {
    WL.Logger.debug("DetailPage :: delete");
    busyIndicator = new WL.BusyIndicator('AppBody');
    deleteUser();
};
 
function detailUser(){
    var userId = sessionStorage.userId;
    busyIndicator.show();
    var invocationData = {
            adapter : 'USERAdapter',
            procedure : 'detailUser',
            parameters : [userId]
        };
 
    WL.Client.invokeProcedure(invocationData,{
        onSuccess : detailUserSuccess,
        onFailure : detailUserFailure
    });
}
 
function detailUserSuccess(result){
    WL.Logger.debug("Detail retrieve success");
    busyIndicator.hide();
    if (result.invocationResult.user.length>0) {
        displayUsers(result.invocationResult.user);
    } 
 
    else
        detailUserFailure();
}
 
function detailUserFailure(result){
    WL.Logger.error("Detail retrieve failure");
    busyIndicator.hide();
    WL.SimpleDialog.show("CRUD MobileFirst", "Cannot retrieve detail. Please check your internet connectivity.",
    [{
        text : 'Reload App',
        handler : WL.Client.reloadApp
    }]);
}
 
function displayUsers(user){
    $('#name').val(user[0].name);
    $('#officeNumber').val(user[0].officeNumber);
    $('#phoneNumber').val(user[0].phoneNumber);
    $('#email').val(user[0].email);
}
 
function editUser(userId,name,officeNumber,phoneNumber,email){
    busyIndicator.show();
    var invocationData = {
            adapter : 'USERAdapter',
            procedure : 'editUser',
            parameters : [userId,name,officeNumber,phoneNumber,email]
        };
 
    WL.Client.invokeProcedure(invocationData,{
        onSuccess : editUserSuccess,
        onFailure : editUserFailure
    });
}
 
function editUserSuccess(result){
    WL.Logger.debug("Edit success");
    busyIndicator.hide();
    WL.SimpleDialog.show("Success","Edit user success",[{text:'OK'}]);
    busyIndicator.hide();
    currentPage.back();
}
 
function editUserFailure(result){
    WL.Logger.error("Edit failure");
    busyIndicator.hide();
    WL.SimpleDialog.show("CRUD MobileFirst", "Cannot edit. Please check your internet connectivity.",
    [{
        text : 'Reload App',
        handler : WL.Client.reloadApp
    }]);
}
 
function deleteUser(){
    var userId = sessionStorage.userId;
    busyIndicator.show();
    var invocationData = {
            adapter : 'USERAdapter',
            procedure : 'deleteUser',
            parameters : [userId]
        };
 
    WL.Client.invokeProcedure(invocationData,{
        onSuccess : deleteUserSuccess,
        onFailure : deleteUserFailure
    });
}
 
function deleteUserSuccess(result){
    WL.Logger.debug("Detail retrieve success");
    busyIndicator.hide();
    WL.SimpleDialog.show("Success","Delete user success",[{text:'OK'}]);
    busyIndicator.hide();
    currentPage.back();
}
 
function deleteUserFailure(result){
    WL.Logger.error("Delete failure");
    busyIndicator.hide();
    WL.SimpleDialog.show("CRUD MobileFirst", "Cannot delete. Please check your internet connectivity.",
    [{
        text : 'Reload App',
        handler : WL.Client.reloadApp
    }]);
}