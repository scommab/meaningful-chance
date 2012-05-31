# Meaningful Chance

This is a simple site to turn 1 in X chances in to something more intuitively understandable.

[Live Demo](http://scommab.github.com/meaningful-chance/ "Live Demo")

# Nitty Gritty 

This basically works off of a set of "intuitive changes", and a javascript packing problem solver 

## Packing Problem Solvers
I use run two different solvers to find a "good" solution.

### Simple Solver
The simile solver just finds the larges value smaller then the number, integer divides the inputed number by it and keeps going until it can't fit any more numbers in.

### Smarter Solver
The smarter solvers first tries numbers that evenly divided the input number. And once it runs out of those it falls back to the simpler solver.

_TODO_: Re-evaluate these solvers

## Intuitive Chances
* Win a coin flip (1 in 2)
* Roll the same number on 2 dice (1 in 6)
* Spinning double zero on a Roulette Wheel (1 in 38)
* Pick the ace of spades from a deck of cards (1 in 52)
* Being dealt a royal flush (1 in 649740) 

_TODO_: Think of more chances (it would be nice to have one for 1 in 5)

