'use strict';
 
var React = require('react-native');
var ListBooksView = require('./ListBooksView');

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
 
class FeaturedBooks extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'Featured Books',
            component: ListBooksView
            }}/>            
        );
    }
}
 
module.exports = FeaturedBooks;