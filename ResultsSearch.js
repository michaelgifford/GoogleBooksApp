'use strict';
 
var React = require('react-native');
var ItemDetail = require('./ItemDetail');
var {
    StyleSheet,
    View,
    Text,
    Component,
    TouchableHighlight,
    Image,
    ListView
    } = React;
 
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    listView: {
        backgroundColor: '#F5FCFF'
    },
    cellContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    }
});
 
class ResultsSearch extends Component {
 
    constructor(props) {
        super(props);
 
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.items)
        };
    }
 
    render() {
 
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderItem.bind(this)}
                style={styles.listView}/>
        );
    }
 
    renderItem(item) {
        var imageURI = (typeof item.volumeInfo.imageLinks !== 'undefined') ? item.volumeInfo.imageLinks.thumbnail : '';
 
        return (
            <TouchableHighlight onPress={() => this.showItemDetail(item)}
                                underlayColor='#dddddd'>
                <View>
                    <View style={styles.cellContainer}>
                        <Image
                            source={{uri: imageURI}}
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
 
    showItemDetail(item) {
 
        this.props.navigator.push({
            title: item.volumeInfo.title,
            component: ItemDetail,
            passProps: {item}
        });
    }
 
}
 
module.exports = ResultsSearch;