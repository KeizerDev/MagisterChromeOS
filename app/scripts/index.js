;(function($) {
    var app = $.sammy(function() {
        this.get('/', function(context) {
            $.get('templates/school.hbs', function (templateData) {
                var template = Handlebars.compile(templateData);
                $('.page-content').html(template(JSON.parse("{}")));
                setTimeout(function() {
                    context.redirect('#', "login");
                    // body...
                }, 2000)
            });
        });
        
        this.get('/#/login', function() {
            $.get('templates/login.hbs', function (templateData) {
                var template = Handlebars.compile(templateData);
                $('.page-content').html(template(JSON.parse("{}")));
                $('.page-content input').get(0).MaterialTextfield.change('');
            });
        });
    });

// start the application
  $(function() {
    app.run()
  });
})(jQuery);