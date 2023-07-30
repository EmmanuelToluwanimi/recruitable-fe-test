import { Spin } from 'antd';

const LoadingScreen = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <Spin size="large" />
      <h2>Fetching data...</h2>
    </div>
  );
};

export default LoadingScreen;
