DragonFlyight.Views.NonGame = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, "sync", this.render)
  },

  template: JST["non_game"],

  render: function(){
    var content = this.template({
      games: this.collection,
    });
    this.$el.html(content);

    return this;
  },
});
