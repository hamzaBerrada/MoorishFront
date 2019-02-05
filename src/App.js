import React, { Component } from 'react';
import './App.css';
import './Table'
import Table from "./Table";
import Menu from "./Menu";
import AddReference from "./Forms/AddReference";

class App extends Component {

  state = {
    characters: []
  };

  removeCharacter = index => {
    const { characters } = this.state;

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index;
      })
    });
  }

  handleSubmit = character => {
    this.setState({characters: [...this.state.characters, character]});
  }

    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = localStorage.getItem(key);

                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                }
            }
        }
    }

    componentDidMount() { //after rendering
        this.hydrateStateWithLocalStorage();
        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }

    componentWillUnmount() { //after the component is unmounted from the dom
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );

        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }

    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }

  render() {
    const { characters } = this.state;

    return (
        <div className="container">
          <Menu/>
          <h1>Moorish</h1>
          <p>Add a character with a name and a job to the table.</p>
          <Table
              characterData={characters}
              removeCharacter={this.removeCharacter}
          />
          <h3>Add New</h3>
          <AddReference handleSubmit={this.handleSubmit} />
        </div>
    );
  }
}

export default App;
