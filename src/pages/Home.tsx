import Files from 'features/files/components/Files';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <>
      <div style={{ textAlign: 'center', margin: '30px' }}>
        <h2>JSON Editor</h2>
      </div>
      <Files />
    </>
  );
};

export default HomePage;
