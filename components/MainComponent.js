import React, { Component } from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import Reservation from './ReservationComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Favorites from './FavoriteComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const HeaderOptions = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff"            
    }
};

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <View style={styles.drawerHeader}>
            <View style={{flex: 1}}>
                <Image 
                    source={require('./images/logo.png')}
                    style={styles.drawerImage}
                />
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>
                    Ristorante Con Fusion
                </Text>
            </View>
        </View>
        <DrawerItemList {...props}/>
    </ScrollView>
);

const MenuIcon = (props) => {
    return(
        <Icon 
            name='menu' 
            size={24}
            color='white'
            onPress={() =>
                props.navigation.toggleDrawer()}
        />
    );
}

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <MenuIcon navigation={navigation} /> 
                        )
                    })
                }
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <MenuIcon navigation={navigation} /> 
                        )
                    })
                }
            />           
        </HomeNavigator.Navigator>
    );
}

const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen(){
    return(
        <ContactNavigator.Navigator
            initialRouteName='Contact'
            screenOptions={HeaderOptions}
        >
            <ContactNavigator.Screen 
                name="Contact"
                component={Contact}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <MenuIcon navigation={navigation} /> 
                        )
                    })
                }
            />
        </ContactNavigator.Navigator>
    );
}

const AboutNavigator = createStackNavigator();

function AboutNavigatorScreen(){
    return(
        <AboutNavigator.Navigator
            initialRouteName='About'
            screenOptions={HeaderOptions}
        >
            <AboutNavigator.Screen 
                name="About"
                component={About}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <MenuIcon navigation={navigation} /> 
                        )
                    })
                }
            />
        </AboutNavigator.Navigator>
    );
}

const ReservationNavigator = createStackNavigator();

function ReservationNavigatorScreen() {
    return(
        <ReservationNavigator.Navigator
            initialRouteName='Reservation'
            screenOptions={HeaderOptions}
        >
            <ReservationNavigator.Screen
                name="Reservation"
                component={Reservation}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <MenuIcon navigation={navigation} /> 
                        )
                    })
                }
            />           
        </ReservationNavigator.Navigator>
    );
}

const FavoritesNavigator = createStackNavigator();

function FavoritesNavigatorScreen() {
    return(
        <FavoritesNavigator.Navigator
            initialRouteName='Favorites'
            screenOptions={HeaderOptions}
        >
            <FavoritesNavigator.Screen
                name="Favorites"
                component={Favorites}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <MenuIcon navigation={navigation} /> 
                        )
                    })
                }
            />           
        </FavoritesNavigator.Navigator>
    );
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer() {
    return(
        <MainNavigator.Navigator 
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor:'#D1C4E9'
            }}
            drawerContent={props => <CustomDrawerContentComponent {...props}/>}
        >
            <MainNavigator.Screen name="Home" component={HomeNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }} 
            />
            <MainNavigator.Screen name="About Us" component={AboutNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='list'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <MainNavigator.Screen name="Contact Us" component={ContactNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <MainNavigator.Screen name="Reserve Table" component={ReservationNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor, focused}) => (
                        <Icon
                            name='cutlery'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <MainNavigator.Screen name="Favorites" component={FavoritesNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor, focused}) => (
                        <Icon
                            name='heart'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
        </MainNavigator.Navigator>
    );
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
      }

    render() {
    
        return (
            <NavigationContainer>
                <MainNavigatorDrawer/>           
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Main);