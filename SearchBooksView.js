'use strict';
 
var React = require('react-native');
var ResultsSearch = require('./ResultsSearch');
var {
    StyleSheet,
    View,
    Text,
    Component,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS
    } = React;
 
var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        padding: 10
    },
    searchInput: {
        height: 36,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        borderWidth: 1,
        flex: 1,
        borderRadius: 4,
        padding: 5
    },
    button: {
        height: 36,
        backgroundColor: '#1269F3',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 15
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    instructions: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 15
    },
    fieldLabel: {
        fontSize: 15,
        marginTop: 15
    },
    errorMessage: {
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 15,
        color: 'red'
    }
});
 
class SearchBooksView extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            itemAuthor: '',
            itemTitle: '',
            isLoading: false,
            errorMessage: ''
        };
    }
 
    render() {
        var spinner = this.state.isLoading ?
            ( <ActivityIndicatorIOS
                hidden='true'
                size='large'/> ) :
            ( <View/>);
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>Search by title and/or author</Text>
                <View>
                    <Text style={styles.fieldLabel}>Title:</Text>
                    <TextInput style={styles.searchInput} onChange={this.itemTitleInput.bind(this)}/>
                </View>
                <View>
                    <Text style={styles.fieldLabel}>Author:</Text>
                    <TextInput style={styles.searchInput} onChange={this.itemAuthorInput.bind(this)}/>
                </View>
                <TouchableHighlight style={styles.button}
                                    underlayColor='#f1c40f'
                                    onPress={this.searchItems.bind(this)}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
                {spinner}
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            </View>
        );
    }
 
    itemTitleInput(event) {
        this.setState({ itemTitle: event.nativeEvent.text });
    }
 
    itemAuthorInput(event) {
        this.setState({ itemAuthor: event.nativeEvent.text });
    }
 
    searchItems() {
        this.fetchData();
    }
 
    fetchData() {
 
        this.setState({ isLoading: true });
 
        var baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
        if (this.state.itemAuthor !== '') {
            baseURL += encodeURIComponent('inauthor:' + this.state.itemAuthor);
        }
        if (this.state.itemTitle !== '') {
            baseURL += (this.state.itemAuthor === '') ? encodeURIComponent('intitle:' + this.state.itemTitle) : encodeURIComponent('+intitle:' + this.state.itemTitle);
        }
 
        console.log('URL: >>> ' + baseURL);
        fetch(baseURL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ isLoading: false});
                if (responseData.items) {
 
                    this.props.navigator.push({
                        title: 'Search Results',
                        component: ResultsSearch,
                        passProps: {items: responseData.items}
                    });
                } else {
                    this.setState({ errorMessage: 'No results found'});
                }
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    errorMessage: error
                }))
            .done();
    }
 
}
 
module.exports = SearchBooksView;