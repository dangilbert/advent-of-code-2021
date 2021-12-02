import _ from 'lodash';


enum Direction {
    forward,
    down,
    up,
}
interface Instruction {
    direction: Direction;
    distance: number;
}

export const DayClass = {

    mapInput: (input: string[]): Instruction[] => {
        return input.map((value) => {
            const [directionArg, distanceArg] = value.split(" ");

            return {
                direction: Direction[directionArg as keyof typeof Direction],
                distance: parseInt(distanceArg),
            }
        });
    },

    /*
        Part 1
    */

    part1TestResult: 150,
    part1: (input: Instruction[]) => {
        const instructionGroupSums = _(input).groupBy((value) => value.direction).map((instructionSet, directionKey) => {
            return {
                direction: directionKey,
                sum: _(instructionSet).sumBy((instruction) => instruction.distance),
            }
        })
        const depth = instructionGroupSums.value()[Direction.down].sum - instructionGroupSums.value()[Direction.up].sum;
        return depth * instructionGroupSums.value()[Direction.forward].sum;
    },

    /*
        Part 2
    */

    part2TestResult: -1,
    part2: (input: Instruction[]) => {
        throw "Part 2 not implemented";
    },

}