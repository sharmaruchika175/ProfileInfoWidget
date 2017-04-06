# ProfileInfoWidget

How it works:
-On page/widget load, an AJAX call will be sent to server to retrieve profile information. 
-AJAX has been written but instead of using the data returned by server, sample JSON in JS file is declared and used  to populate profile information in success and error callback functions.
-A loader image will be displayed till AJAX response is received. 
-To simulate small delay that will result from AJAX call, some delay is added using setTimeout.
-All the 4 options (displayed in the design) are not functional when they are clicked.Only “Web statistics” and "Edit User" is functional.
-You can click on “Web statistics” which will show new data in the bottom container. 
-From this new section, you can click “Back” to return to the previous section.
-You can click on "Edit user" which will show you the options you filled earlier, like phone number and email address. 
-To edit these options click on the options block and new field will open.
-In the new field, previous details are already there and you can change it by deleting the previous and entering the new details and clicking the "save" button.
-Clicking on the save button  will send Ajax request to server to post and save the new data details and success callback function will make it to return to previous field. 
-But here, these calls will go into error callback function as the server to handle these requests doesn’t exist. So, some success callback code is added in error callback as well.  

Assumptions:
Profile information will be fetched from Server when the widget is loaded.
