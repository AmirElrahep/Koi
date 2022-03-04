import React from "react";
import NavBar from "./frontend/components/NavBar";
import Toolbar from "@mui/material/Toolbar";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {Redirect, Route, Switch} from "react-router-dom";
import SignUp from "./frontend/pages/SignUp";
import SignIn from "./frontend/pages/SignIn";
import RecoverPassword from "./frontend/pages/RecoverPassword";
import ResetPassword from "./frontend/pages/ResetPassword";
import Home from "./frontend/pages/Home";
import Friends from "./frontend/pages/Friends";
import Chats from "./frontend/pages/Chats";
import Profile from "./frontend/pages/Profile";
import { initUsers } from "./backend/Login";


const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#e4b109"
        },
        background: {
            default: "#4b5059"
        }
    }
});

    //API

    initUsers()

    //const URL = "http://localhost:4000"

    // Prepare state hook for welcome message
    const [welcomeMessage, setWelcomeMessage] = useState("")

    // Prepare state hook for users list
    // It specifies the shape of usersList state
    const [usersList, setUsersList] = useState([])

    // Create async function for fetching welcome message
    const fetchMessage = async () => {
        // Use Fetch API to fetch '/api' endpoint
        const message = await fetch("http://localhost:4000/api")
        .then(res => res.text())
        .catch(err => console.error(err)) // process incoming data

        // Update welcomeMessage state
        setWelcomeMessage(message)
    }

    // Create async function for fetching users list
    const fetchUsers = async () => {
        const users = await fetch("http://localhost:4000/users/all")
        .then(res => {
            const JSONData = res.json().then(data => data)
            return JSONData
        }).catch(err => console.error(err)) // Process the incoming data

        // Update usersList state
        setUsersList(users)
    }

    // Use useEffect to call fetchMessage() on initial render
    useEffect(() => {
        fetchMessage()
        fetchUsers()
    }, [])

    //console.log("Message: " + welcomeMessage)
    //console.log("User List: " + JSON.stringify(usersList))

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div>
                {/* starting at the sign-in in page */}
                <Route exact from="/" render={props => <SignIn {...props} />}>
                    <Redirect to="/SignIn"/>
                </Route>

                <Switch>
                    <Route exact from="/SignIn" render={props => <SignIn {...props} />}/>
                    <Route exact from="/SignUp" render={props => <SignUp {...props} />}/>
                    <Route exact from="/RecoverPassword" render={props => <RecoverPassword {...props} />}/>
                    <Route exact from="/ResetPassword" render={props => <ResetPassword {...props} />}/>

                    <div>
                        <NavBar/>
                        {/* empty toolbar to push content away fom underneath the navbar */}
                        <Toolbar/>
                        <br/>

                        <Switch>
                            <Route exact from="/Home" render={props => <Home {...props} />}/>
                            <Route exact from="/Friends" render={props => <Friends {...props} />}/>
                            <Route exact path="/Chats" render={props => <Chats {...props} />}/>
                            <Route exact path="/Profile" render={props => <Profile {...props} />}/>
                        </Switch>
                    </div>
                </Switch>
            </div>
        </ThemeProvider>
    );
}

export default App;
