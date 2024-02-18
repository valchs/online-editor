import Editor from 'features/files/components/Editor';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <>
      <div style={{ textAlign: 'center', margin: '30px' }}>
        <h2>JSON Editor</h2>
      </div>
      <Editor />
    </>
  );
};

export default HomePage;
