// TODO: make this a separate json file
var base_stats = {
  "coin_flip": 2,
  "roll_dice": 6,
  "roulette_wheel": 38,
  "pick_card": 52,
  "royal_flush": 649740
}
var stats = [
  [649740, "royal_flush", 1],
  [52, "pick_card", 1],
  [38, "roulette_wheel", 1],
  [6, "roll_dice", 1],
  [2, "coin_flip", 1]
];


function findChances(num) {
    var simple = combine(simpleChances(num));
    var simpleTotal = totalChances(simple);
    var simplePercent = 100 * (num - simpleTotal) / num

    var complex = complexChances(num);
    var complexTotal = 0;
    var complexPercent = 100;

    if (complex != null) {
      complex = combine(complex);
      complexTotal = totalChances(complex);
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
}
function totalChances(chances) {
  var total = 1;
  for(var i=0;i<chances.length;i++) {
    total *= chances[i][0];
  }
  return total;
}
function simpleChances(num) {
  var results = []
  while(1) {
    var found = false;
    for (s=0;s<stats.length;s++) {
      if (stats[s][1] == "coin_flip") {
        continue; // powers of two fit to nicely, skip'em
      }
      if (stats[s][0] <= num) {
        num = Math.floor(num / stats[s][0]);
        found = true;
        results.push(stats[s].slice());
      }
    }
    if(!found || num == 1) {
      break;
    }
  }
  // powers of two are too evenly spaced
  while(1) {
    var found = false;
    for (s=0;s<stats.length;s++) {
      if (stats[s][0] <= num) {
        num = Math.floor(num / stats[s][0]);
        found = true;
        results.push(stats[s].slice());
      }
    }
    if(!found || num == 1) {
      break;
    }
  }
  return results;
}

function complexChances(total, cur_val, num, results) {
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
  for (var s=0;s<stats.length;s++) {
    if (num >= stats[s][0]) {
      new_num = Math.floor(num / stats[s][0]);
      results.push(stats[s].slice());
      r = complexChances(total, cur_val * stats[s][0], new_num, results)
      if(r != null) {
        return r;
      }
      results.pop()
    }
  }
  return null;
}

function combine(list) {
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
