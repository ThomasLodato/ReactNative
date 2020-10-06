import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, FlatList, Modal, Button } from 'react-native';
import { Card, Icon, AirbnbRating, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card
                        featuredTitle={dish.name}
                        image={{ uri: baseUrl + dish.image }}>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Icon
                                raised
                                reverse
                                name={ props.favorite ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                            />
                            <Icon 
                                raised
                                reverse
                                name='pencil'
                                type='font-awesome'
                                color='#512DA8'
                                onPress = {() => props.toggleModal()}
                            />
                        </View>
                    </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating
                    readonly
                    ratingCount={5}
                    imageSize={15}
                    style={{paddingVertical: 5, flexDirection: 'row', justifyContent: 'flex-start'}}
                    startingValue={item.rating}
              />
                <Text style={{fontsize: 12}}>{item.rating} Starts</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }

    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: false,
            showModal : false,
            author : String,
            rating : 5,
            comment : String
        }
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal = () => {
        this.setState({
            showModal : !this.state.showModal
        })
    }
    
    handleComment = (dishId) => {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)}
                    toggleModal = {this.toggleModal}
                    onPress={() => this.markFavorite(dishId)}    
                />
                <RenderComments comments={this.props.comments.comments.filter(
                    (comment) => comment.dishId === dishId)} />
                <Modal 
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    style={styles.modal}
                    onDismiss={() => this.toggleModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <Text style={styles.modalTitle}>Leave a Comment</Text>
                    <AirbnbRating
                            count={5}
                            reviews={["Discusting","Bad", "Eatable", "Very Good","Incredible"]}
                            size={40}
                            onFinishRating = {(rating) => this.setState({rating : rating})}
                            defaultRating = {5}
                    />
                    <Input 
                        placeholder = 'Your name'
                        value={this.state.author}
                        onChangeText = {(text) => this.setState({author : text})}
                        leftIcon={
                            <Icon
                                name='user'
                                type='font-awesome'
                                size={24}
                                color='black'
                                containerStyle={{margin: 10}}
                            />
                        }
                    />
                    <Input 
                        placeholder = 'Your comment' 
                        value = {this.state.comment}
                        onChangeText = {(text) => this.setState({comment : text})}
                        leftIcon = {
                            <Icon 
                                name='comments'
                                tyoe='font-awesome'
                                size={24}
                                color='black'
                                containerStyle={{margin: 10}}
                            />
                        }
                    />
                    <Button
                        onPress = {() => this.handleComment(dishId)}
                        color = "#512DA8"
                        title = "Submit Comment"
                        raised
                    />
                    <Button
                        onPress = {() => this.toggleModal()}
                        color = "gray"
                        title = "Cancel" 
                    />
                </Modal>
            </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);