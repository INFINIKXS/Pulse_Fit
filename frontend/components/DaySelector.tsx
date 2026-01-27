import React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import { useScaling } from '../utils/scaling';

interface DaySelectorProps {
    selectedDays: string[];
    onToggleDay: (day: string) => void;
}

const days = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];

export const DaySelector: React.FC<DaySelectorProps> = ({ selectedDays, onToggleDay }) => {
    const { s, vs, ms } = useScaling();

    const PADDING = s(20);

    // XML Widths mapping as per original file
    const widths: { [key: string]: number } = {
        'Sundays': 81,
        'Mondays': 85,
        'Tuesdays': 87,
        'Wednesdays': 110,
        'Thursdays': 94,
        'Fridays': 71,
        'Saturdays': 91
    };

    const renderItem = ({ item: day }: { item: string }) => {
        const selected = selectedDays.includes(day);
        return (
            <Pressable
                // key={day} // keyExtractor handles this
                style={({ pressed }) => [
                    styles.dayBtn,
                    {
                        width: s(widths[day]),
                        height: vs(40),
                        borderRadius: vs(20),
                        marginRight: s(5),
                        backgroundColor: selected ? '#A2D149' : 'transparent',
                        borderColor: '#A2D149',
                        opacity: pressed ? 0.8 : 1
                    }
                ]}
                onPress={() => onToggleDay(day)}
            >
                <Text style={{
                    color: selected ? '#000000' : '#A2D149',
                    fontSize: ms(14),
                    fontFamily: 'FamiljenGrotesk-Regular',
                    lineHeight: ms(20)
                }}>
                    {day}
                </Text>
            </Pressable>
        );
    };

    return (
        <View>
            <Text style={[styles.label, { fontSize: ms(18), marginLeft: PADDING, marginBottom: vs(10) }]}>
                Availability
            </Text>
            <FlatList
                horizontal
                data={days}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: PADDING }}
                initialNumToRender={5}
                maxToRenderPerBatch={7}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        color: '#FFF',
        fontFamily: 'FamiljenGrotesk-Regular',
    },
    dayBtn: {
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
