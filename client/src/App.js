import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import ListView from './components/ListView';
import Search from './components/Search';
import Query from './components/Query';
import { Form, Loader } from 'semantic-ui-react';
import {debounce} from 'lodash';
import {fetchItems, syncSearchQuery, loadMoreItems} from './actions';

// Fetch values for Query-fields. These are hard-coded in uniqueData.json
const json = require('./uniqueData.json');
const volumeOptions = json.volum, countryOptions = json.land, typeOptions = json.type;

class AppContent extends Component {

    // Bindings
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    // Fetch 10 initial items immediately upon loading app.
    componentWillMount(){
        this.props.fetch_items(this.generateQuery()).then(()=> setTimeout(this.handleScroll(), 3000));
    };

    // event-listeners for scrolling. Enables dynamic loading upon reaching page bottom.
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    // Generates REST-query based on current search query and sorting in Redux-state
    generateQuery = () => {
        return "http://it2810-46.idi.ntnu.no:12000/Product?" +
            ((!this.props.search_query.name) ? '' : `&Varenavn=${this.props.search_query.name}`) +
            ((!this.props.search_query.volume) ? '' : `&Volum=${this.props.search_query.volume}`) +
            ((!this.props.search_query.country) ? '' : `&Land=${this.props.search_query.country}`) +
            ((!this.props.search_query.type) ? '' : `&Varetype=${this.props.search_query.type}`) +
            (this.props.newQuery && this.props.limit > 10 ? `&limit=${this.props.limit}` : `&page=${this.props.limit/10}&limit=10`) +
            ((!this.props.sorting.column) ? '&sorting=Pris' : `&sorting=${this.props.sorting.column}`) +
            ((this.props.sorting.direction === 'ascending') ? '&order=asc' : '&order=desc');
    };

    // Handler that is run upon inputting new data into Query or Search components.
    handleChange = debounce(({ name, value }) => { this.props.sync_query({name, value}).then(
            () => this.props.fetch_items(this.generateQuery()))}, 300);

    // Handler that is run upon sorting items in ListView
    handleSort = () => {
        this.props.fetch_items(this.generateQuery())
    };

    // Handler that is run when scrolling. Will load more items (increase pagination limit) if close to bottom
    handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop+200
            >= document.documentElement.scrollHeight
            && !(this.props.repeatQueries > 1)
            && !this.props.isLoading
        ) {
            this.props.load_more_items().then(()=>{
                this.props.fetch_items(this.generateQuery()) // Run fetch_items async upon state update.
            });
        }
    };

    render() {

        return (
            <div className="App">
                <img className="App-logo" src={require("./resources/vinmonopolet.png")} alt={"Vinmonopolet"}/>
                <Form style={{width: "100%"}}>
                    <Form.Group>
                        <Search isLoading={this.props.isLoading} onChange={this.handleChange}/>
                        <Query name="volume" placeholder="Volum" options={volumeOptions}
                               onChange={this.handleChange} style={{width: "80px"}}/>
                        <Query name="country" placeholder="Land" options={countryOptions}
                               onChange={this.handleChange} style={{width: "150px"}}/>
                        <Query name="type" placeholder="Type" options={typeOptions}
                               onChange={this.handleChange} style={{width: "150px"}}/>
                    </Form.Group>
                </Form>
                <div>
                    <ListView onSort={this.handleSort}/>
                    <br/>
                    <Loader active={this.props.isLoading} inline='centered' />
                </div>
                <br/>
            </div>
        );
    }
}

// Redux-props for accessing state and dispatching actions.
const mapState = state => ({
    search_query: state.search_query,
    isLoading: state.isLoading,
    sorting: state.sorting,
    limit: state.limit,
    newQuery: state.newQuery,
    repeatQueries: state.repeatQueries
});

const mapDispatch = dispatch => ({
    sync_query: query => dispatch(syncSearchQuery(query)),
    fetch_items: url => dispatch(fetchItems(url)),
    load_more_items: () => dispatch(loadMoreItems()),
});

export default connect(
    mapState,
    mapDispatch
)(AppContent);

