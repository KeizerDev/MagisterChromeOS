// var Magister = {
//      element: document.getElementById("app"),

//      auth: function(obj) {
//         var schoolprefix = 'https://'+obj['school']+'.magister.net/api';

//         $('.btn-submit-login').attr('disabled', '');
//         $.ajax({
//             url: schoolprefix + '/sessies/huidige',
//             type: 'DELETE',
//             xhrFields: {
//                 withCredentials: true,
//                 setDisableHeaderCheck: true
//             }
//         }).done(function() {
//             $.ajax({
//                 url: schoolprefix + '/sessies',
//                 type: 'POST',
//                 data: {Gebruikersnaam: obj['username'], Wachtwoord: obj['password'], IngelogdBlijven: false},
//                 xhrFields: {
//                     withCredentials: true,
//                     setDisableHeaderCheck: true
//                 },
//                 success: function(data, textStatus, xhr){
//                     console.log("success");
//                     saveData({'school': obj['school'], 'username': obj['username'], 'password': obj['password'], 'firstrun': false});
//                     init();
//                 },
//                 complete: function(data, textStatus, xhr) {
//                     $('.btn-submit-login').removeAttr('disabled');
//                     console.log(this)
//                 }
//             });
//         });
//      },

//      agenda: function(message) {
//             alert("talking..." + message);
//      },

//      ChangeElement: function() {
//             this.element.style.backgroundColor = "red";
//      }
// };
