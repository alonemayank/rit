function highlight(text)
{
    inputText = document.getElementById("inputText")
    var innerHTML = inputText.innerHTML
    var index = innerHTML.indexOf(text);
     	console.log(index);
        innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
        inputText.innerHTML = innerHTML 
}

function method(id,user,object)
{
	//var obj=JSON.parse(object[1]);
	//JSON.stringify(obj);
	//alert("Your Tweet Id is: "+id+" \n User Name: "+user);
	console.log(user);
	//swal({   title: "Information!",   text: "This is tweet ID: "+id+"\n This is user: "+user,   type: "warning",   confirmButtonText: "Ok" });
	//console.log(obj);
}

//===================*******************************************************************=======================================

// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    // Username link click
$('#userlist table tbody').on('click', 'td a.linkshowuser', showUserInfo);
$('#userlist table tbody').on('click', 'td a.linkcomment', commentUser);

});

// Functions =============================================================

// Fill table with data
function populateTable() {
console.log("Reached Here array pos populateTable");
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/userlist', function( data ) {
    	// Stick our user data array into a userlist variable in the global object
    userListData = data;

      console.log(userListData.length);
        // For each item in our JSON, add a table row and cells to the content string
        /*$.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
*/
        // Inject the whole content string into our existing HTML table
        //$('#userList table tbody').html(tableContent);
    });
};


console.log("Reached Here USERNAME CLICK CALL");
// Show User Info
function showUserInfo(event) {
	console.log("Reached Here in Click Call!!");
	populateTable();
    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(thisUserName);
    // Get our User Object
    var thisUserObject = userListData[arrayPosition];
    //console.log("Reached Here array pos");

    console.log(thisUserObject._id);
    //console.log("Reached Here cs log");

    var commentCheck=thisUserObject.comment;

    if(typeof commentCheck==='undefined')
    {
    	commentCheck="No Comment to Display";
    }

    swal({   title: "Information!",   text: "Tweet ID: "+thisUserObject.id+"\n Name: "+thisUserObject.fromUserName+"\n User ID: "+thisUserObject.fromUser+"\n Text: "+thisUserObject.text+"\n Longitude: "+thisUserObject.longitude+"\t Latitude: "+thisUserObject.latitude+"\n comment: "+commentCheck,   type: "warning",   confirmButtonText: "OK, Go Back" });

};

function commentUser(event) {
	console.log("Reached Here in Click comment Call!!");
	//populateTable();
    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisID = $(this).attr('rel');

    var globalVar="Test Variable";

    function tryMethod(variable){
    	//alert(variable);
    	globalVar=variable;



        // If it is, compile all user info into one object
        var newUsercomment = {
            'id1': thisID,
            'comment': globalVar
        }
        console.log(newUsercomment);

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUsercomment,
            url: '/commentuser',
            dataType: 'JSON',

        }).done(function( response ){

           // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });
    }

    swal({   title: "An input!",   text: "Write something interesting:",   
    	type: "input",   showCancelButton: true,   closeOnConfirm: false,   
    	animation: "slide-from-top",   inputPlaceholder: "Write something" }, 
    	
    	function(inputValue){
    	 globalVar=inputValue;   
    		if (inputValue === false) return false;      
    		if (inputValue === "") 
    			{     swal.showInputError("You need to write something!");     return false   }      
    		swal("Nice!", "You wrote: " + globalVar, "success")
    		tryMethod(globalVar);
    		;}
    		);
    // Get Index of object based on id value
    //var arrayPosition = userListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(thisUserName);
    // Get our User Object
    //var thisUserObject = userListData[arrayPosition];
    //console.log(thisID);

    //console.log(globalVar);
    //console.log("Reached Here cs log");

    //swal({   title: "Information!",   text: "Tweet ID: "+thisUserObject.id+"\n Name: "+thisUserObject.fromUserName+"\n User ID: "+thisUserObject.fromUser+"\n Text: "+thisUserObject.text+"\n Longitude: "+thisUserObject.longitude+"\t Latitude: "+thisUserObject.latitude+"\n Time: "+thisUserObject.createdAt,   type: "warning",   confirmButtonText: "OK, Go Back" });

};
