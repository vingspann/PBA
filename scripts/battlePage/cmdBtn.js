import * as React from 'react';

import { Socket } from './Socket';

export class cmdBtn extends React.Component {
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
            <div style = "display: flex; flex-direction: row; justify-content: center;">
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" id="move1" /><button>Move1</button>
                    <input type="submit" id="move2" /><button>Move2</button>
                    <input type="submit" id="move3" /><button>Move3</button>
                    <input type="submit" id="move4" /><button>Move4</button>
                </form>
            </div>
        );
    }
}
