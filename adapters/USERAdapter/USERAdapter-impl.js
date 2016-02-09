function listUsers() {
 
    var input = {
            method : 'get',
            returnedContentType : 'json',
            path : "worklight/get_all_users.php"
        };
 
    return WL.Server.invokeHttp(input);
}
 
function addUser(name,officeNumber,phoneNumber,email) {
 
    var input = {
            method : 'get',
            returnedContentType : 'json',
            path : "worklight/create_user.php",
            parameters : {
                name:name,
                officeNumber:officeNumber,
                phoneNumber:phoneNumber,
                email:email
            }
        };
 
    return WL.Server.invokeHttp(input);
}
 
function detailUser(userId) {
    var userIdS = userId.toString();
    var input = {
            method : 'get',
            returnedContentType : 'json',
            path : "worklight/get_user_details.php",
            parameters : {
                userId:userIdS
            }
        };
 
    return WL.Server.invokeHttp(input);
}
 
function editUser(userId,name,officeNumber,phoneNumber,email) {
    var userIdS = userId.toString();
    var input = {
            method : 'get',
            returnedContentType : 'json',
            path : "worklight/update_user.php",
            parameters : {
                userId:userIdS,
                name:name,
                officeNumber:officeNumber,
                phoneNumber:phoneNumber,
                email:email
            }
        };
 
    return WL.Server.invokeHttp(input);
}
 
function deleteUser(userId) {
    var userIdS = userId.toString();
    var input = {
            method : 'get',
            returnedContentType : 'json',
            path : "worklight/delete_user.php",
            parameters : {
                userId:userIdS
            }
        };
 
    return WL.Server.invokeHttp(input);
}