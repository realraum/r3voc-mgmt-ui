import type { FC } from 'react';
import { Link, Outlet } from 'react-router';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useApiStore } from '@/stores/apistore';

const RootLayout: FC = () => {
    const user = useApiStore(state => state.user);
    const logout = useApiStore(state => state.logout);

    return (
        <>
            <AppBar position="static" color="primary" component="header">
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography>r3voc Management UI</Typography>
                        <Box>
                            {user ? (
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    gap={1}
                                    alignItems="center"
                                >
                                    <Typography>
                                        Logged in as {user.username}
                                    </Typography>
                                    <Button
                                        onClick={logout}
                                        size="small"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Logout
                                    </Button>
                                </Box>
                            ) : (
                                <Link to="/login">Login</Link>
                            )}
                        </Box>
                    </Box>
                </Container>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4 }} component="main">
                <Outlet />
            </Container>
        </>
    );
};

export default RootLayout;
