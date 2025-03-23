import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '#' }) => {
  const linkStyle = {
    backgroundColor: '#0369a1', // Equivalent to bg-sky-800
    color: 'white', // Equivalent to text-white
    padding: '0.25rem 1rem', // Equivalent to px-4 py-1
    borderRadius: '0.5rem', // Equivalent to rounded-lg
    display: 'inline-block', // Ensures the width fits the content
  };

  const iconStyle = {
    fontSize: '1.5rem', // Equivalent to text-2xl
  };

  return (
    <div style={{ display: 'flex' }}>
      <Link to={destination} style={linkStyle}>
        <BsArrowLeft style={iconStyle} />
      </Link>
    </div>
  );
};

export default BackButton;
