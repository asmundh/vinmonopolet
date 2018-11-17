import React from 'react';
import LineChart from '../components/LineChart'
import ShallowRenderer from 'react-test-renderer/shallow';



// Testing if the chart gets rendered with the standard properties.
test('checking standard properties', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<LineChart/>);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.children.props.options.title.text).toEqual('data');
    expect(result.props.children.props.options.title.display).toEqual('Number of units');
    expect(result.props.children.props.options.legend.display).toEqual(true);
    expect(result.props.children.props.options.legend.position).toEqual("right");
});

// Testing if the chart gets correctly rendered with non-standard properties.
test('checking non-standard properties', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<LineChart legendPosition={"bottom"} topText={"Data analysis"} displayLegend={false}/>);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.children.props.options.title.text).toEqual('Data analysis');
    expect(result.props.children.props.options.title.display).toEqual('Number of units');
    expect(result.props.children.props.options.legend.display).toEqual(false);
    expect(result.props.children.props.options.legend.position).toEqual("bottom");
});