import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class Query extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e, { name, value }) =>
        this.props.onChange({name, value});

    parseOptions = () => {
        let optionArray = [{key: (-1), value: null, text: this.props.placeholder}];
        this.props.options.map((option, i) => optionArray.push({key: i, value: option, text: option}));
        return optionArray;
    };

    render() {
        return (
            <Form.Dropdown placeholder={this.props.placeholder} fluid search selection style={this.props.style}
                           name={this.props.name} options={this.parseOptions()} onChange={this.handleChange}
                           id ={`query-${this.props.name}`}/>
        );
    }
}

export default Query;
