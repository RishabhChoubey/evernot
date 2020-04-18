import React, { Component } from 'react';
import Sideitem from './sideitem';
import List from '@material-ui/core/List';
import { Divider, Button, Grid, OutlinedInput, InputLabel, FormControl } from '@material-ui/core';

class Sidebae extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create: false,
            title: ''
        }
    }


    handlebutton = () => {
        this.setState({
            create: !this.state.create,
            title: ''
        });
    }
    updateTitle = (text) => {
        this.setState({ title: text });
    }
    newNote = () => {
        this.props.newNote(this.state.title);
        this.setState({ title: null, create: false });
    }

    render() {
        let classname = "btn ";
        classname += (this.state.create) ? "btn-block bg-danger" : 'btn-block bg-warning';
        return (
            <Grid container direction='column'  >
                <Grid item xs={12}  >
                    {this.state.create ? '' : <Button className={classname} onClick={this.handlebutton}>{this.state.create ? 'cancel' : 'create new note'}</Button>}

                    {
                        this.state.create ?
                            <div>
                                <input type='text'
                                    class="form-control form-control-lg  "
                                    placeholder='Note'
                                    onKeyUp={(e) => this.updateTitle(e.target.value)}>
                                </input>

                                <Grid container direction='row' alignItems='center' justify='center'  >
                                    <Grid item xl={12} sm={6} alignItems='center'>
                                        <Button
                                            className='btn btn-block bg-success'
                                            onClick={this.newNote}>create</Button></Grid><Divider />
                                    <Grid item xl={12} sm={6} alignItems='center'>
                                        {this.state.create ? <Button className={classname} onClick={this.handlebutton}>{this.state.create ? 'cancel' : 'create new note'}</Button> : ''}
                                    </Grid>
                                </Grid>
                            </div> :
                            null
                    }
                    <Divider></Divider>
                </Grid>
                <Grid item xs={12} container direction='column' >
                    <List >
                        {this.props.notes.map((note, index) => {

                            return (<Sideitem key={index} note={note}
                                id={index}
                                deleteNote={this.props.deleteNote}
                                selectNote={this.props.selectNote}
                            />
                            );
                        })
                        }
                    </List>
                </Grid>
            </Grid>
        );
    }
}

export default Sidebae;