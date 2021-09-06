import StarRating from 'react-star-ratings';

export const showAverage = (p) => {
  const allStarsSum = p.ratings.map((r) => r.star).reduce((p, n) => p + n, 0);

  const result = (allStarsSum * 5) / (p.ratings.length * 5);

  return (
    <div className='text-center pt-1 pb-3'>
      <span>
        <StarRating
          starDimension='20px'
          starSpacing='2px'
          starRatedColor='red'
          rating={result}
          editing={false}
        />{' '}
        ({p.ratings.length})
      </span>
    </div>
  );
};
