import React from 'react';
import { StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import { SafeAreaView } from 'react-native-safe-area-context';
import AdCard from "../components/AdCard"
import { Colors, View, Card, CardProps, Button, Text, DateTimePicker } from 'react-native-ui-lib';

export default function MySwiper(props) {
    const { onSwipedLeft, onSwipedRight, onSwiped, index, cards } = props
    const swiper = React.useRef()
    const ad = React.useRef()
    renderCard = (card, index) => {
        return (
            <View>
                <AdCard card={card}></AdCard>
            </View>
        )
    }

    console.log("MySwiper rerender", cards.length)
    return (
        <View style={styles.container}>
            <Swiper flex
                ref={swiper}
                // onSwipedLeft={() => console.log('left')}
                // onSwipedTop={() => console.log('top')}
                // onSwipedBottom={() => console.log('bottom')}
                //onTapCard={this.swipeLeft}
                onSwiped={onSwiped}
                onSwipedRight={onSwipedRight}
                onSwipedLeft={onSwipedLeft}
                cards={cards}
                cardVerticalMargin={20}
                verticalSwipe={false}
                //cardIndex={this.state.cardIndex}
                key={cards.length}
                renderCard={renderCard}
                stackSize={5}
                cardIndex={index}
                infinite={false}
            //onSwipedAll={this.onSwipedAllCards}

            //stackSeparation={15}

            // animateOverlayLabelsOpacity
            // animateCardOpacity
            // swipeBackCard
            >
            </Swiper>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    card: {
        // flex: 1,
        // borderRadius: 4,
        // borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    },
    done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent'
    }
});