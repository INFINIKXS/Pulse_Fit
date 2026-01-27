import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useScaling } from '../utils/scaling';

interface CalendarStripProps {
    onSelectDate?: (date: Date) => void;
    initialDate?: Date;
}

export const CalendarStrip: React.FC<CalendarStripProps> = ({ onSelectDate, initialDate }) => {
    const { s, vs, ms } = useScaling();
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate || new Date());

    // Generate next 14 days
    const dates = useMemo(() => {
        const tempDates = [];
        const today = new Date();
        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            tempDates.push(date);
        }
        return tempDates;
    }, []);

    const formatDate = (date: Date) => {
        const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
        return {
            dayName: days[date.getDay()],
            dayNumber: date.getDate(),
        };
    };

    const isSameDate = (d1: Date, d2: Date) => {
        return d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    };

    const handlePress = (date: Date) => {
        setSelectedDate(date);
        if (onSelectDate) {
            onSelectDate(date);
        }
    };

    const renderItem = ({ item }: { item: Date }) => {
        const isSelected = isSameDate(item, selectedDate);
        const { dayName, dayNumber } = formatDate(item);

        return (
            <Pressable
                onPress={() => handlePress(item)}
                style={({ pressed }) => [
                    styles.card,
                    {
                        width: s(60),
                        height: vs(85),
                        borderRadius: s(30),
                        backgroundColor: isSelected ? '#00B300' : '#111',
                        marginRight: s(12),
                        opacity: pressed ? 0.9 : 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: vs(8)
                    }
                ]}
            >
                <Text style={{
                    color: isSelected ? '#000' : '#FFF',
                    fontFamily: 'FamiljenGrotesk-Regular',
                    fontSize: ms(13),
                    fontWeight: isSelected ? '600' : '400'
                }}>
                    {dayName}
                </Text>

                <View style={{
                    width: s(36),
                    height: s(36),
                    borderRadius: s(18),
                    backgroundColor: isSelected ? '#FFF' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: isSelected ? '#000' : '#FFF',
                        fontFamily: 'FamiljenGrotesk-Bold', // Use Bold for the number
                        fontSize: ms(18)
                    }}>
                        {dayNumber}
                    </Text>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={{ height: vs(90) }}>
            <FlatList
                horizontal
                data={dates}
                renderItem={renderItem}
                keyExtractor={(item) => item.toISOString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: s(20) }} // Match PADDING from screens
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        // Shared styles if any
    },
});
