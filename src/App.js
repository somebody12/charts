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
			<Item name="Yandere" />
			<Item name="Yangire" />
			<Item name="Dandere" />
			<Item name="Christmas Cake" />
			<Item name="Genki" />
			<Item name="Tomboy" />
			<Item name="Gyaru" />
			<Item name="Ojou-sama" />
			<Item name="Carefree" />
			<Item name="Delinquent" />
			<Item name="Onee-san" />
			<Item name="Retard" />
			<Item name="Slut" />
			<Item name="Pure" />
			<Item name="Chuunibyou" />
          </Section>
          <Section title="Relationship" desc="Partner relationship">
            <Item name="Sibling" desc="Partner relationship" />
            <Item name="Parent" />
			<Item name="Child" />
			<Item name="Cousin" />
			<Item name="Teacher" />
			<Item name="Senpai" />
			<Item name="Kouhai" />
			<Item name="SO" />
			<Item name="Friend" />
          </Section>
		  <Section title="Age">
			<Item name="Loli" />
			<Item name="Shota" />
			<Item name="High School Girl" />
			<Item name="High School Boy" />
			<Item name="MILF" />
			<Item name="DILF" />
			<Item name="GMILF" />
			<Item name="GDILF" />
		  </Section>
		  <Section title="Physical Characteristics">
			<Item name="Flat Chest" />
			<Item name="Normal Breasts" />
			<Item name="Large Breasts" />
			<Item name="Beach Ball Breasts" />
			<Item name="Oppai Loli" />
			<Item name="Inverted Nipples" />
			<Item name="Phimosis" />
			<Item name="Baby Dick" />
			<Item name="Normal Dick" />
			<Item name="Gigantic Dick" />
			<Item name="BBW" />
			<Item name="BBM" />
			<Item name="Ugly Female" />
			<Item name="Ugly Male" />
			<Item name="Hairy (pubic)" />
			<Item name="Hairy (body)" />
			<Item name="Tanned" />
			<Item name="Tanlines" />
			<Item name="Musclegirl" />
			<Item name="Muscleguy" />
			<Item name="Pregnant" />
			<Item name="Kemonomimi" />
			<Item name="Monstergirls" />
			<Item name="Other humanoid race (Orc, Goblin, etc.)" />
			<Item name="Zombie" />
			<Item name="Moe Anthropomorphization" />
			<Item name="Robot" />
			<Item name="Doll" />
			<Item name="Cripple" />
			<Item name="Amputee" />
			<Item name="Unusual Pupils" />
			<Item name="Heterochromia" />
			<Item name="Fang" />
			<Item name="Tattoos" />
		  </Section>
          <Section title="Outfit">
            <Item name="Goth Loli" />
            <Item name="Military" />
			<Item name="Wedding Dress" />
			<Item name="Magical Girl" />
			<Item name="Idol" />
			<Item name="Nurse" />
			<Item name="Police Uniform" />
			<Item name="Miko" />
			<Item name="China Dress" />
			<Item name="Waitress" />
			<Item name="Latex" />
			<Item name="Lingerie" />
			<Item name="Bunny Girl" />
			<Item name="Other Animal Girl" />
			<Item name="Naked Apron" />
			<Item name="Maid" />
			<Item name="School Uniform" />
			<Item name="Microkini" />
			<Item name="Bikini" />
			<Item name="One Piece" />
			<Item name="School Swimsuit" />
			<Item name="Leotard" />
			<Item name="Dress" />
			<Item name="Winter Clothes" />
			<Item name="Business Attire" />
			<Item name="Bodysuit" />
			<Item name="Cosplay" />
			<Item name="Crossdressing" />
          </Section>
		  <Section title="Specific Articles of Clothing">
			<Item name="Skirt" />
			<Item name="Hoodie" />
			<Item name="Glasses" />
			<Item name="Scarf" />
			<Item name="Shimapan" />
			<Item name="Nopan" />
			<Item name="Bloomers" />
			<Item name="Spats" />
			<Item name="Thighhighs" />
			<Item name="Zettai Ryouiki" />
			<Item name="Pantyhose/Tights" />
			<Item name="Pasties" />
			<Item name="Baind-aids" />
			<Item name="Frills" />
			<Item name="Laces" />
			<Item name="Eyepatch" />
			<Item name="Choker" />
			<Item name="Boots" />
			<Item name="Garter Belt" />
			<Item name="Piercings" />
			<Item name="Hotpants" />
			<Item name="Gloves" />
			<Item name="T-Shirt" />
			<Item name="Sweater" />
			<Item name="Ribbons" />
			<Item name="Jeans" />
		  </Section>
          <Section title="Objects">
            <Item name="Vibrator" />
            <Item name="Dildo" />
			<Item name="Double-sided Dildo" />
			<Item name="Strap-on" />
			<Item name="Blindfold" />
			<Item name="Whip" />
			<Item name="Gag" />
			<Item name="Condom" />
			<Item name="Buttplug" />
			<Item name="Machine" />
			<Item name="Lotion/Oil" />
			<Item name="Anal Beads" />
			<Item name="Nose Hook" />
			<Item name="Leash" />
			<Item name="Collar" />
			<Item name="Braces" />
			<Item name="Speculum" />
			<Item name="Prostate Stimulator" />
			<Item name="Clamps" />
			<Item name="Clothespins" />
			<Item name="Onahole" />
			<Item name="Chastity Device" />
          </Section>
		  <Section title="Sex Acts">
			<Item name="Hand Holding" />
			<Item name="Missionary" />
			<Item name="Kissing" />
			<Item name="Groping" />
			<Item name="Clothed Sex" />
			<Item name="Fingering" />
			<Item name="Masturbation" />
			<Item name="Cowgirl" />
			<Item name="Doggy" />
			<Item name="Spitroast" />
			<Item name="Thigh Sex" />
			<Item name="Paizuri" />
			<Item name="Hotdogging" />
			<Item name="Handjob" />
			<Item name="Blowjob" />
			<Item name="Footjob" />
			<Item name="Deepthroat" />
			<Item name="Gokkun" />
			<Item name="Bukkake" />
			<Item name="Cumming Inside" />
			<Item name="Cumming Outside" />
			<Item name="Leglock" />
			<Item name="Cunnilingus" />
			<Item name="Facesitting" />
			<Item name="Pegging" />
			<Item name="Squirting" />
			<Item name="Anal" />
			<Item name="Rimjob" />
			<Item name="Biting" />
			<Item name="Double Penetration" />
			<Item name="Triple Penetration" />
			<Item name="Cervix Penetration" />
			<Item name="Double Anal" />
			<Item name="Double Vaginal" />
			<Item name="Stomach Deformation" />
			<Item name="Large Insertion" />
		  </Section>
		  <Section title="Participants">
			<Item name="Sole Female" />
			<Item name="Sole Male" />
			<Item name="FFM" />
			<Item name="MMF" />
			<Item name="Gangbang" />
			<Item name="Orgy" />
			<Item name="Futa on Male" />
			<Item name="Futa on Female" />
		  </Section>
		  <Section title="Scenario">
			<Item name="Vanilla" />
			<Item name="Harem" />
			<Item name="Femdom" />
			<Item name="Sleeping" />
			<Item name="Defloration" />
			<Item name="Voyeurism" />
			<Item name="Filming" />
			<Item name="Age Difference" />
			<Item name="Size Difference" />
			<Item name="Netorare" />
			<Item name="Netori" />
			<Item name="Cheating" />
			<Item name="Swinging" />
			<Item name="Prostitution" />
			<Item name="Impregnation" />
			<Item name="Drugs" />
			<Item name="Drunk" />
			<Item name="Hypnosis" />
			<Item name="Mind Control" />
			<Item name="Blackmail" />
			<Item name="Time Stop" />
			<Item name="Possession" />
			<Item name="Corruption" />
			<Item name="Kidnapping" />
			<Item name="Mindbreak" />
			<Item name="Rape" />
			<Item name="Reverse Rape" />
			<Item name="Forced Orgasm" />
			<Item name="Masochism" />
			<Item name="Sadism" />
			<Item name="Bondage" />
			<Item name="Humiliation" />
			<Item name="Exhibitionism" />
			<Item name="Meat Toilet" />
			<Item name="Body Writing" />
			<Item name="Slave" />
			<Item name="Public Use" />
			<Item name="Human Cattle" />
			<Item name="Accidental Sex" />
			<Item name="Chikan" />
			<Item name="Orgasm Denial" />
			<Item name="Chastity" />
		  </Section>
		  <Section title="Body Parts">
			<Item name="Ass" />
			<Item name="Breasts" />
			<Item name="Midriff" />
			<Item name="Feet" />
			<Item name="Hips" />
			<Item name="Armpits" />
			<Item name="Back" />
			<Item name="Collarbone" />
			<Item name="Hands" />
			<Item name="Legs" />
		  </Section>
		  <Section title="Hair">
		  </Section>
		  <Section title="Reactions">
			<Item name="Crying" />
			<Item name="Blushing" />
			<Item name="Embarrassment" />
			<Item name="Emotionless" />
			<Item name="Ahegao" />
			<Item name="Gagging" />
		  </Section>
		  <Section title="Transformation">
			<Item name="Age Regression" />
			<Item name="Age Progression" />
			<Item name="Inflation" />
			<Item name="Breast Expansion" />
			<Item name="Weight Gain" />
			<Item name="Gender Bender" />
			<Item name="Body Swap" />
			<Item name="Feminization" />
			<Item name="Moral Degeneration" />
		  </Section>
		  <Section title="Extreme/Niche">
			<Item name="Piss" />
			<Item name="Scat" />
			<Item name="Vomit" />
			<Item name="Snot" />
			<Item name="Farts" />
			<Item name="Guro" />
			<Item name="Vore" />
			<Item name="Ryona" />
			<Item name="CBT" />
			<Item name="Snuff" />
			<Item name="Necrophilia" />
			<Item name="Drowning" />
			<Item name="Giantess" />
			<Item name="Birth" />
			<Item name="Unbirth" />
			<Item name="Bestiality" />
			<Item name="Lactation" />
			<Item name="Nipple Fuck" />
			<Item name="Tickling" />
			<Item name="Spanking" />
			<Item name="Living Clothes" />
			<Item name="Absorption" />
			<Item name="Smegma" />
			<Item name="Fisting" />
			<Item name="Cannibalism" />
			<Item name="Smell" />
			<Item name="Sweat" />
			<Item name="Asphyxiation" />
		  </Section>
        </Chart>
      </Router>
    );
  }
}

export default App;
