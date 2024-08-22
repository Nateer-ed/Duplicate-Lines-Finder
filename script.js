document.getElementById('findDuplicatesBtn').addEventListener('click', findDuplicates);
document.getElementById('inputText').addEventListener('input', updateLineInfo);
document.getElementById('inputText').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        findDuplicates();
    }
});
document.getElementById('copyButton').addEventListener('click', copyOutput);

function updateLineInfo() {
    const inputText = document.getElementById('inputText').value.trim();
    const lines = inputText.split(/\r?\n/);
    const emptyLines = lines.filter(line => line.trim() === '').length;
    document.getElementById('lineCount').textContent = `Total Lines: ${lines.length}`;
    document.getElementById('emptyCount').textContent = `Empty Lines: ${emptyLines}`;
}

function findDuplicates() {
    const inputText = document.getElementById('inputText').value.trim();
    const result = document.getElementById('result');
    const error = document.getElementById('error');
    const outputBox = document.getElementById('outputBox');
    const outputText = document.getElementById('outputText');

    result.textContent = '';
    error.textContent = '';
    outputText.textContent = '';
    outputBox.classList.add('hidden');

    if (inputText === '') {
        error.textContent = 'Please enter some text.';
        return;
    }

    const lines = inputText.split(/\r?\n/).map(line => line.trim()).filter(line => line !== '');
    const duplicates = findDuplicateLines(lines);
    const uniqueLines = [...new Set(lines)];

    if (duplicates.length > 0) {
        result.textContent = `Found ${duplicates.length} duplicate line(s).`;
        result.classList.remove('text-green-500');
        result.classList.add('text-red-500');
    } else {
        result.textContent = 'No duplicate lines found.';
        result.classList.remove('text-red-500');
        result.classList.add('text-green-500');
    }

    outputText.textContent = uniqueLines.join('\n');
    outputBox.classList.remove('hidden');
}

function findDuplicateLines(lines) {
    const lineMap = {};
    const duplicates = [];
    lines.forEach(line => {
        if (lineMap[line]) {
            if (!duplicates.includes(line)) {
                duplicates.push(line);
            }
        } else {
            lineMap[line] = true;
        }
    });
    return duplicates;
}

function copyOutput() {
    const outputText = document.getElementById('outputText').textContent;
    navigator.clipboard.writeText(outputText).then(() => {
        alert('Output copied to clipboard!');
    }).catch(err => {
        alert('Failed to copy output: ', err);
    });
}