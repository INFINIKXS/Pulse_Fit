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
                        width: s(43),
                        height: vs(69),
                        borderRadius: s(21.5),
                        backgroundColor: isSelected ? '#00B300' : '#171717', // Green if selected, Dark if not
                        marginRight: s(9),
                        opacity: pressed ? 0.9 : 1,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }
                ]}
            >
                {/* Day Name */}
                <Text style={{
                    color: isSelected ? '#000' : '#FFF', // Black text on Green background
                    fontFamily: 'FamiljenGrotesk-Regular',
                    fontSize: ms(13),
                    fontWeight: '400',
                    position: 'absolute',
                    top: vs(12),
                    letterSpacing: 0.05,
                }}>
                    {dayName}
                </Text>

                {/* Selection Ellipse Container */}
                <View style={{
                    position: 'absolute',
                    top: vs(33), // Matches XML (33dp)
                    width: s(30),
                    height: s(30),
                    borderRadius: 999,
                    overflow: 'hidden', // Ensure clipping on Android
                    backgroundColor: isSelected ? '#FFFFFF' : 'transparent', // White circle if selected
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {/* Day Number */}
                    <Text style={{
                        color: isSelected ? '#000' : '#FFF', // Black on White, White on Dark
                        fontFamily: 'FamiljenGrotesk-Regular',
                        fontSize: ms(20),
                        // Remove absolute top here, let it center in the ellipse
                        includeFontPadding: false,
                        textAlignVertical: 'center',
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
