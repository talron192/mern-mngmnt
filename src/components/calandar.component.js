import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './style.css';
import AppointmentModal from './AppointmentModal';

import Modal from '../../node_modules/react-modal';

const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
  }
};

export default class Calandar extends Component {
  state = {
    date: new Date(),
    ModalIsOpen:false
  }

  onChange = date => this.setState({ date })
  onClickDay = day => {
    console.log('day', day);
    console.log('day type', typeof day);
    this.setState({ModalIsOpen:true});
  }
  hoverDay = day => {
    console.log('hover', day);
  }
  render() {
    return (
      <div>
        <Calendar className={['calandar']}
          onChange={this.onChange}
          value={this.state.date}
          onClickDay={this.onClickDay}
          onActiveDateChange={this.hoverDay}
        />
        <Modal onRequestClose={this.closeEventsHistory}
          style={customStyles}

          isOpen={this.state.ModalIsOpen}
          // onAfterOpen={this.eventsHistory}
          >
          {/* <EventsHistoryModal eventsHistory={this.state.commentsArr} id={this.state.obj._id} /> */}
          <AppointmentModal ></AppointmentModal>

        </Modal>
      </div>
    );
  }
}