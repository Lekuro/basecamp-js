document.getElementById('countWords').addEventListener('click', countWords);
/**
 * connected with textarea and takes text
 * choose words uses regex
 * set information in span element
 * if empty textarea throws zero values
 */
function countWords() {
    let text = '',
        arrWords = [],
        arrlength = [],
        sumLengthOfWords = 0;
    text = document.querySelector('[name="textarea"]').value;
    arrWords = text.match(/([a-zа-яієї0-9]+[-'][a-zа-яієї]+)|([a-zа-яієї]+)/gi);
    try {
        arrWords.forEach(e => arrlength.push(e.length));
        document.getElementById('numberWords').innerHTML = `<${arrWords.length}>`;
        document.getElementById('maxWord').innerHTML = `<${Math.max(...arrlength)}>`;
        document.getElementById('minWord').innerHTML = `<${Math.min(...arrlength)}>`;
        arrlength.forEach(e => {
            sumLengthOfWords += e;
        });
        document.getElementById('avgWords').innerHTML = `<${Math.round(sumLengthOfWords / arrWords.length)}>`;
        console.log(arrWords);
    } catch (e) {
        document.getElementById('numberWords').innerHTML = 0;
        document.getElementById('maxWord').innerHTML = 0;
        document.getElementById('minWord').innerHTML = 0;
        document.getElementById('avgWords').innerHTML = 0;
    }
}
