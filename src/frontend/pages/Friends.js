import React, {useState} from "react";
import SwipeableViews from "react-swipeable-views";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MyFriend from "../components/MyFriend";
import FriendObj from "../../backend/FriendObj";
import {InputBase} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import Paper from "@mui/material/Paper";


let friends = [new FriendObj("dellmultiple", 15), new FriendObj("ibmdifference", 20),
    new FriendObj("volkswagonbream", 25), new FriendObj("nikemelt", 30),
    new FriendObj("ebayclassic", 35), new FriendObj("googlewillow", 40)];


function TabPanel(props) {
    const {children, value, index} = props;

    return (
        <Typography>
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </Typography>
    );
}

const Friends = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Container>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Friends"/>
                    <Tab label="Friend Requests"/>
                    <Tab label="Find Friends"/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel>
                    {/* search field */}
                    <Paper
                        component="form"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center'}}
                    >
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Search Friends"
                        />
                        <IconButton sx={{p: '10px'}} aria-label="search">
                            <SearchIcon style={{color: "#b1b3b9"}}/>
                        </IconButton>
                    </Paper>
                    <br/>
                    {/* friends */}
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        {friends.map((friend) => (
                            <Grid item xs={12} sm={6}>
                                <MyFriend username={friend.username} friends={friend.mutualFriends}/>
                            </Grid>
                        ))}
                    </Grid>
                </TabPanel>
                <TabPanel>
                    Friend Requests
                </TabPanel>
                <TabPanel>
                    Find Friends
                </TabPanel>
            </SwipeableViews>
        </Container>
    );
};

export default Friends;
