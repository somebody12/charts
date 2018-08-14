import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import "antd/lib/slider/style/css"; // for css
import { Slider, Row, Col, Tooltip } from "antd";

class Value extends React.Component {
  constructor(props) {
    super(props);
    props.onChange(props.default ? props.default : 5);
  }
  render() {
    return (
      <Slider
        disabled={false}
        onChange={this.props.onChange}
        defaultValue={this.props.default ? this.props.default : 5}
        max={10}
      />
    );
  }
}

class RawItem extends React.Component {
  render() {
    return (
      <div>
        <Tooltip placement="top" title={this.props.desc}>
          <header className="Item-header">
            <h3 className="Item-title">{this.props.name}</h3>
          </header>
        </Tooltip>
        <Value default={this.props.default} onChange={this.props.onChange} />
      </div>
    );
  }
}
class Item extends React.Component {
  onChange = value => {
    console.log(value);
    this.props.onChange({ item: this.props.id, value });
  };

  render() {
    return (
      <Route path={`(.*)/s${this.props.id}/:default`}>
        {({ match }) => (
          <RawItem
            name={this.props.name}
            desc={this.props.desc}
            default={match ? match.params.default : 5}
            onChange={this.onChange}
          />
        )}
      </Route>
    );
  }
}

class Section extends React.Component {
  onChange = ({ value, item }) => {
    if (this.props.onChange)
      this.props.onChange({ section: this.props.id, value, item });
  };
  render() {
    return (
      <div>
        <Tooltip placement="top" title={this.props.desc}>
          <header className="Section-header">
            <h2 className="Section-title">{this.props.title}</h2>
          </header>
        </Tooltip>
        {React.Children.map(this.props.children, (child, index) =>
          React.cloneElement(child, {
            onChange: this.onChange,
            id: this.props.id + index
          })
        )}
      </div>
    );
  }
}

class Chart extends React.Component {
  state = {
    sections: {}
  };

  onChange = ({ value, section, item }) => {
    var st = this.state;
    if (!st.sections[section]) st.sections[section] = {};
    st.sections[section][item] = value;
    this.setState(st);
  };

  render() {
    const numCols = this.props.numCols ? this.props.numCols : 3;
    const span = 24 / numCols;
    const cols = Array.from(Array(numCols).keys()).reverse();
    const url =
      "/" +
      Object.keys(this.state.sections)
        .map(s =>
          Object.keys(this.state.sections[s])
            .map(i => "s" + i + "/" + this.state.sections[s][i])
            .join("/")
        )
        .join("/");
    return (
      <div className="Chart">
        <Switch>
          <Route exact path={url} render={null} /> )} />
          <Route
            render={({ history }) => {
              history.push(url);
              return null;
            }}
          />
        </Switch>
        <header className="Chart-header">
          <h1 className="Chart-title">{this.props.title}</h1>
        </header>
        <Row>
          {cols.map(i => (
            <Col key={i} span={span}>
              {React.Children.map(this.props.children, (child, idx) =>
                React.cloneElement(child, { onChange: this.onChange, id: idx })
              ).slice(
                (i * this.props.children.length) / numCols,
                ((i + 1) * this.props.children.length) / numCols
              )}
            </Col>
          ))}
        </Row>
        <a href={url}>Share </a>
      </div>
    );
  }
}
function fromMap(map) {
  map.keys.map(k => (
    <Section key={k} title={k}>
      {map[k].map(n => (
        <Item key={n} name={n} />
      ))}
    </Section>
  ));
}

class App extends Component {
  render() {
    return (
      <Router>
        <Chart title="Chart">
          <Section title="Personality">
            <Item name="Tsundere" />
            <Item name="Kuudere" />
          </Section>
          <Section title="Outfit">
            <Item name="Goth Loli" />
            <Item name="Military" />
          </Section>
          <Section title="Objects">
            <Item name="Vibrator" />
            <Item name="Dildo" />
          </Section>
          <Section title="Relationship" desc="Partner relationship">
            <Item name="Sibling" desc="Partner relationship" />
            <Item name="Parent" />
          </Section>
        </Chart>
      </Router>
    );
  }
}

export default App;
