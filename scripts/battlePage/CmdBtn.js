import * as React from 'react';

import { Socket } from './Socket';

export class CmdBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    
    
    handleSubmit(event) {
        event.preventDefault();

        console.log('Move button clicked');

    }

    componentDidMount(){
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <button>Move1</button>
                    <button>Move2</button>
                    <button>Move3</button>
                    <button>Move4</button>
                </form>
            </div>
        );
    }
}
