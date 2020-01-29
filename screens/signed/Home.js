import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, Image, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DrawerToggler from './../../components/DrawerToggler'
import Styles from './../../Styles'
import Search from './home/map/Search'
import MapView from "react-native-maps"
import { translate } from './../../locales'
import axios from 'axios'

var image = "https://source.unsplash.com/random/400x400"

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class screens extends Component {
  state = {
    places : [{}],
    markers: [
      {
        coordinate: {
          latitude: "",
          longitude: "",
        },
        title: "",
        description: "",
        image: {uri : 'https://source.unsplash.com//400x400/?shop,city'} ,
        id : 0
      },
    ],
    region: {
      latitude: "-23.58927255",
      longitude: "-46.60616207",
      latitudeDelta: 0.0043,
      longitudeDelta: 0.0034
    },
    isLoading : true
  };

  static navigationOptions ={
    title : translate('discover'),
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomColor : '#fff'
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }

  signOutAsync = () => {
    axios.get('https://codelinepds.herokuapp.com/logout')
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  navToEstablishment = (id) => {
    this.props.navigation.navigate('establishment', {
      id: id
    });
  }

  renderMarkers = (places)=>{
    var markers = []
    this.setState({isLoading : false})
    places.map((place, i) =>{

      var pLatitude  = place.latitude
      var pLongitude = place.longitude
      pLatitude.insertAt(2, ".");
      pLongitude.insertAt(2, ".")

      markers[i] = {
            coordinate: {
              latitude: pLatitude,
              longitude: pLongitude,
            },
            title: place.name,
            description: place.description,
            image : {uri : 'https://source.unsplash.com//400x400/?shop,city'},
            id : place.id
          }
    })
    this.setState({markers: markers})
  }

  loadEstablishments () {
    if(this.state.isLoading) {
      return(
        <View style={{flex : 1,justifyContent : 'center', alignContent : 'center,', height:CARD_HEIGHT, width: wp(100)}}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )
    } else {

        if(this.state.markers == 0) {
          return (
              <View style={{flex : 1,justifyContent : 'center', alignContent : 'center,', height:CARD_HEIGHT, width: wp(100)}}>
                <Text style={{            
                  fontSize : 37,
                  fontWeight : 'bold',
                  textAlign : 'center',
                  width : 'auto',
                  padding : 8
                }}>
                    {translate("nothing")}
                </Text>
              </View>
          )
        } else {

        const markers = this.state.markers.map((marker, index) => (
            <TouchableOpacity style={styles.card} key={marker.id} onPress={()=>{this.navToEstablishment(marker.id)}}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))

        return (
          <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          contentContainerStyle={styles.endPadding}
        >
          {markers}
        </Animated.ScrollView>
        )
    }
  }
  }

  componentWillMount () {
    this.index = 0;
    this.animation = new Animated.Value(0);

  }

  
  componentDidMount() {
    axios.get('https://codelinepds.herokuapp.com/api/establishment').then(res => {
      this.renderMarkers(res.data)
    }).catch(err => {
      this.signOutAsync()
    })

    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <DrawerToggler drawer="asdasdasd" navigation={this.props.navigation}/>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <View 
          style={styles.scrollView}
        >
          <Text style={{
            fontSize : 40,
            fontWeight : 'bold',
            textAlign : 'left',
            width : 'auto',
            padding : 8
          }}>
            {translate('discover')}
          </Text>
          {this.loadEstablishments()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    paddingBottom : 30,
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor :  '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 19
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "rgb(245, 245, 245)",
    marginHorizontal: 10,
    borderRadius : 15,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderRadius : 10
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 13,
    marginTop: 5,
    fontWeight: "bold",
    color : '#001'
  },
  cardDescription: {
    fontSize: 12,
    color: "#001",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0, 161, 99, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0, 161, 99, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(0, 161, 99, 0.5)",
  },
});