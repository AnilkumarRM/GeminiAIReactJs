export function checkHeading(str) {
    //replace " with empty space
    return /^(\*)(\*)(.*)\*$/.test(str.replace(/"/g, ''));
}

export function replaceHeadingStarts(str) {
    return str.replace(/^(\*)(\*)|(\*)$/g, "");
}