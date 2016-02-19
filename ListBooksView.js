'use strict';

/*
var FAKE_DATA = [
    {volumeInfo: {title: 'Fake Title', authors: "Fake Author", imageLinks: {thumbnail: 'http://books.google.com/books/content?id=PCDengEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'}}}
];
*/
var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';
 
var React = require('react-native');
var ItemDetail = require('./ItemDetail');

var {
    Image,
    StyleSheet,
    Text,
    View,
    Component,
    ListView,
    TouchableHighlight,
    ActivityIndicatorIOS
   } = React;
 
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: 10
    },
    listView: {
       backgroundColor: '#f1f1f1',
       marginTop: 65
    },
    separator: {
       height: 1,
       backgroundColor: '#dddddd'
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    viewLoading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    }
});
 
class ListBooksView extends Component {

    constructor(props) {
       super(props);
       this.state = {
           isLoading: true,
           dataSource: new ListView.DataSource({
               rowHasChanged: (row1, row2) => row1 !== row2
           })
       };
   }

    componentDidMount() {
       this.fetchData();
   }

    fetchData() {
       fetch(REQUEST_URL)
       .then((response) => response.json())
       .then((responseData) => {
           this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.items),
               isLoading: false
           });
       })
       .done();
   }

    showItemDetail(item) {
       this.props.navigator.push({
           title: item.volumeInfo.title,
           component: ItemDetail,
           passProps: {item}
       });
   }
  
    renderItem(item) {
       return (
            <TouchableHighlight onPress={() => this.showItemDetail(item)}  underlayColor='#dddddd'>
                <View>
                    <View style={styles.container}>
                        <Image
                            source={{uri: item.volumeInfo.imageLinks.thumbnail}}
                            style={styles.thumbnail} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{item.volumeInfo.title}</Text>
                            <Text style={styles.author}>{item.volumeInfo.authors}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
       );
   }

    render() {
           if (this.state.isLoading) {
               return this.renderLoadingView();
           }
     
           return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem.bind(this)}
                    style={styles.listView}/>
            );
    }

        
    renderLoadingView() {
        return (
            <View style={styles.viewLoading}>
                <ActivityIndicatorIOS
                    size='large'/>
                <Text>
                    Loading...
                </Text>
            </View>
        );
    }

}
 
module.exports = ListBooksView;