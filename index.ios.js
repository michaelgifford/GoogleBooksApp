/**
 * Unnamed Google Books iOS App
 * Michael Gifford
 * https://github.com/michaelgifford
 */

'use strict';
 
var React = require('react-native');
var FeaturedBooks = require('./FeaturedBooks');
var SearchBooks = require('./SearchBooks');
 
var {
    AppRegistry,
    TabBarIOS,
    Component
   } = React;
 
class GoogleBooksApp extends Component {
 
    constructor(props) { // constructor sets state for googlebooksapp class
        super(props);
        this.state = {
            selectedTab: 'featured' 
        };
    }
 
    render() {
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}> 
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'featured'}
                    systemIcon={'featured'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'featured'
                        });
                    }}>
                    <FeaturedBooks/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'search'}
                    systemIcon={'search'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'search'
                        });
                    }}>
                    <SearchBooks/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}
 

AppRegistry.registerComponent('GoogleBooksApp', () => GoogleBooksApp);
