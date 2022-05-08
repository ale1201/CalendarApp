import { Box, Container, Grid } from "@mui/material";
import { AccountProfile } from "./account-profile";
//import Calendar from "./Calendar";


const Account = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile />
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Box>

    </Box>
  </>
);

export default Account;