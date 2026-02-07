export function checkHeading(line) {
    //replace " with empty space
    return /^(\*)(\*)(.*)\*$/.test(line.replace(/"/g, ''));
}

export function replaceHeadingStarts(line) {
    return line.replace(/^(\*)(\*)|(\*)$/g, "");
}