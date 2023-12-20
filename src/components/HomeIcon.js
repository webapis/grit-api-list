const HomeIcon = ({ onClick }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        width="24"
        height="24"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    );
  };
  
  export default HomeIcon;
  