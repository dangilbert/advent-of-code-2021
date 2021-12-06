import _, { range } from 'lodash';

interface BitCount {
    zeroes: number;
    ones: number;
}

export const DayClass = {

    mapInput: (input: string[]): any => {
        return input;
    },

    /*
        Part 1
    */

    part1TestResult: 198,
    part1: (input: string[]) => {
        const counts = Array.from({ length: input[0].length }, () => ({ ones: 0, zeroes: 0 }));
        _(input).forEach((row) => {
            for (var i = 0; i < row.length; i++) {
                if (row.charAt(i) === '1') {
                    counts[i].ones++;
                } else {
                    counts[i].zeroes++;
                }
            }
        });
        const gammaRateString = _(range(0, input[0].length)).map((i) => counts[i].zeroes > counts[i].ones ? '0' : counts[i].ones > counts[i].zeroes ? '1' : '2').value().join("");
        const gammaRate = parseInt(`${gammaRateString}`, 2)
        const epsilonRateString = _(range(0, input[0].length)).map((i) => counts[i].zeroes < counts[i].ones ? '0' : counts[i].ones < counts[i].zeroes ? '1' : '2').value().join("");
        const epsilonRate = parseInt(`${epsilonRateString}`, 2)
        return gammaRate * epsilonRate;
    },

    /*
        Part 2
    */

    part2TestResult: 230,
    part2: (input: string[]) => {
        let counts = getCounts(input);

        let oxygenGenRows = [...input];

        let position = 0;
        while (oxygenGenRows.length > 1 && position < input[0].length) {
            const mostCommon = counts[position].zeroes > counts[position].ones ? '0' : '1';
            oxygenGenRows = _(oxygenGenRows).filter((row) => { return row.charAt(position) === mostCommon; }).value();
            counts = getCounts(oxygenGenRows);
            position++;
        }
        const oxygenGeneratorValue = parseInt(oxygenGenRows[0], 2);

        counts = getCounts(input);
        let co2ScrubberRows = [...input];
        position = 0;
        while (co2ScrubberRows.length > 1 && position < input[0].length) {
            const leastCommon = counts[position].zeroes <= counts[position].ones ? '0' : '1';

            co2ScrubberRows = _(co2ScrubberRows).filter((row) => { return row.charAt(position) === leastCommon; }).value();
            counts = getCounts(co2ScrubberRows);
            position++;
        }
        const co2ScrubberValue = parseInt(co2ScrubberRows[0], 2);

        return oxygenGeneratorValue * co2ScrubberValue;
    },

}
function getCounts(input: string[]) {
    const counts = Array.from({ length: input[0].length }, () => ({ ones: 0, zeroes: 0 }));
    _(input).forEach((row) => {
        for (var i = 0; i < row.length; i++) {
            if (row.charAt(i) === '1') {
                counts[i].ones++;
            } else {
                counts[i].zeroes++;
            }
        }
    });
    return counts;
}

