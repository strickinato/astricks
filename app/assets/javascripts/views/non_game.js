DragonFlyight.Views.NonGame = Backbone.View.extend({
  initialize: function(options){
    this.points = options.points
    this.listenTo(this.collection, "sync", this.render)
    this.listenTo(this.collection, "add", this.render)
  },

  template: JST["non_game"],

  render: function(){
    this.collection.sort();
    var content = this.template({
      games: this.collection,
      points: this.points
    });
    this.$el.html(content);

    return this;
  },
});
