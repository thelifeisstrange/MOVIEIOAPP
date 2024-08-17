import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useFetchDetails from '../hooks/useFetchDetails';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../components/Divider';
import HorizontalScollCard from '../components/HorizontalScollCard';
import VideoPlay from '../components/VideoPlay';
import { FaStar } from "react-icons/fa";
import ConfirmationModal from '../components/ConfirmationModal';

const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector(state => state.movieoData.imageURL);
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`);
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`);
  const { data: recommendationData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`);
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");
  const [reviews, setReviews] = useState([]);  // State to hold reviews
  const [reviewInput, setReviewInput] = useState("");  // State for form input
  const [currentRating, setCurrentRating] = useState(0);  // State for star rating
  const [hoverRating, setHoverRating] = useState(undefined);  // State for star hover
  const [formError, setFormError] = useState("");  // State for form validation errors
  const [editingIndex, setEditingIndex] = useState(null); // State for editing review index
  const [showConfirmation, setShowConfirmation] = useState(false); // State for showing confirmation modal
  const [reviewToDelete, setReviewToDelete] = useState(null); // State to keep track of the review to delete

  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };

  const duration = (data?.runtime / 60)?.toFixed(1)?.split(".");
  const writer = castData?.crew?.filter(el => el?.job === "Writer")?.map(el => el?.name)?.join(", ");

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    // Form validation: Check if both review text and rating are filled
    if (!reviewInput || currentRating === 0) {
      setFormError("Both rating and review are required.");
      return;
    }

    if (editingIndex !== null) {
      // Editing existing review
      const updatedReviews = reviews.map((review, index) =>
        index === editingIndex ? { review: reviewInput, rating: currentRating, date: new Date() } : review
      );
      setReviews(updatedReviews);
      setEditingIndex(null);
    } else {
      // Adding new review
      setReviews([...reviews, { review: reviewInput, rating: currentRating, date: new Date() }]);
    }

    setReviewInput("");
    setCurrentRating(0);
    setFormError(""); // Reset error message
  };

  const handleEditReview = (index) => {
    setEditingIndex(index);
    setReviewInput(reviews[index].review);
    setCurrentRating(reviews[index].rating);
  };

  const handleDeleteReview = (index) => {
    setShowConfirmation(true);
    setReviewToDelete(index);
  };

  const confirmDelete = () => {
    // Delete the review
    const updatedReviews = reviews.filter((_, i) => i !== reviewToDelete);
    setReviews(updatedReviews);

    // Reset form and hide modal
    setReviewInput("");
    setCurrentRating(0);
    setShowConfirmation(false);
    setReviewToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setReviewToDelete(null);
  };

  const handleStarClick = (value) => {
    setCurrentRating(value);
  };

  const handleStarMouseOver = (value) => {
    setHoverRating(value);
  };

  const handleStarMouseLeave = () => {
    setHoverRating(undefined);
  };

  return (
    <div>
      <div className='w-full h-[280px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img
            src={imageURL + data?.backdrop_path}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 '>
        <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
          <img
            src={imageURL + data?.poster_path}
            className='h-80 w-60 object-cover rounded'
          />
          <button onClick={() => handlePlayVideo(data)} className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>Play Now</button>
        </div>

        <div>
          <h2 className='text-2xl lg:text-4xl font-bold text-white '>{data?.title || data?.name}</h2>
          <p className='text-neutral-400'>{data?.tagline}</p>

          <Divider />

          <div className='flex items-center gap-3'>
            <p>
              Rating :  {Number(data?.vote_average).toFixed(1)}+ IMDB
            </p>
            <span>|</span>
            {/* <p>
              View : {Number(data?.vote_count)}
            </p>
            <span>|</span> */}
            <p>Duration : {duration[0]}h {duration[1]}m</p>
          </div>

          <Divider />

          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{data?.overview}</p>

            <Divider />
            {/* Movie Details Section */}
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <p><span className='text-white'>Status</span> : {data?.status}</p>
                </div>
                <Divider />
                <div className='flex items-center'>
                  <p><span className='text-white'>Release Date</span> : {moment(data?.release_date).format("MMMM Do YYYY")}</p>
                </div>
                <Divider />
                <div className='flex items-center'>
                  <p><span className='text-white'>Revenue</span> : {Number(data?.revenue).toLocaleString()}</p>
                </div>
              </div>  

            <Divider />
          </div>

          <div>
            <p><span className='text-white'>Director</span> : {castData?.crew[0]?.name}</p>

            {/* <Divider />

            <p>
              <span className='text-white'>Writer : {writer}</span>
            </p> */}
          </div>

          <Divider />

          {/* Reviews Section */}
          <div>
            <h2 className='font-bold text-lg text-white'>Reviews</h2>
            <form onSubmit={handleReviewSubmit} className='my-4'>
            <textarea
              value={reviewInput}
              onChange={(e) => setReviewInput(e.target.value)}
              placeholder="Write your review here..."
              className='w-full h-24 p-2 rounded border border-white bg-neutral-900 text-white'
            />

              <div className="flex justify-center my-3">
                {Array(5).fill(0).map((_, index) => (
                  <FaStar
                    key={index}
                    size={24}
                    onClick={() => handleStarClick(index + 1)}
                    onMouseOver={() => handleStarMouseOver(index + 1)}
                    onMouseLeave={handleStarMouseLeave}
                    color={(hoverRating || currentRating) > index ? "#FFBA5A" : "#a9a9a9"}
                    style={{
                      marginRight: 10,
                      cursor: "pointer"
                    }}
                  />
                ))}
              </div>
              {formError && <p className='text-red-500 mt-1'>{formError}</p>}
              <button type="submit" className='mt-3 w-full py-2 px-4 bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>Submit Review</button>
            </form>

            {/* Display Reviews */}
            <div>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className='my-4'>
                    <p className='font-bold'>{moment(review.date).format("MMMM Do YYYY")} - Rating: {review.rating}/5</p>
                    <p>{review.review}</p>
                    <button onClick={() => handleEditReview(index)} className='text-blue-500 hover:underline'>Edit</button>
                    <button onClick={() => handleDeleteReview(index)} className='text-red-500 hover:underline ml-4'>Delete</button>
                    <Divider />
                  </div>
                ))
              ) : (
                <p className='text-neutral-400'>No reviews yet.</p>
              )}
            </div>
          </div>

          <Divider />

          <h2 className='font-bold text-lg'>Cast :</h2>
            <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4 justify-center'>
              {
                castData?.cast?.filter(el => el?.profile_path).map((starCast, index) => (
                  <div key={index} className='flex flex-col items-center'>
                    <div>
                      <img
                        src={imageURL + starCast?.profile_path}
                        className='w-24 h-24 object-cover rounded-full'
                      />
                    </div>
                    <p className='font-bold text-center text-sm text-neutral-400'>{starCast?.name}</p>
                  </div>
                ))
              }
            </div>

        </div>
      </div>

      <div>
        <HorizontalScollCard data={similarData} heading={"Similar " + params?.explore} media_type={params?.explore} />
        <HorizontalScollCard data={recommendationData} heading={"Recommendation " + params?.explore} media_type={params?.explore} />
      </div>

      {
        playVideo && (
          <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params?.explore} />
        )
      }

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this review?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default DetailsPage;
