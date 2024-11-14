import { useState } from "react";
import axios from "axios";

const AddReview = ({ product_id, user_id, updateReviews }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/addReview",
        {
          comment,
          rating,
          product_id,
          user_id,
        }
      );
      setComment("");
      setRating("");
      updateReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <textarea
          className="form-control"
          id="comment"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          className="form-control"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AddReview;
