import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import { removeHTMLTags } from '.././helper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Divider, Button, ListItemSecondaryAction, List, ListItemAvatar, Avatar, Dialog } from '@material-ui/core';






class Sideitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: ''

        }

    }





    delete = () => {
        if (window.confirm(`Are you sure you want to delete: ${this.props.note.title}`)) {
            this.props.deleteNote(this.props.note);


        }
    }





    render() {

        return (
            <div>
                <ListItem onClick={() => this.props.selectNote(this.props.note, this.props.id)}
                    selected={this.state.selectedIndex === this.props.id}>

                    <ListItemAvatar>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.note.title}
                        secondary={removeHTMLTags(this.props.note.body.substring(0, 20)) + (removeHTMLTags(this.props.note.body.substring(0, 20)).length > 0 ? "....." : '')}>
                    </ListItemText>
                    <ListItemSecondaryAction>

                        <DeleteIcon onClick={this.delete} />

                    </ListItemSecondaryAction>

                </ListItem>
                <Divider />
            </div>

        );
    }
}

export default Sideitem;