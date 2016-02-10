currentPage = {};
var busyIndicator = null;
 
currentPage.init = function(){
    WL.Logger.debug("ListPage :: init");
    busyIndicator = new WL.BusyIndicator('AppBody');
    listUsers();
};
 
currentPage.loadPage = function(pageIndex){
    WL.Logger.debug("ListPage :: loadPage :: pageIndex: " + pageIndex);
    $("#pagePort").load(path + "pages/" + pageIndex + ".html");
    $.getScript(path + "js/" + pageIndex +".js", function() {
        if (currentPage.init) {
            currentPage.init();
        }
    });
};
 
currentPage.detailPage = function(userId){
    sessionStorage.setItem("userId", userId);
    $("#pagePort").load(path + "pages/DetailPage.html");
    $.getScript(path + "js/DetailPage.js", function() {
        if (currentPage.init) {
            currentPage.init();
        }
    });
};
 
function listUsers(){
    busyIndicator.show();
    var invocationData = {
            adapter : 'USERAdapter',
            procedure : 'listUsers',
            parameters : []
        };
 
    WL.Client.invokeProcedure(invocationData,{
        onSuccess : listUsersSuccess,
        onFailure : listUsersFailure
    });
}
 
function listUsersSuccess(result){
    WL.Logger.debug("List retrieve success");
    busyIndicator.hide();
    if (result.invocationResult.users.length>0) {
        displayUsers(result.invocationResult.users);
    } 
 
    else
        listUsersFailure();
}
 
function listUsersFailure(result){
    WL.Logger.error("List retrieve failure");
    busyIndicator.hide();
    WL.SimpleDialog.show("CRUD MobileFirst", "Cannot retrieve list. Please check your internet connectivity.",
    [{
        text : 'Reload App',
        handler : WL.Client.reloadApp
    }]);
}
 
function displayUsers(users){
    var ul = $('#itemsList');
    var html ='';
    $.each(users, function(index, item) {
        html += '<li><a onclick="currentPage.detailPage('+item.userId+');" >';
        html += '<h4>' + item.name + '</h4>';
        html += '<p>' + item.email + '</p>';
        html += '</a></li>';
 
    });
 
    ul.append(html);
}