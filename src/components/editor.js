import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { placeholder } from '../../node_modules/@babel/types';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyle } from '@material-ui/core/styles';
import debounce from '.././helper';
import { Divider, Button, Grid, OutlinedInput, InputLabel, FormControl } from '@material-ui/core';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      title: '',
      id: '',
    }
  }

  componentDidMount() {
    this.setState({
      //  text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id
    });
  }

  componentDidUpdate() {
    console.log(this.props.selectedNote);

    if (this.props.selectedNote !== null) {
      console.log('null');

      if (this.props.selectedNote.id !== this.state.id) {
        this.setState({
          text: this.props.selectedNote.body,
          title: this.props.selectedNote.title,
          id: this.props.selectedNote.id
        });
      }
    }
    else {
      if (this.state.title !== '') {
        this.setState({
          text: '',
          title: '',
          id: '',
        });
      }
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container direction='column'>
        <Grid item container direction='row' justify='center'>
          <Grid item sm={12} className='bg-primary'>
            <BorderColorIcon ></BorderColorIcon>

            <input type="text"
              placeholder="Note Title...." style={{ text: 'center' }}
              value={this.state.title != '' ? this.state.title : ''}
              onChange={this.updateTitle}
              className="bg-secondary text-white justify-center sm">
            </input>
          </Grid>
        </Grid>
        <Grid item>
          <ReactQuill
            value={this.state.text}
            onChange={this.updateBody || ''}>
          </ReactQuill>
        </Grid>
      </Grid>
    );
  }

  updateTitle = async (text) => {
    await this.setState({ title: text.target.value });
    this.update();
  }
  updateBody = async (text) => {
    await this.setState({ text: text });
    this.update();
  }
  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    })
    console.log('dete');
    console.log(this.state.id);
  }, 1500);
}

export default Editor;