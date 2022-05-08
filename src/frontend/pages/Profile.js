import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ConfirmationDialog from "../components/ConfirmationDialog";
import PostObj from "../../backend/PostObj";
import MyPost from "../components/MyPost";
import PostDialog from "../components/PostDialog";
import {removeWhiteSpace} from "../../backend/Util";
import {createUserPost, getUserPosts, getPostComments} from "../../backend/UserPost";
import {deleteUserAcc} from "../../backend/UserAccount";
import {curUser} from "../../backend/UserObj";


function shrinkUsername(name) {
    return {
        children: `${name.split(' ')[0][0]}`
    };
}

const Profile = (props) => {
    const {history} = props;

    const [postOBJs, setPostOBJs] = useState([]);

    async function init() {
        let stateUpdateArr = [];
        const posts = await fetchPosts();

        console.log(posts);

        for (let i = posts.length - 1; i >= 0; i--) {
            let curPost = posts[i];
            let comments = await fetchComments(curPost.PostID);
            console.log(comments);

            let curPostOBJ = new PostObj(curPost.PostID, curUser.Username, curPost.Title, curPost.Content, curPost.Likes, comments);

            stateUpdateArr.push(curPostOBJ);
        }
        setPostOBJs(stateUpdateArr);
    }

    async function fetchPosts() {
        return await getUserPosts(curUser.UserID);
    }

    async function fetchComments(postID) {
        return await getPostComments(postID);
    }

    useEffect(init, [])

    // confirmation dialog to delete account
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = React.useState(false);

    const handelOpenConfirmationDialog = () => {
        setIsConfirmationDialogOpen(true);
    }

    const handelCloseConfirmationDialog = () => {
        setIsConfirmationDialogOpen(false);
    }

    const handelConfirmationDialogAction = async () => {
        let isSuccess = await deleteUserAcc(curUser.UserID);

        if (isSuccess) {
            setIsConfirmationDialogOpen(false);
            history.push("/SignIn")
        } else {
            console.log("Something went wrong!");
        }
    }

    // post dialog to create post
    const [isPostDialogOpen, setIsPostDialogOpen] = React.useState(false);

    const handleOpenPostDialog = () => {
        setIsPostDialogOpen(true);
    }

    const handleClosePostDialog = () => {
        setIsPostDialogOpen(false);
    }

    const handlePostDialogAction = async (title, content, errDialog) => {
        let entTitle = removeWhiteSpace(title);
        let entContent = removeWhiteSpace(content);

        console.log({
            title: entTitle,
            content: entContent
        });

        if (entTitle === "" || entContent === "") {
            errDialog.textContent = "Title and content are required.";
            errDialog.hidden = false;
        } else if (entTitle.length > 45) {
            errDialog.textContent = "Title is too long. (max: 45 characters)";
            errDialog.hidden = false;
        } else if (entContent.length > 1000) {
            errDialog.textContent = "Content is too long. (max: 1000 characters)";
            errDialog.hidden = false;
        } else {
            let isSuccess = await createUserPost(curUser.UserID, entTitle, entContent);

            if (isSuccess) {
                await init();
                setIsPostDialogOpen(false);
            } else {
                console.log("Something went wrong!");
            }
        }
    }

    return (
        <div>
            <Container>
                <Box sx={{display: "flex", flexDirection: "column", margin: "auto", alignItems: "center"}}>
                    <CardContent>
                        <Avatar
                            {...shrinkUsername(curUser.Username)}
                            sx={{width: 100, height: 100, bgcolor: "#e4b109"}}
                        />
                    </CardContent>

                    <Typography variant="h3">{curUser.Username}</Typography>

                    <Box sx={{display: "flex", flexDirection: "column", margin: "auto", alignItems: "center"}}>
                        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">x friends</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">|</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">{postOBJs.length} posts</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">|</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography variant="subtitle1">x comments</Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <br/>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handelOpenConfirmationDialog}
                    >
                        Delete Account
                    </Button>
                </Box>

                <br/>
                <br/>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleOpenPostDialog}
                >
                    Create New Post
                </Button>

                <br/>
                <br/>

                {postOBJs.map((postObj, index) => (
                    <>
                        <MyPost
                            key={index}
                            postID={postObj.postID}
                            username={postObj.username}
                            title={postObj.title}
                            content={postObj.content}
                            likes={postObj.likes}
                            comments={postObj.comments}
                            init={init}
                        />
                        <br/>
                    </>
                ))
                }

            </Container>

            <ConfirmationDialog
                isOpen={isConfirmationDialogOpen}
                handleClose={handelCloseConfirmationDialog}
                handleAction={handelConfirmationDialogAction}
                title="Delete Account?"
                message={"Are you sure you want to delete your account? All your data such as posts, comments, and likes will be permanently removed."}
                button1={"Cancel"}
                button2={"Delete"}
            />

            <PostDialog
                title="Create Post"
                button1="Cancel"
                button2="Post"
                isOpen={isPostDialogOpen}
                handleClose={handleClosePostDialog}
                handleAction={handlePostDialogAction}
            />
        </div>
    );
};

export default Profile;
