import React, { useCallback, useEffect, useState } from 'react';
import MySwiper from '../components/MySwiper';
import { View } from 'react-native-ui-lib';
import { CoreApi } from '../API/Api';

export default function Home() {
    const [index, setIndex] = useState(0)
    const [cards, setCards] = React.useState([])
    const [instance, setInstance] = React.useState({})
    const [load, setLoad] = React.useState(false)

    useEffect(async () => {
        const instance = (await CoreApi).getInstance()
        setInstance(instance)
        if (cards.length === 0) {
            LoadMatches(instance)
        }
    }, [])

    const LoadMatches = (instance) =>
        instance.getMatch(5)
            .then(r => {
                console.log("Success", r.status)
                if (r.status === 200) {
                    const data = r.data.data;
                    const persons = data.map(x => x.personal)
                    setCards([...cards, ...persons])
                    setLoad(true)
                }
            })
            .catch(e => {
                console.log("Error", e)
            })


    const onSwiped = useCallback((inx) => {
        const i = inx + 1
        console.log("inx", i)
        if (i % 4 === 0) {
            console.log("mod 3")
            setIndex(i)
            LoadMatches(instance)
        }
    })
    const onSwipedRight = useCallback((inx, card) => {
        instance.like(card.uuid, false)
        .then(r => {
            console.log("Success like", r.status)
        })
        .catch(e => {
            console.log("Error like", e)
        })
    })

    const onSwipedLeft = useCallback((inx, card) => {
        instance.dislike(card.uuid)
        .then(r => {
            console.log("Success dislike", r.status)
        })
        .catch(e => {
            console.log("Error like", e)
        })
    })

    return (
        <View flex>
            {load && <MySwiper onSwiped={onSwiped} onSwipedRight={onSwipedRight} onSwipedLeft={onSwipedLeft} index={index} cards={cards}></MySwiper>}
        </View>
    )
}