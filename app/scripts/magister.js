var Magister = {
     element: document.getElementById("app"),

     agenda: function(message) {
            alert("talking..." + message);
     },

     ChangeElement: function() {
            this.element.style.backgroundColor = "red";
     }
};