# RRT
## Info
A rapidly exploring random tree (RRT) is an algorithm designed to efficiently search nonconvex, high-dimensional spaces by randomly building a space-filling tree. The tree is constructed incrementally from samples drawn randomly from the search space and is inherently biased to grow towards large unsearched areas of the problem. RRTs were developed by Steven M. LaValle and James J. Kuffner Jr. [Wikipedia](https://en.wikipedia.org/wiki/Rapidly-exploring_random_tree) 

[RRT article](http://msl.cs.uiuc.edu/~lavalle/papers/Lav98c.pdf)

## TO DO
 * grow towards uncovered area
 * check goal vicinity only after N iterations + at the end
 * add obstacles and collision checking
 * use control signals

 ## How to run
 1. `npm run build`
 2. `node index.js <numberOfVertices> <incrementalDistance>`, e.g. `node index.js 100 15`
 3. Results are saved in `./img` folder in the code root directory.
