import React from "react";
import { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, Switch, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


const SongMoodModal = ({ navigation }: {navigation: any}) => {
  const dispatch = useDispatch();

  const clickedSong = useSelector((store: StoreType) => store.clickedSong)
  const moodsDB = useSelector((store: MoodsArrayType) => store.moods);

  const [selectedMoods, setSelectedMoods] = useState<
    { moodName: string; color: string }[]
  >([]);

  useEffect(() => {
    dispatch({ type: "GET_MOODS" });

  }, []);

  useEffect(() => {
    if (clickedSong.moods) {
      setSelectedMoods(clickedSong.moods);
    }
  }, []);

  type StoreType = {
    clickedSong: SongType;
   }

   type MoodsArrayType = {
    moods: SelectedMoodsType
   }

  type SongType = {
    _id: string;
    title: string;
    artist: string;
    moods: {
      moodName: string,
      color: string,
  }[];
  }

  type SelectedMoodsType = 
    {
    moodName: string;
    color: string;
  }[]
  

  const handleSaveMoods = (song: SongType, selectedMoods: SelectedMoodsType) => {
    const songWithMoods = {song: song, moods: selectedMoods}
    dispatch({
      type: "EDIT_SONG_MOODS",
      payload: songWithMoods,
    });
    navigation.navigate("Songs");
  };

  const getMoodColor = (moodName: string) => {
    const mood = selectedMoods.find((mood) => mood.moodName === moodName);
    return mood ? { color: mood.color } : {};
  };

  const handleValueChange = (
    value: boolean,
    mood: { moodName: string; color: string }
  ) => {
    if (value === true) {
      setSelectedMoods((moods) => [...moods, mood]);
    } else {
      setSelectedMoods((moods) =>
        moods.filter((selectedMood) => mood.moodName !== selectedMood.moodName)
      );
    }
  };

  return (
    <View>
      <View>
        <FlatList
          data={moodsDB}
          keyExtractor={(item) => item.moodName}
          renderItem={({ item }) => {
            return (
              <View style={styles.mood}>
                <Text style={getMoodColor(item.moodName)}>{item.moodName}</Text>
                <Switch
                  value={
                    !!selectedMoods.find(
                      (mood) => mood.moodName === item.moodName
                    )
                  }
                  onValueChange={(selected) => {
                    handleValueChange(selected, item);
                  }}
                />
              </View>
            );
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSaveMoods(clickedSong, selectedMoods)}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SongMoodModal;

const styles = StyleSheet.create({
  mood: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 6,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});