import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import {ExerciseCard} from "@components/ExerciseCard"
import { VStack, FlatList, HStack, Heading, Text } from "native-base";
import { useState } from "react";
import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home (){

    const [groups, setGroups] = useState(["Costas", "Bíceps", "Tríceps","Ombro"])
    const [groupSelected, setGroupSelected] = useState("costa")
    const [exercises, setExercises] = useState(["Puxada frontal", "Remada curvada", "Levantamento Terra","Remada unilateral"])

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleOpenExerciseDetails(){
        navigation.navigate("exercise")
    }

    return(
        <VStack flex={1}>
            <HomeHeader/>

            <FlatList
            data={groups}
            keyExtractor={item=>item}
            renderItem={({item})=>(
                <Group 
             name={item}
             isActive={String(groupSelected).toLocaleUpperCase() === String(item).toLocaleUpperCase()}
             onPress={()=> setGroupSelected(item)}
             />
            
            )}
           horizontal
           showsHorizontalScrollIndicator={false}
           _contentContainerStyle={{ px:8 }} 
            my={10}
            maxH={10}
            minH={10}
            />

            <VStack flex={1} px={8}>
            <HStack justifyContent="space-between" mb={5}>
                <Heading color="gray.200" fontSize="md" fontFamily="heading">
                    Exercícios
                </Heading>
                <Text color="gray.200" fontSize="sm">
                    {exercises.length}
                </Text>
            </HStack>

           <FlatList
            data={exercises}
            keyExtractor={item=>item}
            renderItem={({item})=>(
                 <ExerciseCard
                    onPress={handleOpenExerciseDetails}
                 />
                 )}
                 showsVerticalScrollIndicator={false}
                 _contentContainerStyle={{paddingBottom:20}}
            />
            </VStack>
        </VStack>
    );
}