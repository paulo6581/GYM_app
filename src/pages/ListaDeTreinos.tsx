import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import data from '../../component/dados';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ListaDeTreinos({ route, navigation }: { route: any, navigation: any }) {
  const [dados, setDados] = useState<any[]>([]);
  const { rotinaId, desc, indice } = route.params;

  useEffect(() => {
    obterDadosSalvos();
  }, []);

  const obterDadosSalvos = async () => {
    try {
      const key = rotinaId;
      const dadosStringJson = await AsyncStorage.getItem(key);
      if (dadosStringJson) {
        const dadosColetados = JSON.parse(dadosStringJson);
        const filtrarDados = data.filter(item => dadosColetados.includes(item.id));
        setDados(filtrarDados);
      }
    } catch (error) {
      console.error('Failed to get saved data:', error);
    }
  };

  const removerRotina = async () => {
    try {
      const key = 'Rotina';
      const dadosStringJson = await AsyncStorage.getItem(key);

      if (dadosStringJson) {
        const dadosColetados = JSON.parse(dadosStringJson);
        const updatedData = dadosColetados.filter((item: any) => item.rotinaId !== rotinaId);

        const dadosJsonString = JSON.stringify(updatedData);
        await AsyncStorage.setItem(key, dadosJsonString);

        // Atualiza os dados removendo a rotina atual
        setDados(prevDados => prevDados.filter(item => item.id !== rotinaId));
        
        // Navega para a página Home
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Failed to remove rotina:', error);
    }
  };

  return (
    <View style={{
      backgroundColor: "#141414",
      padding: 5,
      flex: 1
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{
          color: '#fff',
          margin: 10
        }}>{desc}
        </Text>
        <TouchableOpacity
          onPress={removerRotina}
          style={{ width: 35, height: 35, borderRadius: 18, backgroundColor: 'blue' }}
        />
      </View>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: any }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Treino", {
                rotinaId: rotinaId,
                id: item.id,
                nomeDoTreino: item.nomeDoTreino,
                equipamento: item.equipamento,
                serieRepeticao: `${item.serie}x ${item.repeticao} `,
                carga: item.carga,
                informacao: item.informacao,
                anotacao: item.anotacao,
                imagem: item.imagem
              })}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#141414',
              borderColor: '#353535',
              borderWidth: 3,
              borderBottomWidth: 6,
              borderRadius: 13,
              marginVertical: 5,
              padding: 10
            }}>

            {item.imagem ? (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  backgroundColor: 'red'
                }}
                source={item.imagem}
              />
            ) : (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  backgroundColor: 'cyan'
                }}
                source={require("../../component/imagens/iconImage.png")}
              />
            )}

            <View style={{}}>
              <View>
                <Text style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  fontSize: 16,
                  color: "#fff",
                  alignItems: 'center'
                }}>{item.nomeDoTreino}
                </Text>
              </View>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  marginVertical: 3,
                  fontSize: 20,
                  color: '#808080'
                }}>
                  {item.serie}x {item.repeticao} * {item.carga}kg
                </Text>
              </View>
            </View>
            <Text style={{
              color: '#fff',
              fontSize: 30,
              justifyContent: 'space-between',
              fontFamily: 'RoundedMplus1c-Bold',
              fontWeight: 'bold'
            }}>
              >
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate("addTreinos", {
        rotinaId: rotinaId,
      })}
        style={{
          backgroundColor: '#0038a4',
          width: '95%',
          height: 50,
          borderRadius: 13,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 5,
          borderColor: '#002368',
          alignSelf: 'center',
          marginVertical: 5
        }}>
        <Text style={{
          color: '#ffff',
        }}>
          Adicionar Exercicio
        </Text>
      </TouchableOpacity>
    </View>
  );
}
