import _ from 'lodash';

export const DayClass = {

    mapInput: (input: string[]): number[] => {
        return input.map((value) => parseInt(value));
    },

    /*
        Part 1
    */

    part1TestResult: 7,
    part1: (input: number[]) => {
        return _.chain(_.range(0, input.length - 1))
            .map((_, i) => input[i + 1] - input[i])
            .countBy((value) => value > 0)
            .value()
            .true
    },

    /*
        Part 2
    */

    part2TestResult: 5,
    part2: (input: number[]) => {
        return _.chain(_.range(0, input.length - 3))
            .map((_, i) => (input[i + 1] + input[i + 2] + input[i + 3]) - (input[i] + input[i + 1] + input[i + 2]))
            .countBy((value) => value > 0)
            .value()
            .true;
    },

}