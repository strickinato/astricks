DragonFlyight.Collections.Games = Backbone.Collection.extend({
  url: "games",
  model: DragonFlyight.Models.Game,
  comparator: function(model) {
    return model.get("score") * -1
  },

});
