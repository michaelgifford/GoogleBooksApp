'use strict';


var FAKE_DATA = [
    {volumeInfo: {title: 'Fake Title', authors: "Fake Author", imageLinks: {thumbnail: 'http://books.google.com/books/content?id=PCDengEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'}}}
];
 
var React = require('react-native');

var {
    Image,
    StyleSheet,
    Text,
    View,
    Component,
    ListView,
    TouchableHighlight
   } = React;
 
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
        padding: 10
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

    renderItem(item) {
       return (
            <TouchableHighlight>
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

    constructor(props) {
           super(props);
           this.state = {
               dataSource: new ListView.DataSource({
                   rowHasChanged: (row1, row2) => row1 !== row2
               })
           };
       }

    componentDidMount() {
        var items = FAKE_DATA;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items)
        });
       }   

    render() {
    var item = FAKE_DATA[0];
        return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderItem.bind(this)}
            style={styles.listView}/>
        );
    }
}
 
module.exports = ListBooksView;