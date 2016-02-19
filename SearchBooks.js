'use strict';
 
var React = require('react-native');
var SearchBooksView = require('./SearchBooksView');
 
var {
    StyleSheet,
    NavigatorIOS,
    Component
   } = React;
 
var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
 
class SearchBooks extends Component {
    render() {
        return (
        <NavigatorIOS
                style={styles.container}
                initialRoute={{
                title: 'Search Books',
                component: SearchBooksView
        }}/> 
        );
    }
}
 
module.exports = SearchBooks;