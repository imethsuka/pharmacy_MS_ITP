import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const DriverBackButton = ({ destination = '/Delivery/DriverDetails' }) => {
  return (
    <div className='flex'>
      <Link
  to={destination}
  style={{
    backgroundColor: '#0369a1', // Equivalent to bg-sky-800
    color: 'white', // Equivalent to text-white
    paddingLeft: '1rem', // Equivalent to px-4
    paddingRight: '1rem', // Equivalent to px-4
    paddingTop: '0.25rem', // Equivalent to py-1
    paddingBottom: '0.25rem', // Equivalent to py-1
    borderRadius: '0.5rem', // Equivalent to rounded-lg
    width: 'fit-content', // Equivalent to w-fit
  }}
>
        <BsArrowLeft className='text-2xl' />
      </Link>
    </div>
  );
};

export default DriverBackButton;