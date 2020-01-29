import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native'

const Colors ={
    HighlightColor : 'rgb(0, 161, 99)'
}

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width : wp(100)
    },
    noHeaderMarginTop : {
        marginTop : 55
    },
    mapContainer : {

    },
    title : {
        fontSize : 48,
        fontWeight : 'bold',
        textAlign : 'left',
        width : wp(90)
    },
    label : {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textInput : {
        backgroundColor : '#f5f5f5',
        borderRadius : 5,
        width: wp(90),
        height : 50
    },
    button : {
        backgroundColor : '#000',
        borderRadius : 5,
        width: wp(90),
        height : 50,
        margin : 'auto',
        marginTop : 10,
        textAlign : 'center',
        alignContent : 'center',
        flex : 1
    },
    buttonText : {
        fontWeight : 'bold',
        textAlign : 'center',
        alignContent : 'center',
        height : 'auto',
        width :'auto',
        marginTop : 'auto',
        marginBottom : 'auto',
        fontSize : 17,
        color : '#fff'
    },
    textButton : {
        width : wp(90),
        textAlign : 'center',
        fontSize : 15,
        padding : 16,
        fontWeight : 'bold'
    },
    map: {
        alignSelf: 'stretch',
        flex : 1
    },
    sidebarTogglerContainer : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11
    },
    sidebarTogger : {
        backgroundColor : '#fff00000',
        zIndex :9,
        margin : 'auto',
        padding : 20,
    },
    sidebarContainer : {
        flex : 1,
        justifyContent: 'center'
    },
    sidebarHeader : {
        height : hp(25),
        backgroundColor : "#fff"
    },
    sidebarLinkContainer : {
        marginTop : 20,
        height : hp(75)
    },
    sidebarUserName : {
        color: 'black',
        fontSize : 35,
        marginTop : 10,
        marginLeft : 4,
        fontWeight : 'bold',
        textAlign : 'left',
        width : wp(90)
    },    
    sidebarLink : {
        marginTop : 13,
        marginLeft : 4,
        padding : 10,
        fontWeight : 'bold',
        textAlign : 'left',
        width : wp(90)
    },
    searchbox : {
        backgroundColor : '#f5f5f5',
        borderRadius : 5,
        margin : 'auto',
        width: wp(100),
        height : 52
    },
    searchResultContainer : {
        width : 280,
        height : 60,
        margin : 'auto',
        backgroundColor : '#f5f5f5',
    },
    coupon : {
        backgroundColor : '#f5f5f5',
        padding : 5,
        width : wp(70),
        height : 100,
        marginTop : 20,
        marginLeft : 'auto',
        marginRight : 'auto',
        justifyContent : 'center',
        alignContent : 'center',
        borderRadius : 8
    },

    //scanner

    bottomBar: {
        position: 'absolute',
        top : 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
        flexDirection: 'row',
      },
      url: {
        flex: 1,
      },
      urlText: {
        color: '#fff',
        fontSize: 20,
      },
      cancelButton: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      cancelButtonText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
      }
})

export default Styles