import React from 'react';
import logo from './logo.svg';
import { Container,Grid } from '@material-ui/core';
import Editor from "./components/editor";
import Sidebar from "./components/sidebar";
import { tsConstructorType } from '../node_modules/@babel/types';
import 'bootstrap/dist/css/bootstrap.min.css';
const fire=require('firebase');



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      notes:[],
      selectedId:'',
      selectedNote:'',
    }
  }
 componentDidMount(){

  fire.firestore().collection('notes').orderBy('timestamp').onSnapshot(
    serverUpdate => {
      const notes = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
    
      this.setState({ notes: notes });
    });
 
 }
setOnsamedelete=()=>{

  if(this.state.selectedId==='')
  {
    let l=this.state.notes.length
    console.log(l);
    console.log('length');
    if(l>0)
    {
      this.setState({
        selectedId:l-1,
        selectedNote:this.state.notes[l-1]
      });
    }
  }
}


  render()  {
   
    
    return (  
     <Container maxWidth='xl' className='bg-dark' >
     <Grid container  className='bg-secondary'>
     <Grid item xs={12} lg={2}>
  <Sidebar 
      selectedId={this.state.selectedNoteIndex}
      notes={this.state.notes}
      deleteNote={this.deleteNote}
      selectNote={this.selectNote}
      newNote={this.newNote}/>
      
     </Grid>
     <Grid item xs={12} lg={10}>
    <Editor
    selectedNote={this.state.selectedNote}
    note={this.state.notes}
    selectedId={this.state.selectedId}
    noteUpdate={this.noteUpdate}/>
    </Grid>
    </Grid>
 </Container>
    );
  }

  noteUpdate = (id, noteObj) => {
    fire
      .firestore() 
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        //timestamp: fire.firestore.FieldValue.serverTimestamp()
      });
  }
  deleteNote=async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
   
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if(this.state.selectedId === noteIndex ) {
      if(this.state.notes.length > 0)
      {this.selectNote(this.state.notes[noteIndex===0?0:this.state.selectedId - 1],noteIndex===0?0: this.state.selectedId - 1);}
      else{
      this.setState({ selectedId: null, selectedNote: null});}
    } else {
     
      this.state.notes.length > 0 ?
      this.selectNote(this.state.notes[this.state.selectedId===0?0:(this.state.selectedId?this.state.selectedId - 1:0)], this.state.selectedId===0?0:(this.state.selectedId?this.state.selectedId - 1:0)) :
      this.setState({ selectedId: null, selectedNote: null});
    }

    fire.firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }

selectNote=(node,index)=>{

this.setState({
  selectedId:index,
  selectedNote:node
});

}

newNote=async (title)=>{
  const note={
    title:title,
    body:'',

  }
  const newf= await fire.firestore().collection('notes').add(
    {
      title:note.title,
      body:note.body,
      timestamp: fire.firestore.FieldValue.serverTimestamp()
    }
);
const newid=newf.id;
console.log('notees');
console.log(this.state.notes);



const newNoteid=this.state.notes.indexOf(this.state.notes.filter(c=>c.id===newid)[0]);

this.setState({
  selectedId:newNoteid,
  selectedNote:this.state.notes[newNoteid]
});

}

}
 
export default App;

