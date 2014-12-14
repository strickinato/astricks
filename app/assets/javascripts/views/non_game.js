DragonFlyight.Views.NonGame = Backbone.View.extend({
  initialize: function(options){
    this.points = options.points
    debugger
    this.listenTo(this.collection, "sync", this.render)
  },

  template: JST["non_game"],

  render: function(){
    var content = this.template({
      games: this.collection,
      points: this.points
    });
    this.$el.html(content);

    return this;
  },
});
