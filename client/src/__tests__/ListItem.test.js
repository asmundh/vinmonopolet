import React from 'react';
import ListItem from "../components/ListView/ListItem";
import renderer from 'react-test-renderer';

    // Snapshot-test
test('snapshot-test: vin', ()=> {
   const tree = renderer.create(<ListItem type={"vin"}/>).toJSON();
   expect(tree).toMatchSnapshot();
});

   // Snapshot-test
test('renders correctly: øl', ()=> {
   const tree = renderer.create(<ListItem type={"øl"}/>).toJSON();
   expect(tree).toMatchSnapshot();
});

  // Snapshot-test
test('renders correctly: lager', ()=> {
   const tree = renderer.create(<ListItem type={"lager"}/>).toJSON();
   expect(tree).toMatchSnapshot();
});