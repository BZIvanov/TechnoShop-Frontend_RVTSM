import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { NAV_LINKS } from '../../constants';

const RatingModal = ({ children, rateProduct, userRated }) => {
  const { user } = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);

  const history = useHistory();
  const { slug } = useParams();

  const handleModal = () => {
    if (user) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: NAV_LINKS.LOGIN.ROUTE,
        state: { from: `${NAV_LINKS.PRODUCT.ROUTE}/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        {userRated ? (
          <StarFilled className='text-danger' />
        ) : (
          <StarOutlined className='text-danger' />
        )}
        <br />
        {user ? 'Leave rating' : 'Login to leave rating'}
      </div>

      <Modal
        title='Leave your rating'
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          rateProduct();
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
