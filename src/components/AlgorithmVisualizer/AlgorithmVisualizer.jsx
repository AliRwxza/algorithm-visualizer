import React, { useState, useRef } from "react";

const BASE_COLOR = "rgb(20 184 166)";
const DEFAULT_COLOR = "teal";
const SECONDARY_COLOR = "red";

function AlgorithmVisualizer() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [time, setTime] = useState(null);
  const isCancelled = useRef(false);
  let count = 0;

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
          // console.log("Sorting stopped");
          setSorting(false);
          return;
        }

        let bars = document.getElementsByClassName("bar");
        bars[j].style.backgroundColor = SECONDARY_COLOR;
        bars[j + 1].style.backgroundColor = SECONDARY_COLOR;

        await new Promise((resolve) => setTimeout(resolve, 2));

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
        // console.log("Sorting stopped");
        setSorting(false);
        return;
      }

      if (temp[i] < temp[j]) {
        while (count > 0);
        count++;

        bars[i].style.backgroundColor = SECONDARY_COLOR;
        arr[k] = temp[i];
        setArray([...arr]);

        await new Promise((resolve) => setTimeout(resolve, 2));

        bars[i].style.backgroundColor = DEFAULT_COLOR;

        i++;
        count--;
      } else {
        while (count > 0);
        count++;

        bars[j].style.backgroundColor = SECONDARY_COLOR;
        arr[k] = temp[j];
        setArray([...arr]);

        await new Promise((resolve) => setTimeout(resolve, 2));

        bars[j].style.backgroundColor = DEFAULT_COLOR;

        j++;
        count--;
      }
      k++;
    }

    while (i < mid) {
      while (count > 0);
      count++;

      if (isCancelled.current) {
        // console.log("Sorting stopped");
        setSorting(false);
        return;
      }

      // bars[i].style.backgroundColor = SECONDARY_COLOR;
      arr[k] = temp[i];
      setArray([...arr]);

      await new Promise((resolve) => setTimeout(resolve, 10));

      bars[i].style.backgroundColor = DEFAULT_COLOR;

      i++;
      k++;
      count--;
    }

    while (j < right) {
      while (count > 0);
      count++;

      if (isCancelled.current) {
        // console.log("Sorting stopped");
        setSorting(false);
        return;
      }

      arr[k] = temp[j];

      // bars[j].style.backgroundColor = SECONDARY_COLOR;
      setArray([...arr]);

      await new Promise((resolve) => setTimeout(resolve, 10));

      bars[j].style.backgroundColor = DEFAULT_COLOR;

      j++;
      k++;
      count--;
    }

    // setArray([...arr]);

    // let bars = document.getElementsByClassName("bar");
    // for (let idx = left; idx < right; idx++) {
    //   bars[idx].style.backgroundColor = SECONDARY_COLOR;
    //   await new Promise((resolve) => setTimeout(resolve, 10));
    //   bars[idx].style.backgroundColor = DEFAULT_COLOR;
    // }
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

  const stopSorting = () => {
    isCancelled.current = true;
    setSorting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 w-screen">
      <h1 className="text-3xl font-bold mb-4">Sorting Visualizer</h1>

      <div className="text-xl">{time} s</div>

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
          onClick={mergeSort}
          disabled={sorting}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-500"
        >
          Merge Sort
        </button>
        <button
          onClick={mergeSort}
          disabled={sorting}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-500"
        >
          Quick Sort
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
