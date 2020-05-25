import React from 'react';

export default class IdleDemo extends React.Component {
  supportNotification = 'Notification' in window;
  supportIdleDetection = 'IdleDetector' in window;

  constructor(props) {
    this.state = {
      permission: 'unknown',
      userState: 'default',
      screenState: 'default',
    }
  }

  componentDidMount() {
    if (!this.supportNotification || !this.supportIdleDetection) {
      return;
    }

    if (Notification.permission !== 'denied' || Notification.permission === 'default') {
      Notification.requestPermission(function (permission) {
        if (permission === 'granted') {
          this.setState({
            permission: 'granted',
          }, () => {
            new Notification('Hi there!');
          });
        } else {
          this.startDetection();
        }
      });
    } else {
      this.startDetection();
    }
  }

  async startDetection() {
    try {
      const controller = new AbortController();
      const signal = controller.signal;
    
      const idleDetector = new IdleDetector();
      idleDetector.addEventListener('change', () => {
        const userState = idleDetector.userState;
        const screenState = idleDetector.screenState;
        console.log(`Idle change: ${userState}, ${screenState}.`);

        this.setState({
          userState,
          screenState,
        });
      });
      
      await idleDetector.start({
        threshold: 10000,
        signal,
      });
      console.log('IdleDetector is active.');
    } catch (err) {
      console.error(err.name, err.message);
    }
  }

  render() {
    if (this.supportNotification && this.supportIdleDetection) {
      return (<div>
        <div>{`Notification is supported`}</div>
        <div>{`IdleDetection is supported`}</div>
        <div>{`Idle change: ${this.state.userState}, ${this.state.screenState}`}</div>
      </div>);
    }

    return (<div>
      <div>{`Notification is not supported`}</div>
      <div>{`IdleDetection is not supported`}</div>
    </div>);
  }
}