import React, { useState, useRef } from "react";

const BASE_COLOR = "rgb(20 184 166)";
const DEFAULT_COLOR = "teal";
const SECONDARY_COLOR = "red";
// const SECONDARY_COLOR = "purple";
// const MIN_INDEX = "rgba(0, 0, 128, 0.5)";
const MIN_INDEX = "purple";
const INSERTED_ITEM_COLOR = "purple";

const TIME_DELAY = 20; // ms

function AlgorithmVisualizer() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [time, setTime] = useState(null);
  const isCancelled = useRef(false);

  let bars = document.getElementsByClassName("bar");

  const resetBarColors = () => {
    for (let idx = 0; idx < array.length; idx++) {
      bars[idx].style.backgroundColor = BASE_COLOR;
    }
  };

  const generateArray = () => {
    const randomArray = Array.from(
      { length: 128 },
      () => Math.floor(Math.random() * 400) + 10
    );
    setArray(randomArray);
    resetBarColors();
  };

  const bubbleSort = async () => {
    const start_time = Date.now();
    setSorting(true);
    isCancelled.current = false;
    let arr = [...array];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (isCancelled.current) {
          setSorting(false);
          return;
        }

        let bars = document.getElementsByClassName("bar");
        bars[j].style.backgroundColor = SECONDARY_COLOR;
        bars[j + 1].style.backgroundColor = SECONDARY_COLOR;

        await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          setArray([...arr]);
        }

        bars[j].style.backgroundColor = DEFAULT_COLOR;
        bars[j + 1].style.backgroundColor = DEFAULT_COLOR;
      }
    }
    const time_elapsed = (Date.now() - start_time) / 1000;
    setTime(time_elapsed);
    setSorting(false);
  };

  const merge = async (arr, left, mid, right) => {
    let temp = [...arr];
    let i = left;
    let j = mid;
    let k = left;

    let bars = document.getElementsByClassName("bar");
    while (i < mid && j < right) {
      if (isCancelled.current) {
        setSorting(false);
        return;
      }

      if (temp[i] < temp[j]) {
        bars[i].style.backgroundColor = SECONDARY_COLOR;
        arr[k] = temp[i];
        setArray([...arr]);

        await new Promise((resolve) => setTimeout(resolve, TIME_DELAY / 2));

        bars[i].style.backgroundColor = DEFAULT_COLOR;

        i++;
      } else {
        bars[j].style.backgroundColor = SECONDARY_COLOR;
        arr[k] = temp[j];
        setArray([...arr]);

        await new Promise((resolve) => setTimeout(resolve, TIME_DELAY / 2));

        bars[j].style.backgroundColor = DEFAULT_COLOR;

        j++;
      }
      k++;
    }

    while (i < mid) {
      if (isCancelled.current) {
        setSorting(false);
        return;
      }

      arr[k] = temp[i];
      setArray([...arr]);

      await new Promise((resolve) => setTimeout(resolve, TIME_DELAY / 2));

      bars[i].style.backgroundColor = DEFAULT_COLOR;

      i++;
      k++;
    }

    while (j < right) {
      if (isCancelled.current) {
        setSorting(false);
        return;
      }

      arr[k] = temp[j];

      setArray([...arr]);

      await new Promise((resolve) => setTimeout(resolve, TIME_DELAY / 2));

      bars[j].style.backgroundColor = DEFAULT_COLOR;

      j++;
      k++;
    }
  };

  const mergeSortHelper = async (arr, left, right) => {
    if (right - left <= 1) return;

    let mid = left + Math.floor((right - left) / 2);
    await mergeSortHelper(arr, left, mid);
    await mergeSortHelper(arr, mid, right);
    await merge(arr, left, mid, right);
  };

  const mergeSort = async () => {
    setSorting(true);
    isCancelled.current = false;

    let arr = [...array];
    const start_time = Date.now();
    await mergeSortHelper(arr, 0, arr.length);
    const time_elapsed = (Date.now() - start_time) / 1000;
    setTime(time_elapsed);

    setSorting(false);
  };

  const quickSort = async () => {
    setSorting(true);
    isCancelled.current = false;

    const start_time = Date.now();

    let arr = [...array];
    await quickSortHelper(arr, 0, array.length - 1);

    setTime((Date.now() - start_time) / 1000);

    setSorting(false);
  };

  const quickSortHelper = async (arr, left, right) => {
    if (left >= right) return;
    if (isCancelled.current) return;

    const pivot = arr[Math.floor(Math.random() * (right - left + 1)) + left];
    // const pivot = arr[Math.floor((left + right) / 2)];

    const index = await partition(arr, left, right, pivot);
    await quickSortHelper(arr, left, index - 1);
    await quickSortHelper(arr, index, right);
  };

  const partition = async (arr, left, right, pivot) => {
    while (left <= right) {
      while (arr[left] < pivot) {
        left++;
      }
      while (arr[right] > pivot) {
        right--;
      }

      if (left <= right) {
        let bars = document.getElementsByClassName("bar");
        bars[left].style.backgroundColor = SECONDARY_COLOR;
        bars[right].style.backgroundColor = SECONDARY_COLOR;

        const temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;

        setArray([...arr]);

        await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));
        bars[left].style.backgroundColor = DEFAULT_COLOR;
        bars[right].style.backgroundColor = DEFAULT_COLOR;

        left++;
        right--;
      }
    }

    return left;
  };

  const insertionSort = async () => {
    setSorting(true);
    isCancelled.current = false;
    const start_time = Date.now();

    let arr = [...array];
    let newArr = [];
    let index = 0;

    while (index < arr.length) {
      if (isCancelled.current) break;

      let i = 0;
      for (i; i < newArr.length; i++) {
        if (newArr[i] > arr[index]) break;
      }

      newArr.splice(i, 0, arr[index]);

      let temp = [...array];
      temp.splice(0, newArr.length);
      setArray([...newArr, ...temp]);

      const bars = document.getElementsByClassName("bar");

      // for (let j = 0; j < newArr.length; j++) {
      //   bars[j].classList.add("new-arr-item");
      // }

      bars[i].style.backgroundColor = SECONDARY_COLOR;

      await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));

      for (let j = 0; j < newArr.length; j++) {
        bars[j].classList.remove("new-arr-item");
        bars[j].style.backgroundColor = DEFAULT_COLOR;
      }

      index++;
    }
    setTime((Date.now() - start_time) / 1000);
    setSorting(false);
    resetBarColors();
  };

  const selectionSort = async () => {
    setSorting(true);
    isCancelled.current = false;

    let arr = [...array];
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;

      for (let j = i + 1; j < arr.length; j++) {
        if (isCancelled.current) break;

        bars[j].style.backgroundColor = SECONDARY_COLOR;
        bars[minIndex].style.backgroundColor = MIN_INDEX;

        await new Promise((resolve) => setTimeout(resolve, TIME_DELAY));

        if (arr[j] < arr[minIndex]) {
          bars[minIndex].style.backgroundColor = DEFAULT_COLOR;
          minIndex = j;
        } else {
          bars[j].style.backgroundColor = DEFAULT_COLOR;
        }
      }

      if (minIndex !== i) {
        bars[minIndex].style.backgroundColor = DEFAULT_COLOR;
        const temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;

        setArray([...arr]);
      }
    }
    setSorting(false);
  };

  const stopSorting = () => {
    isCancelled.current = true;
    setSorting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 w-screen">
      <h1 className="text-3xl font-bold mb-4">Sorting Visualizer</h1>

      <div className="text-xl">{`${time ? `${time} s` : ""}`}</div>

      <div className="flex items-end gap-[2px] h-96 my-10">
        {array.map((value, index) => (
          <div
            key={index}
            className="bar bg-teal-500"
            style={{
              width: "4px",
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={generateArray}
          disabled={sorting}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-500"
        >
          Generate Array
        </button>
        <button
          onClick={bubbleSort}
          disabled={sorting}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-500"
        >
          Bubble Sort
        </button>
        <button
          onClick={selectionSort}
          disabled={sorting}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-500"
        >
          Selection Sort
        </button>
        <button
          onClick={mergeSort}
          disabled={sorting}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-500"
        >
          Merge Sort
        </button>
        <button
          onClick={quickSort}
          disabled={sorting}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-500"
        >
          Quick Sort
        </button>
        <button
          onClick={insertionSort}
          disabled={sorting}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-500"
        >
          Insertion Sort
        </button>
        <button
          onClick={stopSorting}
          disabled={!sorting}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 disabled:bg-gray-500"
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default AlgorithmVisualizer;
