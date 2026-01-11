import React from "react";
import { useParams } from "react-router-dom";
import { palakkadPlaces, palakkadArtforms } from "../data/palakkadData";
import "./PlaceDetails.css";

export default function PlaceDetails() {
  const { id } = useParams();

  const item =
    palakkadPlaces.find((p) => p.id === id) ||
    palakkadArtforms.find((a) => a.id === id);

  if (!item) return <h2>Not Found</h2>;

  return (
    <div className="details-container">
      <img src={item.img} className="details-img" />
      <h1 className="details-title">{item.title}</h1>
      <p className="details-story">{item.story}</p>
    </div>
  );
}
