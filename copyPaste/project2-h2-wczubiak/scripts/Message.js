import * as React from 'react';

var Message = React.createClass({
    render() {
        return (
            <div className="message">
                <span>{this.props.user} :</span>
                <span> {this.props.text}</span>
                </div>
            )
    }
    
})