import fs from 'fs';
import _ from 'lodash';


/*
    Part 1
*/

const part1 = function (input: number[]) {
    return _.chain(_.range(0, input.length - 1))
        .map((_, i) => input[i + 1] - input[i])
        .countBy((value) => value > 0)
        .value()
        .true
};

/*
    Part 2
*/

const part2 = function (input: number[]) {
    return _.chain(_.range(0, input.length - 3))
        .map((_, i) => (input[i + 1] + input[i + 2] + input[i + 3]) - (input[i] + input[i + 1] + input[i + 2]))
        .countBy((value) => value > 0)
        .value()
        .true;
};

const testInput: number[] = fs.readFileSync('input/test.txt').toString().split("\n").map((value) => parseInt(value));
const input: number[] = fs.readFileSync('input/part1.txt').toString().split("\n").map((value) => parseInt(value));

console.log(`Input length: ${input.length}`);
console.log(`Part 1 (Test input): ${part1(testInput)} - should be 7`);
console.log(`Part 1 (Real input): ${part1(input)}`);

console.log(`Part 2 (Test input): ${part2(testInput)} - should be 5`);
console.log(`Part 2 (Real input): ${part2(input)}`);