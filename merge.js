import React, { useState } from 'react';
import './App.css';

// Merge Sort function
const mergeSort = (arr) => {
  // Base case: if the array has 1 or 0 elements, it's already sorted
  if (arr.length <= 1) return arr;

  // Step 1: Divide the array into two halves
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Step 2: Recursively sort both halves
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Step 3: Merge the sorted halves
  return merge(sortedLeft, sortedRight);
};

// Helper function to merge two sorted arrays
const merge = (left, right) => {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Merge the two arrays while comparing the elements
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // If there are any remaining elements in either array, add them
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
};

function App() {
  const [input, setInput] = useState('');
  const [sortedArray, setSortedArray] = useState([]);
  
  // Function to handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Function to handle sorting when the button is clicked
  const handleSort = () => {
    // Convert the input string to an array of numbers
    const arr = input.split(',').map((num) => parseInt(num.trim(), 10));
    
    // Check if the input is valid
    if (arr.some(isNaN)) {
      alert('Please enter a valid list of numbers separated by commas.');
      return;
    }

    // Sort the array using mergeSort
    const sorted = mergeSort(arr);
    setSortedArray(sorted);
  };

  return (
    <div className="App">
      <h1>Merge Sort in React</h1>
      
      <div>
        <label>
          Enter numbers (comma-separated):
          <input 
            type="text" 
            value={input} 
            onChange={handleInputChange}
            placeholder="e.g. 5, 3, 8, 1"
          />
        </label>
      </div>

      <button onClick={handleSort}>Sort Array</button>

      {sortedArray.length > 0 && (
        <div>
          <h2>Sorted Array:</h2>
          <p>{sortedArray.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
