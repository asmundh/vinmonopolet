import React from 'react';
import BarChart from '../components/BarChart'
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import ListItem from "../components/ListView/ListItem";



// Testing if the chart gets rendered with the standard properties.
test('checking standard properties', () => {
    const renderers = new ShallowRenderer();
    renderers.render(<BarChart/>);
    const result = renderers.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.children.props.options.title.text).toEqual('data');
    expect(result.props.children.props.options.title.display).toEqual('Number of units');
    expect(result.props.children.props.options.legend.display).toEqual(true);
    expect(result.props.children.props.options.legend.position).toEqual("right");
});

// Testing if the chart gets correctly rendered with non-standard properties.
test('checking non-standard properties', () => {
    const renderers = new ShallowRenderer();
    renderers.render(<BarChart
                    legendPosition={"bottom"}
                    topText={"Data analysis"}
                    displayLegend={false}
    />);
    const result = renderers.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.children.props.options.title.text).toEqual('Data analysis');
    expect(result.props.children.props.options.title.display).toEqual('Number of units');
    expect(result.props.children.props.options.legend.display).toEqual(false);
    expect(result.props.children.props.options.legend.position).toEqual("bottom");
});

