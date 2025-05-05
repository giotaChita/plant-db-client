import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {gsap} from "gsap";
import '../App.css'


function Home(){

    const [listOfPlants, setListOfPlants] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleTitleClick = (e) => {
        
        const title = e.currentTarget;

        // Create bottom-right 
        const plantBottomRight = document.createElement('img');
        plantBottomRight.src = '/plant-vine.svg';
        plantBottomRight.className = 'plant-svg plant-bottom-right';
        title.appendChild(plantBottomRight);
        // Create bottom-left plant
        const plantBottomLeft = document.createElement('img');
        plantBottomLeft.src = '/plant-vine.svg';
        plantBottomLeft.className = 'plant-svg plant-bottom-left';
        title.appendChild(plantBottomLeft);


        gsap.fromTo(
        plantBottomRight,
        { scaleX: 0, scaleY: 0, opacity: 0 },
        { scaleX: -1, scaleY: 1, opacity: 1, duration: 2, ease: 'power2.out' }
        );

        gsap.fromTo(
        plantBottomLeft,
        { scaleX: 0, opacity: 0 },
        { scaleX: -1, opacity: 1, duration: 2, ease: 'power2.out' }
        );

        // remove after a while
        setTimeout(() => {
        plantBottomRight.remove();
        plantBottomLeft.remove();
        }, 4000);
    };

    // Delete a plant
    const deletePlant = async (id) => {
      try{
        await axios.delete(`https://plantdbmenem.netlify.app/plant/${id}`);
        setListOfPlants(listOfPlants.filter((plant) => plant.id !== id));
        setCurrentIndex(0); // reset to avoid out-of-range
      }
      catch (error) {
        console.log("Error deleting plant: ", error);
      }
    };

    useEffect(() => {
        axios.get("https://plant-db-7e0c17d70235.herokuapp.com/plant").then((response) => {
            setListOfPlants(response.data);
        });
    }, []);


    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listOfPlants.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + listOfPlants.length) % listOfPlants.length);
    };
    // Guard against undefined or empty list plants
    const currentPlant = listOfPlants[currentIndex];

    if (!currentPlant) {
        return <div>Loading...</div>;
    }

    const getPlant = (offset) => {
        const index = (currentIndex + offset + listOfPlants.length) % listOfPlants.length;
        return listOfPlants[index];
    };

    return (
      <>
        <div className="title" onClick={handleTitleClick}>
            ΤΟ ΑΛΦΑΒΗΤΑΡΙ ΤΩΝ ΒΟΤΑΝΩΝ</div>
      <div className="carousel-container">
        <button className="nav-btn" onClick={handlePrev}>
          <FaArrowLeft />
        </button>

        {[getPlant(-1), getPlant(0), getPlant(1)].map((plant, i) => (
          <div
            key={i}
            className={`plant ${i === 1 ? 'center-plant' : 'side-plant'}`}
          >
            <div className="name">
              {plant.name}
              <span className='delete-btn' onClick={() => deletePlant(plant.id)}>x</span>
            </div>
            <div className="body">
              {plant.information.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
            <div className="photo">
              <img src={plant.photo} alt={plant.name} />
            </div>
          </div>
        ))}

        <button className="nav-btn" onClick={handleNext}>
          <FaArrowRight />
        </button>
      </div>
      </>

    );

}

export default Home;