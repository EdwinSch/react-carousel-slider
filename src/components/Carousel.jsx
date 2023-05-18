import { shortList, list, longList } from "../data";
import { useEffect, useState } from "react";

import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Carousel = () => {
  const [people, setPeople] = useState(list);
  const [currentPerson, setCurrentPerson] = useState(0);

  // Manual play

  const prevSlide = () => {
    if (currentPerson === 0) {
      // console.log("start");
      setCurrentPerson(people.length - 1);
      return;
    }
    setCurrentPerson(currentPerson - 1);
  };
  const nextSlide = () => {
    if (currentPerson === people.length - 1) {
      // console.log("end");
      setCurrentPerson(0);
      return;
    }
    setCurrentPerson(currentPerson + 1);
  };

  // Auto play

  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => {
      clearInterval(sliderId);
    };
  }, [currentPerson]);

  return (
    <section className="slider-container">
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;

        return (
          <article
            className="slide"
            style={{
              transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
            }}
            key={id}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button type="button" className="prev" onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type="button" className="next" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
};

export default Carousel;
