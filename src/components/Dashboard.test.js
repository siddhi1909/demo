import React from 'react';
import renderer from 'react-test-renderer';

import Dashboard from './Dashboard';
import store from "../redux/store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

it('< Dashboard /> renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><Router><Dashboard/></Router></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});