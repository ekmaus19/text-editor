
import React, { Component } from 'react';
import ReactModal from 'react-modal'
import { Button, Icon, Header, Form, Table, Image } from 'semantic-ui-react'

const url = 'http://134f1802.ngrok.io';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalNew: false,
      showModalOld: false,

      newDocTitle: null,
      newPassword: null,
      newPasswordCheck: null,

      existingDocId: null,
      // set USER ID as props in login
      user: null,
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

  // fetch(url + '/docs/owned', {
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
    const { newDocTitle, newPassword, newPasswordCheck } = this.state;
    var _this = this
    fetch(url + '/doc/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newDocTitle,
        password: newPassword,
        // passwordCheck: newPasswordCheck,
        owner: this.props.userid,
        lastEdit: new Date(),
      })
    }).then((response) => {
      console.log(response);
      return response.json();
    })
    .then((responseJson) => {
      console.log(responseJson);
      if (responseJson.success) {
        _this.props.history.push('/editor/' + responseJson.user._id)
      }
      return responseJson;
    })
    .catch((err) => {
      throw err;
    });
    this.handleCloseModalNew();
  }

  addDoc(id) {
    fetch(url + '/doc/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userid: this.props.userid
      })
    })
    .then(res => res.json())
    .then(documents => this.setState({documents})).catch(err => {throw err});
  }

  render() {
    const docList = () => {
      return this.state.documents.map(doc => {
        <Table.Body>
          <Table.Row className="singleDoc">
            <Table.Cell>
              <Header as='h4'>
                <Icon className="file alternate outline"/>
                <Header.Content>
                  {doc.title} {this.props.match.params.userId}
                  <Header.Subheader>{doc.lastEdit}</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      });
    };

    return (
      <div>
        <div className="dashboardContain">
          <div id="documentDash">
            <p id="docDashHead"><Icon className='copy outline'/><b>Dashboard:</b></p>

            <div className="button" id="docDashButtonMain">
              <Button onClick={() => this.handleOpenModalNew()}>Create New Document</Button>
              <Button onClick={() => this.handleOpenModalOld()}>Add Existing Doc</Button>
            </div>

            <ReactModal className="Modal" isOpen={this.state.showModalNew}>
              <div>
                <Header>The Modal Lives!</Header>
                <Form>
                  <Form.Field>
                    {/* Make a New Document */}
                    <label>Document Name: </label>
                    <input type='text' placeholder="Name..." onChange={(e) => (this.setState({newDocTitle:e.target.value}))}></input>
                  </Form.Field>

                  <Form.Field>
                    <label>Set Document Password: </label>
                    <input type='password' placeholder="Password..." onChange={(e) => (this.setState({newPassword:e.target.value}))}></input>
                  </Form.Field>

                  <Form.Field>
                    <label>Check Password: </label>
                    <input type='password' placeholder="Check Password..." onChange={(e) => (this.setState({newPasswordCheck:e.target.value}))}></input>
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
