// TODO: make this a separate json file
var base_stats = {
  "coin_flip": 2,
  "roll_dice": 6,
  "roulette_wheel": 38,
  "pick_card": 52,
  "royal_flush": 649740
}
var stats = [[6278211847988224, "roulette_wheel", 10], [3656158440062976, "roll_dice", 20], [2779905883635712, "pick_card", 9], [609359740010496, "roll_dice", 19], [165216101262848, "roulette_wheel", 9], [101559956668416, "roll_dice", 18], [53459728531456, "pick_card", 8], [16926659444736, "roll_dice", 17], [4347792138496, "roulette_wheel", 8], [2821109907456, "roll_dice", 16], [1028071702528, "pick_card", 7], [470184984576, "roll_dice", 15], [422162067600, "royal_flush", 2], [114415582592, "roulette_wheel", 7], [78364164096, "roll_dice", 14], [19770609664, "pick_card", 6], [13060694016, "roll_dice", 13], [3010936384, "roulette_wheel", 6], [2176782336, "roll_dice", 12], [2147483648, "coin_flip", 31], [1073741824, "coin_flip", 30], [536870912, "coin_flip", 29], [380204032, "pick_card", 5], [362797056, "roll_dice", 11], [268435456, "coin_flip", 28], [134217728, "coin_flip", 27], [79235168, "roulette_wheel", 5], [67108864, "coin_flip", 26], [60466176, "roll_dice", 10], [33554432, "coin_flip", 25], [16777216, "coin_flip", 24], [10077696, "roll_dice", 9], [8388608, "coin_flip", 23], [7311616, "pick_card", 4], [4194304, "coin_flip", 22], [2097152, "coin_flip", 21], [2085136, "roulette_wheel", 4], [1679616, "roll_dice", 8], [1048576, "coin_flip", 20], [649740, "royal_flush", 1], [524288, "coin_flip", 19], [279936, "roll_dice", 7], [262144, "coin_flip", 18], [140608, "pick_card", 3], [131072, "coin_flip", 17], [65536, "coin_flip", 16], [54872, "roulette_wheel", 3], [46656, "roll_dice", 6], [32768, "coin_flip", 15], [16384, "coin_flip", 14], [8192, "coin_flip", 13], [7776, "roll_dice", 5], [4096, "coin_flip", 12], [2704, "pick_card", 2], [2048, "coin_flip", 11], [1444, "roulette_wheel", 2], [1296, "roll_dice", 4], [1024, "coin_flip", 10], [512, "coin_flip", 9], [256, "coin_flip", 8], [216, "roll_dice", 3], [128, "coin_flip", 7], [64, "coin_flip", 6], [52, "pick_card", 1], [38, "roulette_wheel", 1], [36, "roll_dice", 2], [32, "coin_flip", 5], [16, "coin_flip", 4], [8, "coin_flip", 3], [6, "roll_dice", 1], [4, "coin_flip", 2], [2, "coin_flip", 1]];


function findChances(num) {
    var simple = simpleChances(num);
    var simpleTotal = totalChances(simple);
    var simplePercent = 100 * (num - simpleTotal) / num

    var complex = complexChances(num);
    var complexTotal = totalChances(complex);
    var complexPercent = 100 * (num - complexTotal) / num

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
  return combine(results);
}

function complexChances(num) {
  var results = []
  while(1) {
    var found = false;
    for (s=0;s<stats.length;s++) {
      if (num % stats[s][0] == 0) {
        num = Math.floor(num / stats[s][0]);
        found = true;
        results.push(stats[s].slice());
      }
    }
    if(!found || num == 1) {
      break;
    }
  }
  if (num != 1) {
    var simple = simpleChances(num);
    // TODO merge them
    //results = results.concat(simple);
    var r;
    for(s=0;s<simple.length;s++) {
      found = false;
      for(r=0;r<results.length;r++) {
        if (results[r][1] == simple[s][1]) {
          results[r][2] += simple[s][2];
          results[r][0] *= simple[s][0];
          found = true;
        }
      }
      if (!found) {
        results.push(simple[s]);
      }
    }
  }
  return combine(results);
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
