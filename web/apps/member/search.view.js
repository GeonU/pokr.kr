define([
    'text!./search.tmpl.html',
    'text!./member.notfound.tmpl.html'
    ], function (
        searchTmpl,
        notFoundTmpl
    ) {

    return Backbone.View.extend({

        template: _.template(searchTmpl),
        notFoundTemplate: _.template(notFoundTmpl),

        initialize: function (options) {
            this.app = options.app;
        },

        hide: function () {
            this.$el.hide();
        },

        render: function () {
            var template = _.isEmpty(this.results)
                    ? this.notFoundTemplate
                    : this.template,
                html = template({
                    q: this.q,
                    results: this.results
                });

            this.$el.html(html);

            return this.$el;
        },

        search: function (name) {
            var that = this;

            this.q = name;
            this.results = this.collection.filter(function (member) {
                    var memberName = member.get('name');
                    return that.app.nameMatcher(memberName, name);
                });

            if (this.results.length === 1) {
                this.app.memberView.show(this.results[0]);
            } else {
                this.render().show();
            }
        }
    });
});
