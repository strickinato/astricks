DragonFlyight.Views.HighScores = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, "sync", this.render)
  },

  template: JST["high_scores"],

  render: function(){
    console.log("rendering")
    var content = this.template({
      games: this.collection,
    });
    this.$el.html(content);

    return this;
  },
});
