import React, { useState } from 'react';
import axios from 'axios';
import "./style.css"
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const [searchQueries, setSearchQueries] = useState(['', '', '', '', '', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const nav = useNavigate();
  const handleSearch = async () => {
    const emptyQueries = searchQueries.some((query) => query.trim() === '');
    if (emptyQueries) {
      setErrorMessage('Please write something for all panels');
      return;
    } else {
        nav("/comic", { state:searchQueries});
    }
  };

  const handleInputChange = (index, value) => {
    const updatedQueries = [...searchQueries];
    updatedQueries[index] = value;
    setSearchQueries(updatedQueries);
  };

  return (
    <div className=' bg-[#191919] text-white '>
    <h1 className="text-[80px] font-bold  mx-auto text-center  font-comic">AI Comics Generator</h1>
    <h2 className='mx-auto text-center  font-comic text-gray-300'>Transform your imagination into comic reality with 10 inputs, 10 frames, and endless AI-driven storytelling</h2>
    <div className="flex flex-col lg:flex-row  font-jt justify-center min-h-screen">
        
      <div className="lg:w-1/2">
        <img
          src="ss.png"
          alt="Comic Poster"
          className="w-full h-[80vh] "
        />
      </div>
      <div className="lg:w-1/2 p-4">
        
        <div className="mb-4">
          {searchQueries.map((query, index) => (
            <div key={index} className="flex mb-2 flex-col box box2">
                <div class="evenboxinner text-black font-comic w-fit    "> Panel {index+1}</div>
              <input
                type="text"
                placeholder={`Write for Panel ${index + 1}`}
                className=" px-2 py-2 rounded-md mr-2 w-2/3 font-comic text-black outline-none"
                value={query}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          ))}
          <button
            className="evenboxinner2 p-2 m-2 transition-all hover:scale-[1.05]  text-black font-comic w-fit  "
            onClick={handleSearch}
          >
            Generate Comics
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500 mb-2 font-comic">{errorMessage}</p>
        )}
      </div>
    </div>

    <div>
        Project Created By<span className='text-yellow-400'> Rishabh Sagar</span> for Dashtoon <span className='text-yellow-400'>(19084019 -Electrical Engineering IDD)</span>
    </div>
    </div>
    
  );
};

export default HomePage;
