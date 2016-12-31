import React from 'react';

export default () => {
  const loadingDivStyle = {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100vh',
    textAlign: 'center',
  };

  const LoadingTextStyle = {
    position: 'relative',
    display: 'inline-block',
    lineHeight: '100vh',
    verticalAlign: 'middle',
  };

  return (
    <div id="app-loading" style={loadingDivStyle}>
      <h1 style={LoadingTextStyle}>LOADING APP</h1>
    </div>
  );
};
