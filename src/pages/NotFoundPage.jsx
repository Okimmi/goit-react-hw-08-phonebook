import { Container, Typography } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <Container sx={{ pt: 3, textAlign: 'center' }}>
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        Oops! Page not found
      </Typography>
      <img
        src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=1060&t=st=1697475869~exp=1697476469~hmac=520cebc85a106787fa84a6cf1df3865e1c134345d245a2401bd7b13cadac8df9"
        alt="404 Page is not found"
        style={{
          display: 'inline-block',
        }}
      />
    </Container>
  );
};
