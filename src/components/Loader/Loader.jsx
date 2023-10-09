import { Grid } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Grid
      height="80"
      width="80"
      color="#2b43b8"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
      wrapperClass=""
      visible={true}
    />
  );
};
