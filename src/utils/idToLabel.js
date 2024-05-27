export function idToLabel(id) {
    let words = id.split(/(?=[A-Z])/); // split word to array by uppercase letters
    words = words.map(word => word[0].toUpperCase() + word.slice(1)); // first letter uppercase

    return words.join(' ');
}