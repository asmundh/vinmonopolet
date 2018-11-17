import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class Search extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e, { name, value }) =>
        this.props.onChange({name, value});

    render() {
        return (
            <Form.Input icon={this.props.isLoading ? '' : 'search'}  loading={this.props.isLoading}
                        name={"name"} placeholder='Søk...' style={{width: "100%"}}
                        onChange={this.handleChange} id="query-search"/>
        );
    }
}

export default Search;
