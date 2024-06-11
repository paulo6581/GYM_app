import React from "react";
import {Image,TouchableOpacity} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Home} from "../pages/home";
import { ListaDeTreinos } from "../pages/ListaDeTreinos";
import {AddTreino} from "../pages/addTreinos";
import {Treino} from "../pages/treino";

const Stack = createNativeStackNavigator();

export function AppRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerStyle:{
                backgroundColor: '#0038a4'
              },
              headerTintColor: '#fff',
            }}
            >
                <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{
                  title:'Inicio'
                  }} />
                <Stack.Screen 
                name="ListaDeTreinos" 
                component={ListaDeTreinos} 
                options ={({route}: {route:any}) => ({
                  title: `Treino ${route.params.indice}`
                  })} />

                <Stack.Screen
                  name = "addTreinos"
                  component = {AddTreino}
                  options = {{
                    title: 'Adicionar Treino'
                }}/>
                <Stack.Screen
                  name = "Treino"
                  component = {Treino}
                  options ={({route}: {route:any }) => ({ 
                    title: `${route.params.nomeDoTreino}`
                  })}/>
            

            </Stack.Navigator>
        </NavigationContainer>
    )
}