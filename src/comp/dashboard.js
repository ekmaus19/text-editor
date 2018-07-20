import React, { Component } from 'react';
import {HashRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import ReactModal from 'react-modal'
import { Button, Icon, Header, Form, Table, Image } from 'semantic-ui-react'

const url = 'http://127.0.0.1:1337';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalNew: false,
      showModalOld: false,

      title: '',
      password: '',
      owner: '',
      edited: '',
      documents: [],
    };
  }

  // for creating a new document
  handleOpenModalNew() {
    this.setState({showModalNew: true});
  }

  handleCloseModalNew() {
    this.setState({showModalNew:false});
  }

  // for accessing existing documents
  handleOpenModalOld() {
    this.setState({showModalOld: true});
  }

  handleCloseModalOld() {
    this.setState({showModalOld:false});
  }

  componentDidMount() {
  fetch(url + '/dashboard', {
    method: 'GET',
    credentials: 'same-origin',
  }).then(res => res.json())
  .then(json => {
    this.setState({
      documents: this.state.documents.concat(json),
      owner: this.props.match.params.userId
    })
  })
  .catch((err) => {
    throw err
  })
}
  //
  // fetch(url + '/docs/collabed', {
  //   method: 'GET',
  // }).then(res => res.json())
  // .then(json => {
  //   console.log(json)
  //   this.setState({
  //     documents: [...documents, json]
  //   })
  // })
  // .catch((err) => {
  //   throw err
  // })

  createDoc() {
    const { title, password } = this.state;
    const _this = this
    fetch(url + '/dashboard/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        title: this.state.title,
        password: this.state.password,
        owner: this.state.owner,
        edited: this.state.edited,
      })
    }).then((response) => {
      console.log('1', response);
      return response.json();
    })
    .then((responseJson) => {
      console.log('2', responseJson)
      if (responseJson) {
        this.handleCloseModalNew();
        _this.props.history.push('/dashboard/' + responseJson.user._id)
      }
      return responseJson;
    })
    .catch((err) => {
      throw err;
    });
  }

  addDoc(docId) {
    fetch(url + '/dashboard/' + docId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        docId: this.state.docId
      })
    })
    .then(res => res.json())
    .then((json) => {
      this.setState({documents: [...this.state.documents, json]})
      if (json.success) {
        _this.props.history.push('/editor/' + json.document._id)
      }
    })
    .catch(err => {throw err});
  }

  getDoc(docId) {
    const _this = this
    _this.props.history.push('/editor/' + docId)
}

  render() {
    const docList = () => {
      console.log("ghghh",this.state.documents)
      return this.state.documents.map(doc => {
        console.log(doc)
        return (<Table.Body key={doc._id}>
          <Table.Row className="singleDoc">
            <Table.Cell>
              <Header as='h4'>
                <Icon className="file alternate outline"/>
                {/* <Link to={{ pathname: '/editor' }}> */}
                <Header.Content
                  onClick={() => this.getDoc(doc._id)}
                  >
                  {doc.title}
                  <Header.Subheader>{doc.owner}</Header.Subheader>
                </Header.Content>
                {/* </Link> */}
              </Header>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      )});
    };

    return (
      <div>
        <div className="dashboardContain">
          <div id="documentDash">
            <p id="docDashHead"><Icon className='copy outline'/><b>Dashboard</b></p>

            <div className="button" id="docDashButtonMain">
              <Button onClick={() => this.handleOpenModalNew()}>Create New Document</Button>
              <Button onClick={() => this.handleOpenModalOld()}>Add Existing Doc</Button>
            </div>

            {ReactModal.setAppElement('body')}

            <ReactModal className="Modal" isOpen={this.state.showModalNew}>
              <div>
                <Header>New Document</Header>
                <Form>
                  <Form.Field>
                    {/* Make a New Document */}
                    <label>Document Name: </label>
                    <input type='text' placeholder="Name..." onChange={(e) => (this.setState({title:e.target.value}))}></input>
                  </Form.Field>

                  <Form.Field>
                    <label>Set Document Password: </label>
                    <input type='password' placeholder="Password..." onChange={(e) => (this.setState({password:e.target.value}))}></input>
                  </Form.Field>

                  {/* buttons */}
                  <div>
                    <Button onClick={() => this.createDoc()}>Create Doc</Button>
                    <Button onClick={() => this.handleCloseModalNew()}>Cancel</Button>
                  </div>
                </Form>

              </div>
            </ReactModal>

            <ReactModal className="Modal" isOpen={this.state.showModalOld}>
              <div className="modal-dialog" role="document">

                <Form>
                  <Form.Field>
                    <label>Input existing document ID: </label>
                    <input type='text' placeholder="Paste existing ID here..." onChange={(e) => (this.setState({existingDocId:e.target.value}))}></input>
                  </Form.Field>

                  <div>
                    <Button onClick={() => this.addDoc()}>Add</Button>
                    <Button onClick={() => this.handleCloseModalOld()}>Cancel</Button>
                  </div>

                </Form>
              </div>
            </ReactModal>

            <div className="displayDocList">
              <h4>Files:</h4>
              <div className='docList'>
                {/* User Documents Display */}
                <Table className="docList">
                  {docList()}
                </Table>

              </div>
            </div>
          </div>
        </div>
      </div>
)
}
}

export default Dashboard;
