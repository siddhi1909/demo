import React from 'react';
import renderer from 'react-test-renderer';
import LoginComponent from './LoginComponent';
import store from "../redux/store";
import {Provider} from "react-redux";

it('< LoginComponent /> renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><LoginComponent/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});
