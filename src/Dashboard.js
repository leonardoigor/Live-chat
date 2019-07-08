import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// list
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// chips
import Chip from '@material-ui/core/Chip';
// button
import Button from '@material-ui/core/Button';
// textFiled
import TextField from '@material-ui/core/TextField';

import { CTX } from './Store'



const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicsWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid gray'
    },
    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '20px',
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%'
    },
    flexChat: {
        display: 'flex',
        alignItems: 'center',
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    // CTX Store
    const { allChats, sendChatAction, user } = React.useContext(CTX);
    const topics = Object.keys(allChats);

    // local state
    const [activeTopic, changeActiveTopic] = React.useState(topics[0])
    const [textValue, changeText] = React.useState('');



    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    Chat app
            </Typography>
                <Typography variant="h5" component="h5">
                    {activeTopic}
                </Typography>
                <div>
                    <div className={classes.flex}>
                        <div className={classes.topicsWindow}>
                            <List>
                                {
                                    topics.map(topic => (
                                        <ListItem onClick={(e) => changeActiveTopic(e.target.innerText)} ket={topic} button>
                                            <ListItemText primary={topic}></ListItemText>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </div>
                        <div className={classes.chatWindow}>
                            {
                                allChats[activeTopic].map((chat, i) => (
                                    <div className={classes.flexChat} key={i}>
                                        <Chip label={chat.from} className={classes.chip} color="primary" />
                                        <Typography variant='body1' gutterBottom>{chat.msg}</Typography>
                                        <br /><br />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className={classes.flex}>
                        <TextField
                            label="Send a chat"
                            className={classes.chatBox}
                            value={textValue}
                            onChange={e => changeText(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => {
                                sendChatAction({ from: user, msg: textValue, topic: activeTopic })
                                changeText('')
                            }}>
                            Send
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    )
} 