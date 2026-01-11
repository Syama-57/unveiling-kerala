import { useParams } from "react-router-dom";
import mythsData from "../data/mythsData";

export default function StoryFrontend() {
  const { id } = useParams();
  const story = mythsData.find(item => item.id === id);

  if (!story) return <p>Story not found</p>;

  return (
    <div>
      <h1>{story.title}</h1>
      <img src={story.img} alt={story.title} />
      <p>{story.full}</p>
    </div>
  );
}
