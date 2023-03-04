const yearGroupRegex = /(y(?:ea)?rs?(\s|-)+(?:\d+\s*(?:,|&)?\s*)+)/g;
const yearRegex = /\d+/g;

const additionalRegexps = new Map<string[], RegExp>([
    [["12"], /(^| )hsc:?( |$)/],
    [["7", "8", "9"], /(^| )junior( |$)/],
    [["10", "11", "12"], /(^| )senior( |$)/],
]);

export function getYears(title: string): string[] {
    let yearResult: string[] = [];

    const normalisedTitle = title.toLowerCase();

    const yearGroups = normalisedTitle.matchAll(yearGroupRegex);

    for (let yearGroup of yearGroups) {
        const years = yearGroup[0].matchAll(yearRegex);

        for (let year of years) {
            yearResult.push(year[0]);
        }
    }

    if (yearResult.length == 0) {
        for (let [additionalYears, additionalRegex] of additionalRegexps) {
            if (normalisedTitle.match(additionalRegex) !== null) {
                yearResult.push(...additionalYears);
            }
        }
    }

    return yearResult;
}
