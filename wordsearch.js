// A word search in a nested arrays of letters
const wordSearch = (letters, word) => {
  if (Array.isArray(letters) === false) return false;
  if (typeof word !== 'string') return false;
  if (letters.length === 0 || word.length <= 1) return false;
  // Search horizontally for a match
  if (wordSearchHorizontal(letters, word)) return true;
  // Search vertically for a match
  if (wordSearchVertical(letters, word)) return true;
  return false;
}

// A horizontal word search in a nested arrays of letters
const wordSearchHorizontal = (letters, word) => {
  if (Array.isArray(letters) === false) return false;
  if (typeof word !== 'string') return false;
  if (letters.length === 0 || word.length <= 1) return false;
  // Join the elements of the nested arrays into words
  const joinedNestedArrays = horizontalJoin(letters);
  // Search horizontally for a match
  if (foundInArray(joinedNestedArrays, word)) return true;
  // Search horizontally for a match of the reversed word
  const reversedWordToFind = reverseString(word);
  if (foundInArray(joinedNestedArrays, reversedWordToFind)) return true;
  return false;
}

// A horizontal word search in a nested arrays of letters
const wordSearchVertical = (letters, word) => {
  if (Array.isArray(letters) === false) return false;
  if (typeof word !== 'string') return false;
  if (letters.length === 0 || word.length <= 1) return false;
  // Join the elements of the nested arrays into words
  const joinedNestedArrays = horizontalJoin(letters);
  // Transpose the array, and then we can search horizontally for a match
  const transposedArray = transpose(joinedNestedArrays);
  // Search horizontally for a match
  if (wordSearchHorizontal(transposedArray, word)) return true;
  return false;
}

// Searches for a string within array elements
const foundInArray = (array, stringToFind, caseSensitive = false) => {
  if (Array.isArray(array) === false) return false;
  if (typeof stringToFind !== 'string') return false;
  if (array.length === 0 || stringToFind.length === 0) return false;
  for (const element of array) {
    if (foundInString(element, stringToFind, caseSensitive)) return true;
  }
  return false;
}

// Searches for a string within a string
const foundInString = (lookInString, stringToFind, caseSensitive = false) => {
  if (typeof lookInString !== 'string' || typeof stringToFind !== 'string') return false;
  if (lookInString.length === 0 || stringToFind.length === 0) return false;
  const regExpFlags = '';
  if (caseSensitive) regExpFlags += 'i';
  const match = lookInString.match(stringToFind, regExpFlags);
  const wasFound = Array.isArray(match);
  return wasFound;
}

// Joins elements of nested arrays to form a single word per array
const horizontalJoin = (array) => array.map(element => element.join(''));

const reverseString = (string) => {
  let result = '';
  for (let letter = string.length-1; letter >= 0; letter --) {
    result += string[letter];
  }
  return result;
}

// A function that will return a transposed version of a given 2D array
const transpose = function(matrix) {
  let output = [];
  for (let i = 0; i < matrix[0].length; i++) {
    // Create an empty row for each row in the matrix
    output.push([]);
  }
  for (const row in matrix) {
    for (const col in matrix[row]) {
      output[col][row] = matrix[row][col];
    }
  }
  return output;
};

module.exports = wordSearch