import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home(props: any) {
  const [inserirDesc, setInserirDesc] = useState<string>('');
  const [inserirLetra, setInserirLetra] = useState<string>('');
  const [abrirModal, setAbrirModal] = useState<boolean>(false);
  const [dados, setDados] = useState<any[]>([]);

  useEffect(() => {
    obterDadosSalvos();
  }, []);

  const handlerAdicionarRotina = () => {
    if (inserirDesc && inserirLetra) {
      const newData = [
        { rotinaId: Date.now().toString(), indice: inserirLetra, desc: inserirDesc },
        ...dados,
      ];
      const sortedData = newData.sort((a,b)=> a.indice.localeCompare(b.indice)); 
      setInserirDesc('');
      console.log(sortedData);
      setInserirLetra('');
      setDados(sortedData);
      SaveData(sortedData);
      handlerFecharModal();
    }
  };
  const handlerFecharModal = () => {
    if (abrirModal == true) {
      setAbrirModal(false);
    } else if (abrirModal == false) {
      setAbrirModal(true);
    }
  };
  const obterDadosSalvos = async () => {
    try {
      const key = 'Rotina';
      const dadosStringJson = await AsyncStorage.getItem(key);
      if (dadosStringJson) {
        const dadosColetados = JSON.parse(dadosStringJson);
        setDados(dadosColetados);
        
      }
    } catch (error) {}
  };
  const SaveData = async (item: any) => {
    setDados(item);
    try {
      const key = 'Rotina';
      const dadosJsonString = JSON.stringify(item);
      await AsyncStorage.setItem(key, dadosJsonString);
    } catch (error) {
      console.error('Não foi possível salvar os dados!');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.indice}
        renderItem={({ item }:{item:any}) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('ListaDeTreinos', {
                rotinaId: item.rotinaId,
                desc: item.desc,
                indice: item.indice,
              })
            }>
            <View style={{ 
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems:'center',
            backgroundColor:'#141414',
            padding: 5,
            marginBottom: 10,
            borderWidth: 3,
            borderBottomWidth: 6,                                                                       
            borderRadius: 13,
            borderColor:'#353535'
            }}>
              <View style={{
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                }}>
                <Text style={{
                fontSize:45, 
                color:'white',
                }}> {item.indice} </Text>
                <Text style={{
                  fontSize:15,
                  color:'white'
                  }}> {item.desc}</Text>
              </View>
                <Text style={{
                justifyContent: 'space-between',
                fontFamily:'RoundedMplus1c-Bold',
                fontSize:50,
                color:'white',
                fontWeight: 'bold'
                }}> > 
                </Text>
              
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal visible={abrirModal} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor:'rgba(170,170,170,0.70)',
            alignItems:'center'
          }}>
          <View style={{
            backgroundColor:"#353535", 
            width:200,
            justifyContent:'center',
            borderRadius:13,
            padding:10
            }}>
            <View style={{ flexDirection:'row-reverse'}}>
              <TouchableOpacity 
                onPress={handlerFecharModal} 
                style={{
                  width:20,
                  height:20,
                  backgroundColor:'#808080',
                  borderRadius:10,
                  justifyContent:'center',
                  alignItems:'center'
                }}>
                  <Text style={{color:'white',fontSize:18}}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={{
              alignSelf:'center',
              fontFamily:'RoundedMplus1c-Bold',
              color:'#fff',
              fontSize:20,
              marginBottom:10
              }}>
                Adicionar Rotina
              </Text>
            <Text style={styles.modalInputLabel}>Nome da rotina</Text>
            <TextInput
              placeholder="InserirTexto"
              onChangeText={(text) => setInserirDesc(text)}
              value={inserirDesc}
              maxLength={25}
              style={styles.modalInput}
            />
            <Text style={styles.modalInputLabel}>Letra</Text>
            <View style={{ 
              flexDirection: 'row',   
              justifyContent:'space-between' 
              }}>
              <TextInput
              placeholder="A"
              placeholderTextColor='gray'
              onChangeText={(text) => setInserirLetra(text)}
              value={inserirLetra}
              maxLength={1}
              style={{...styles.modalInput,width:30,fontSize:30}}
              />
              <TouchableOpacity 
              onPress={handlerAdicionarRotina}
              style={{
              backgroundColor:'#0038a4',
              width:140,
              height:35,
              borderRadius:13,
              alignItems:'center',
              justifyContent:'center',
              borderBottomWidth:5,
              borderColor:'#002368'
              }} 
              >
                <Text style={{color:'#fff',
                fontFamily:'RoundedMplus1c-bold'
                }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity  onPress={handlerFecharModal} 
        style={{
              backgroundColor:'#0038a4',
              width:'95%',
              height:45,
              borderRadius:13,
              alignItems:'center',
              justifyContent:'center',
              borderBottomWidth:5,
              borderColor:'#002368',
              alignSelf: 'center',
              marginVertical: 5
        }}>
        <Text style={{
          color: '#ffff',
        }}>
        Adicionar Rotina
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 5,
    paddingTop: 5
  },
  modalInputLabel:{
    marginTop:5,
    color:'#fff',
    fontFamily:'RoundedMplus1c-bold'
  },
  modalInput:{
    height:35,
    backgroundColor:'#fff',
    borderRadius:13,
    padding:5,

  }
})
