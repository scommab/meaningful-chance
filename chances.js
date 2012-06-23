// TODO: make this a separate json file
var Chances = {
  base_stats: {
      "coin_flip": 2,
      "roll_dice": 6,
      "roulette_wheel": 38,
      "pick_card": 52,
      "royal_flush": 649740
  },
  stats: [
    [649740, "royal_flush", 1],
    [52, "pick_card", 1],
    [38, "roulette_wheel", 1],
    [6, "roll_dice", 1],
    [2, "coin_flip", 1]
  ],


  findChances: function(num) {
      var simple = this.combine(this.simpleChances(num));
      var simpleTotal = this.totalChances(simple);
      var simplePercent = 100 * (num - simpleTotal) / num

      var complex = this.complexChances(num);
      var complexTotal = 0;
      var complexPercent = 100;

      if (complex != null) {
        complex = this.combine(complex);
        complexTotal = this.totalChances(complex);
        complexPercent = 100 * (num - complexTotal) / num
      }

      if (simplePercent < complexPercent) {
        return {
          "total": simpleTotal,
          "percent": simplePercent,
          "results": simple
        }
      } else {
        return {
          "total": complexTotal,
          "percent": complexPercent,
          "results": complex
        }
      }
  },

  totalChances: function(chances) {
    var total = 1;
    for(var i=0;i<chances.length;i++) {
      total *= chances[i][0];
    }
    return total;
  },

  simpleChances: function(num) {
    var results = []
    while(1) {
      var found = false;
      for (s=0;s<this.stats.length;s++) {
        if (this.stats[s][1] == "coin_flip") {
          continue; // powers of two fit to nicely, skip'em
        }
        if (this.stats[s][0] <= num) {
          num = Math.floor(num / this.stats[s][0]);
          found = true;
          results.push(this.stats[s].slice());
        }
      }
      if(!found || num == 1) {
        break;
      }
    }
    // powers of two are too evenly spaced
    while(1) {
      var found = false;
      for (s=0;s<this.stats.length;s++) {
        if (this.stats[s][0] <= num) {
          num = Math.floor(num / this.stats[s][0]);
          found = true;
          results.push(this.stats[s].slice());
        }
      }
      if(!found || num == 1) {
        break;
      }
    }
    return results;
  },

  complexChances: function(total, cur_val, num, results) {
    if(results == undefined) {
      results = []
    }
    if(num == undefined) {
      num = total;
    }
    if(cur_val == undefined) {
      cur_val = 1;
    }
    if(cur_val / total > .9) {
      return results;
    }
    for (var s=0;s<this.stats.length;s++) {
      if (num >= this.stats[s][0]) {
        new_num = Math.floor(num / this.stats[s][0]);
        results.push(this.stats[s].slice());
        r = this.complexChances(total, cur_val * this.stats[s][0], new_num, results)
        if(r != null) {
          return r;
        }
        results.pop()
      }
    }
    return null;
  },

  combine: function(list) {
    var result = []
    var lookup = {}
    var index;
    for(var i=0;i<list.length;i++) {
      if (!(list[i][1] in lookup)) {
        index = result.push(list[i].slice()) - 1;
        lookup[list[i][1]] = index;
      } else {
        index = lookup[list[i][1]];
        result[index][0] *= list[i][0];
        result[index][2] += list[i][2];
      }
    }
    return result;
  }
}
