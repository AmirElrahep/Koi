import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { removeWhiteSpace } from "../../backend/Util";
import { resetPassword } from "../../backend/User";

const ResetPassword = (props) => {
    const {history} = props;

    const handleButtonClick = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const entCode = removeWhiteSpace(data.get("code"))
        const entPass = removeWhiteSpace(data.get("newPassword"))
        const entConfPass = removeWhiteSpace(data.get("confirmPassword"))

        console.log({
            code: entCode,
            password: entPass,
            confirmPassword: entConfPass,
        })

        let errDialog = document.getElementById("invalidCredentialsRecoverPass")

        const recPassState = history.location.state
        const userEmail = recPassState.userEmail
        const genPassCode = recPassState.passcode.toString()

        /*

        console.log("resetpassword.state.passcode: " + genPassCode)
        console.log("resetpassword.entCode: " + entCode)
        console.log("genPassCode === entCode: " + genPassCode === entCode)

        */

        if (entCode === "" || entPass === "" || entConfPass === "") {
            errDialog.hidden = false
            errDialog.textContent = "Please fill in all fields"
        } else {
            if (entCode !== genPassCode) {
                errDialog.hidden = false
                errDialog.textContent = "Invalid passcode!"
            } else {
                if (entPass !== entConfPass) {
                    errDialog.hidden = false
                    errDialog.textContent = "Passwords don't match"
                } else {
                    console.log("Correct passcode and passwords match!")
                    const passReset = await resetPassword(userEmail, entPass)
                    history.push("/SignIn");
                }
            }
        }

    };

    return (
        <Grid container component="main" sx={{height: '100vh'}}>
            <CssBaseline/>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://images.hdqwalls.com/wallpapers/koi-fishes-minimal-4k-vh.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: '#e4b109'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Container component="form" noValidate onSubmit={handleButtonClick} sx={{mt: 1}} maxWidth="sm">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="code"
                            label="Code"
                            name="code"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="newPassword"
                            label="New Password"
                            type="password"
                            name="newPassword"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                        />
                        <Typography id={"invalidCredentialsRecoverPass"} fontSize={12} color={"red"} paddingTop={1.5} textAlign={"center"} hidden={true}>
                            Invalid Something
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Reset Password
                        </Button>
                    </Container>
                </Box>
            </Grid>
        </Grid>
    );
}

export default ResetPassword;
