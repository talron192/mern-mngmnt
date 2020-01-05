import React, {useContext} from 'react';
import { StateContext } from "./stateContext";

export default class LinearDeterminate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            percentage: 0,
            statusChecked: [],
            modalopened: true
        }
    }

    componentDidUpdate() {


    }

     UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (this.props.modalIsOpened) {
            setTimeout( () => {

                console.log('modal open', this.props.modalIsOpened);
                console.log('statusChecked', this.props.statusChecked.length);
                console.log('statusChecked', this.props.statusChecked);

                console.log('precent', Math.round(0 + (this.props.statusChecked.length / (this.props.statusLength)) * 100));
                nextState.percentage =  Math.round(0 + (this.props.statusChecked.length / (this.props.statusLength)) * 100);;
                console.log(nextState.percentage);
                return;

            })

        }

         console.log('nextProps', nextProps);
         console.log('nextState', nextState);
        if (nextProps.statusChecked.length == 0) nextState.percentage =  0;

        if (nextProps.statusChecked.length > nextState.statusChecked.length) {
            nextState.statusChecked =  nextProps.statusChecked;
            nextState.percentage =  Math.round(nextState.percentage + (1 / (nextProps.statusLength)) * 100);

        } else if (nextProps.statusChecked.length <= nextState.statusChecked.length && nextProps.statusChecked.length > 0) {

            nextState.statusChecked =  nextProps.statusChecked;
            nextState.percentage =  Math.round(nextState.percentage - (1 / (nextProps.statusLength)) * 100);
        }
        if (nextState.percentage >= 100) nextState.percentage =  100;

    }

    render() {

        return (
            <div>
                <ProgressBar percentage={this.state.percentage} />
            </div>
        )
    }
}

const ProgressBar = (props) => {
    console.log(props.percentage);
    return (
        <div className="progress-bar_" style={{ height: '2em', marginRight: '2em' }}>
            <Filler percentage={props.percentage} />
        </div>
    )
}

const Filler = (props) => {
    return <div className="filler_" style={{ width: `${props.percentage}%` }} ><label style={{ marginTop: '3px' }}>{props.percentage}%</label></div>
}

