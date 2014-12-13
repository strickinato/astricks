DragonFlyight.Views.Game = Backbone.View.extend({
  template: JST["game"],

  render: function(){
    var content = this.template();
    this.$el.html(content);

    return this;
  },
});
