import { expect } from "chai";
import React from "react";
import { shallow, configure } from "enzyme";

import Adapter from "enzyme-adapter-react-16";

import App from "../src/components/app";

configure({ adapter: new Adapter() });


describe("<App/>", () => {
  it("renders one <h1> tag", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("h1")).to.have.length(1);
  });
});
