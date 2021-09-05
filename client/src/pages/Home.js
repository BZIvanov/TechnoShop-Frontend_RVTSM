import Jumbotron from '../components/cards/Jumbotron';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';
import { JUMBOTRON_TEXTS } from '../constants';

const Home = () => {
  return (
    <>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron texts={JUMBOTRON_TEXTS} />
      </div>

      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
        New Arrivals
      </h4>
      <FeaturedProducts sortColumn='createdAt' />

      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
        Best Sellers
      </h4>
      <FeaturedProducts sortColumn='sold' />

      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
        Categories
      </h4>
      <CategoryList />

      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
        Sub Categories
      </h4>
      <SubList />
    </>
  );
};

export default Home;
